"""Interactive CLI + FastAPI launcher for the HappyNest CAG chatbot."""

import typer
import uvicorn
from rich.console import Console
from rich.live import Live
from rich.markdown import Markdown
from rich.panel import Panel

from cag_agent.config import Settings
from cag_agent.llm import LLMClient

app = typer.Typer()
console = Console()

TEST_QUESTIONS = [
    "What are the check-in timings?",
    "Is hookah allowed indoors?",
    "How much does the BBQ cost?",
    "How many bedrooms are there?",
    "Is the property pet friendly?",
    "What are the pool timings?",
    "Can we use the kitchen?",
    "What is the visitor charge?",
    "Are there any jacuzzi rooms?",
    "How far is the property from Delhi Airport?",
]


@app.command()
def chat() -> None:
    """Start an interactive FAQ session."""
    client = LLMClient()
    console.print(
        Panel("HappyNest Blanc Belle FAQ Chatbot", style="bold green")
    )
    console.print(
        f"[dim]Loaded {len(client.knowledge):,} characters of context.[/dim]\n"
    )
    console.print("Type 'exit' or 'quit' to end the session.\n")

    while True:
        question = console.input("[bold blue]You:[/bold blue] ")
        if question.strip().lower() in {"exit", "quit"}:
            break

        try:
            with Live(
                Markdown(""), console=console, refresh_per_second=10
            ) as live:
                content = ""
                for chunk in client.ask_stream(question):
                    content += chunk
                    live.update(Markdown(content))
        except Exception as exc:
            console.print(Panel(str(exc), title="Error", style="red"))


@app.command()
def test() -> None:
    """Run a battery of 10 predefined FAQ questions."""
    client = LLMClient()
    passed = 0

    for question in TEST_QUESTIONS:
        try:
            answer = client.ask(question)
            console.print(f"[bold green]PASS[/bold green] {question}")
            console.print(answer[:200] + "...\n")
            passed += 1
        except Exception as exc:
            console.print(f"[bold red]FAIL[/bold red] {question}: {exc}\n")

    console.print(f"\n{passed}/{len(TEST_QUESTIONS)} tests passed.")


@app.command()
def server(
    host: str | None = typer.Option(None, help="Bind host. Defaults to CAG_API_HOST."),
    port: int | None = typer.Option(None, help="Bind port. Defaults to CAG_API_PORT."),
    reload: bool = typer.Option(False, help="Enable auto-reload (dev)."),
) -> None:
    """Run the FastAPI chat server."""
    settings = Settings()
    uvicorn.run(
        "cag_agent.api:app",
        host=host or settings.api_host,
        port=port or settings.api_port,
        reload=reload,
    )


if __name__ == "__main__":
    app()