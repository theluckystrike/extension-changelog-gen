# extension-changelog-gen

A TypeScript library that parses conventional commit messages, groups them by type, and generates markdown changelogs or Chrome Web Store release notes. Built for browser extension projects using Manifest V3.

INSTALLATION

```bash
npm install extension-changelog-gen
```

USAGE

The library exports a single class with static methods. No configuration objects, no setup. Pass in commit strings and get formatted output.

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

This produces a versioned markdown section with commits grouped under labeled headings like Features, Bug Fixes, Performance, and so on.

PARSING COMMITS

You can parse individual commit messages to extract their type, scope, description, and whether they include a breaking change marker.

```typescript
const result = ChangelogGen.parseCommit('feat(popup): add keyboard shortcuts');
// { type: 'feat', scope: 'popup', description: 'add keyboard shortcuts', breaking: false }

const breaking = ChangelogGen.parseCommit('refactor!: rewrite storage layer');
// { type: 'refactor', scope: '', description: 'rewrite storage layer', breaking: true }
```

Returns null if the message does not match conventional commit format.

GROUPING COMMITS

Pass an array of commit strings and get them grouped by type.

```typescript
const groups = ChangelogGen.groupCommits([
  'feat: new settings panel',
  'feat: export as PDF',
  'fix: memory leak in background script'
]);
// { feat: [...], fix: [...] }
```

GENERATING MARKDOWN CHANGELOGS

The generate method accepts a version string, a date string, and an array of commit messages. It returns a markdown section with commits organized by type. Breaking changes get their own section at the top.

```typescript
const md = ChangelogGen.generate('2.0.0', '2025-06-01', [
  'feat!: redesign options page',
  'feat: add theme selector',
  'fix: resolve auth token expiry'
]);
```

Built-in type labels cover feat, fix, perf, refactor, docs, chore, test, and ci. Any other conventional commit type falls through using its raw name.

GENERATING CHROME WEB STORE NOTES

The generateCWSNotes method produces a compact plain-text summary suitable for the Chrome Web Store listing. It covers features, fixes, and performance improvements. Output is truncated to a configurable max length (default 500 characters).

```typescript
const notes = ChangelogGen.generateCWSNotes(commits);
const short = ChangelogGen.generateCWSNotes(commits, 200);
```

CONVENTIONAL COMMIT FORMAT

This library expects the standard conventional commits pattern.

```
<type>(<scope>): <description>
```

Supported types include feat, fix, docs, style, refactor, perf, test, chore, build, ci, and revert. Append ! before the colon to mark a breaking change.

Examples

```
feat(ui): add dark mode
fix(api): resolve auth token expiry
docs: update README
refactor!: rewrite storage layer
```

API REFERENCE

ChangelogGen.parseCommit(message)
  Takes a commit message string. Returns an object with type, scope, description, and breaking fields, or null if the message does not match.

ChangelogGen.groupCommits(messages)
  Takes an array of commit message strings. Returns an object keyed by commit type, where each value is an array of parsed commit entries.

ChangelogGen.generate(version, date, commits)
  Takes a version string, a date string, and an array of commit messages. Returns a markdown string with grouped and labeled sections.

ChangelogGen.generateCWSNotes(commits, maxLength?)
  Takes an array of commit messages and an optional max character length (default 500). Returns a plain-text summary for Chrome Web Store release notes.

LICENSE

MIT License. See LICENSE file for details.

---

Built by theluckystrike. More at zovo.one
