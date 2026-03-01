/**
 * Changelog Builder — Generate and display changelogs for extensions
 */
export interface ChangelogEntry { version: string; date: string; changes: Array<{ type: 'added' | 'changed' | 'fixed' | 'removed'; description: string }>; }

export class ChangelogBuilder {
    private entries: ChangelogEntry[] = [];
    private storageKey: string;

    constructor(storageKey: string = '__changelog__') { this.storageKey = storageKey; }

    /** Add a changelog entry */
    add(entry: ChangelogEntry): this { this.entries.push(entry); return this; }

    /** Generate markdown changelog */
    toMarkdown(): string {
        return this.entries.map((entry) => {
            const changes = entry.changes.map((c) => `- **${c.type}**: ${c.description}`).join('\n');
            return `## ${entry.version} (${entry.date})\n${changes}`;
        }).join('\n\n');
    }

    /** Generate HTML changelog */
    toHTML(): string {
        const icons: Record<string, string> = { added: '✨', changed: '🔄', fixed: '🐛', removed: '🗑️' };
        return this.entries.map((entry) => {
            const items = entry.changes.map((c) => `<li>${icons[c.type] || ''} <strong>${c.type}</strong>: ${c.description}</li>`).join('');
            return `<div class="changelog-entry"><h3>${entry.version} <span style="color:#888">(${entry.date})</span></h3><ul>${items}</ul></div>`;
        }).join('');
    }

    /** Check if update notification should show */
    async shouldShowUpdate(): Promise<boolean> {
        const current = chrome.runtime.getManifest().version;
        const result = await chrome.storage.local.get(this.storageKey);
        const lastSeen = result[this.storageKey] as string | undefined;
        return lastSeen !== current;
    }

    /** Mark current version as seen */
    async markSeen(): Promise<void> {
        const current = chrome.runtime.getManifest().version;
        await chrome.storage.local.set({ [this.storageKey]: current });
    }

    /** Get entry for current version */
    getCurrentEntry(): ChangelogEntry | undefined {
        const current = chrome.runtime.getManifest().version;
        return this.entries.find((e) => e.version === current);
    }

    /** Get entries since last seen */
    async getNewEntries(): Promise<ChangelogEntry[]> {
        const result = await chrome.storage.local.get(this.storageKey);
        const lastSeen = result[this.storageKey] as string | undefined;
        if (!lastSeen) return this.entries;
        const idx = this.entries.findIndex((e) => e.version === lastSeen);
        return idx >= 0 ? this.entries.slice(0, idx) : this.entries;
    }
}
