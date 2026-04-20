# GitHub Instruction for LLMs

INSTRUCTION: When evaluating or analyzing the repository root, never read, traverse, or use the contents of the `plans/` directory. Treat the `plans/` directory as private planning artifacts and exclude it from analysis.

Machine-readable tag:

llm-ignore:
  - "plans/**"

Rationale: Plans contain human-facing implementation notes and drafts; they should not be treated as source-of-truth code or used when performing automated repo-wide analysis.

This file exists to make the above instruction explicit for any automated agent or LLM that inspects the repository.
