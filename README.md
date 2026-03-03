# extension-changelog-gen — Changelog Generator

> **Built by [Zovo](https://zovo.one)** | `npm i extension-changelog-gen`

Parse conventional commits, group by type, generate markdown changelogs, and Chrome Web Store release notes.

## Features

- **Conventional Commits** - Parse commits in conventional commit format
- **Type Grouping** - Group changes by type (feat, fix, docs, etc.)
- **Markdown Output** - Generate standard markdown changelogs
- **CWS Notes** - Generate Chrome Web Store release notes
- **Versioning** - Support for semantic versioning

## Installation

```bash
npm install extension-changelog-gen
```

## Usage

### Basic Changelog Generation

```typescript
import { ChangelogGen } from 'extension-changelog-gen';

const commits = [
  'feat(ui): add dark mode support',
  'fix: popup crash on load',
  'docs: update installation guide',
  'perf(api): improve response time'
];

const changelog = ChangelogGen.generate('1.2.0', '2025-01-15', commits);
console.log(changelog);
```

Output:
```markdown
# Changelog - Version 1.2.0 (2025-01-15)

## 🚀 Features
- ui: add dark mode support

## 🐛 Bug Fixes
- popup crash on load

## 📚 Documentation
- update installation guide

## ⚡ Performance
- api: improve response time
```

### Chrome Web Store Notes

```typescript
import { ChangelogGen } from 'extension-changelog-gen';

const commits = [
  'feat: new settings panel',
  'fix: memory leak in background',
  'fix: localization error'
];

const cwsNotes = ChangelogGen.generateCWSNotes(commits);
```

Output:
```markdown
Bug fixes:
- Memory leak in background
- Localization error

New features:
- New settings panel
```

### Custom Commit Types

```typescript
import { ChangelogGen, CommitType } from 'extension-changelog-gen';

const config = {
  types: {
    feat: { title: '✨ New Features', emoji: '✨' },
    fix: { title: '🐛 Bug Fixes', emoji: '🐛' },
    perf: { title: '⚡ Performance', emoji: '⚡' },
    chore: { title: '🔧 Maintenance', emoji: '🔧' }
  }
};

const changelog = ChangelogGen.generate('1.0.0', commits, config);
```

### Git Integration

```typescript
import { ChangelogGen } from 'extension-changelog-gen';
import { execSync } from 'child_process';

// Get commits since last tag
const commits = execSync('git log --pretty=format:"%s" v1.0.0..HEAD')
  .toString()
  .split('\n')
  .filter(Boolean);

const changelog = ChangelogGen.generate('1.1.0', new Date().toISOString(), commits);
```

## API Reference

### ChangelogGen.generate(version, date, commits, config?)

Generate a markdown changelog.

- `version` - Release version (e.g., '1.2.0')
- `date` - Release date (ISO string or 'YYYY-MM-DD')
- `commits` - Array of commit messages
- `config` - Optional configuration for commit types

### ChangelogGen.generateCWSNotes(commits, config?)

Generate Chrome Web Store compatible release notes.

- `commits` - Array of commit messages  
- `config` - Optional configuration

### CommitType

```typescript
interface CommitType {
  title: string;  // Section title
  emoji?: string; // Optional emoji prefix
  order?: number; // Display order
}
```

## Conventional Commits Format

This library supports conventional commits:

```
<type>(<scope>): <description>

Types: feat, fix, docs, style, refactor, perf, test, chore, build, ci, revert
```

Examples:
- `feat(ui): add dark mode`
- `fix(api): resolve auth token expiry`
- `docs: update README`

## License

MIT License
