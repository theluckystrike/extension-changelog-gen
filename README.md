# extension-changelog-gen — Changelog Generator for Extensions
> **Built by [Zovo](https://zovo.one)** | `npm i extension-changelog-gen`

Generate markdown/HTML changelogs, "What's New" detection, and version tracking.

```typescript
import { ChangelogBuilder } from 'extension-changelog-gen';
const log = new ChangelogBuilder();
log.add({ version: '2.0', date: '2025-01-01', changes: [{ type: 'added', description: 'Dark mode' }] });
if (await log.shouldShowUpdate()) showWhatsNew(log.toHTML());
```
MIT License
