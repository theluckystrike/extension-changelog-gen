# extension-changelog-gen — Changelog Generator
> **Built by [Zovo](https://zovo.one)** | `npm i extension-changelog-gen`

Parse conventional commits, group by type, generate markdown changelogs, and CWS release notes.

```typescript
import { ChangelogGen } from 'extension-changelog-gen';
const commits = ['feat(ui): dark mode support', 'fix: popup crash on load'];
const changelog = ChangelogGen.generate('1.2.0', '2025-01-15', commits);
const cwsNotes = ChangelogGen.generateCWSNotes(commits);
```
MIT License
