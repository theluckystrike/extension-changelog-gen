/**
 * Changelog Gen — Generate changelogs from conventional commits
 */
export class ChangelogGen {
    /** Parse conventional commit message */
    static parseCommit(message: string): { type: string; scope: string; description: string; breaking: boolean } | null {
        const match = message.match(/^(\w+)(?:\(([^)]+)\))?(!?):\s*(.+)/);
        if (!match) return null;
        return { type: match[1], scope: match[2] || '', description: match[4], breaking: match[3] === '!' };
    }

    /** Group commits by type */
    static groupCommits(messages: string[]): Record<string, Array<{ scope: string; description: string; breaking: boolean }>> {
        const groups: Record<string, Array<{ scope: string; description: string; breaking: boolean }>> = {};
        messages.forEach((msg) => {
            const parsed = this.parseCommit(msg);
            if (!parsed) return;
            if (!groups[parsed.type]) groups[parsed.type] = [];
            groups[parsed.type].push({ scope: parsed.scope, description: parsed.description, breaking: parsed.breaking });
        });
        return groups;
    }

    /** Generate markdown changelog */
    static generate(version: string, date: string, commits: string[]): string {
        const groups = this.groupCommits(commits);
        const typeLabels: Record<string, string> = { feat: '✨ Features', fix: '🐛 Bug Fixes', perf: '⚡ Performance', refactor: '♻️ Refactoring', docs: '📚 Documentation', chore: '🔧 Chores', test: '✅ Tests', ci: '🔄 CI/CD' };
        let md = `## [${version}] - ${date}\n\n`;
        const breaking = commits.map((c) => this.parseCommit(c)).filter((p) => p?.breaking);
        if (breaking.length > 0) { md += `### ⚠️ Breaking Changes\n\n`; breaking.forEach((b) => { md += `- ${b!.description}\n`; }); md += '\n'; }
        for (const [type, items] of Object.entries(groups)) {
            const label = typeLabels[type] || type;
            md += `### ${label}\n\n`;
            items.forEach((item) => {
                const scope = item.scope ? `**${item.scope}:** ` : '';
                md += `- ${scope}${item.description}\n`;
            });
            md += '\n';
        }
        return md;
    }

    /** Generate CWS release notes (simplified) */
    static generateCWSNotes(commits: string[], maxLength: number = 500): string {
        const groups = this.groupCommits(commits);
        const sections: string[] = [];
        if (groups.feat) sections.push('New: ' + groups.feat.map((f) => f.description).join(', '));
        if (groups.fix) sections.push('Fixed: ' + groups.fix.map((f) => f.description).join(', '));
        if (groups.perf) sections.push('Improved: ' + groups.perf.map((f) => f.description).join(', '));
        return sections.join('\n').slice(0, maxLength);
    }
}
