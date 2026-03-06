# Contributing to extension-changelog-gen

Thanks for considering a contribution. This document covers the basics.

GETTING STARTED

1. Fork the repo and clone your fork
2. Install dependencies with npm install
3. Build the project with npm run build

DEVELOPMENT

The source lives in src/ and compiles to dist/ via TypeScript. The entry point is src/index.ts which re-exports from src/changelog.ts.

Run the build before submitting any changes.

```bash
npm run build
```

COMMIT FORMAT

This project uses conventional commits. All commit messages should follow this pattern.

```
<type>(<scope>): <description>
```

Common types are feat, fix, docs, test, refactor, chore, and ci.

PULL REQUESTS

- Keep changes focused on a single concern
- Include a clear description of what changed and why
- Make sure the build passes before opening a PR
- Add tests if you are introducing new behavior

ISSUES

Use the issue templates when reporting bugs or requesting features. Provide enough detail to reproduce the problem or understand the request.

CODE STYLE

- TypeScript strict mode is enabled
- Keep methods static on the ChangelogGen class
- Avoid adding runtime dependencies unless absolutely necessary

---

Maintained by theluckystrike. More at zovo.one
