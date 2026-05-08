"""Dual-provider LLM client with CAG prompt injection."""

from openai import OpenAI, APIError
from cag_agent.config import Settings
from cag_agent.knowledge import load_knowledge

SYSTEM_TEMPLATE = (
    "You are HappyNest Blanc Belle's virtual assistant. "
    "Here is our complete knowledge base:\n\n"
    "{knowledge}\n\n"
    "Answer the visitor's question using ONLY the knowledge above. "
    "If the answer is not in the knowledge base, say so politely "
    "and offer to connect them with the property manager."
)


class LLMClient:
    """Chat client that tries OpenRouter first, then NVIDIA NIM fallback."""

    def __init__(self, settings: Settings | None = None):
        self.settings = settings or Settings()
        self.knowledge = load_knowledge()
        self.system_prompt = SYSTEM_TEMPLATE.format(knowledge=self.knowledge)

    def _stream_provider(
        self, base_url: str, api_key: str, model: str, question: str
    ):
        """Yield text chunks from a single provider."""
        client = OpenAI(
            base_url=base_url,
            api_key=api_key,
            timeout=self.settings.timeout,
        )
        return client.chat.completions.create(
            model=model,
            messages=[
                {"role": "system", "content": self.system_prompt},
                {"role": "user", "content": question},
            ],
            max_tokens=self.settings.max_tokens,
            temperature=self.settings.temperature,
            stream=True,
        )

    def ask_stream(self, question: str):
        """Yield answer text chunks, falling back from OpenRouter to NVIDIA."""
        try:
            stream = self._stream_provider(
                self.settings.openrouter_base_url,
                self.settings.openrouter_api_key,
                self.settings.openrouter_model,
                question,
            )
            for chunk in stream:
                delta = chunk.choices[0].delta.content
                if delta:
                    yield delta
            return
        except APIError:
            pass

        try:
            stream = self._stream_provider(
                self.settings.nvidia_base_url,
                self.settings.nvidia_api_key,
                self.settings.nvidia_model,
                question,
            )
            for chunk in stream:
                delta = chunk.choices[0].delta.content
                if delta:
                    yield delta
            return
        except APIError as exc:
            raise RuntimeError(
                "Both providers failed. Last error: " + str(exc)
            ) from exc

    def ask(self, question: str) -> str:
        """Return the full answer as a single string."""
        return "".join(self.ask_stream(question))