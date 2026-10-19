# Distilled plugins

[Distilled](https://distilled.cx) runs cloud Android phones that identify as a Google Pixel 7, 7 Pro or 7a. The `distilled` plugin lets Claude, ChatGPT,
Claude Code and Codex drive them from a conversation, with the phone's screen playing live while the agent works.

Every install signs in the same way: the first time the agent needs Distilled, your browser opens, you sign in, pick a
workspace and select **Allow**. Nothing to paste. The connection shows under API keys in your workspace, named after
the app; revoke it there to disconnect.

## Add it

**Claude** (web and desktop, paid plans): open **Customize > Plugins**, select **Add > Add marketplace**, enter
`distilledcx/plugins`, and add **Distilled**. Or download
[distilled-plugin.zip](https://github.com/distilledcx/plugins/releases/latest/download/distilled-plugin.zip) and use
**Add > Upload plugin**. Then connect it from the plugin's **Connectors** tab.

**Claude Code:**

```
/plugin marketplace add distilledcx/plugins
/plugin install distilled@distilled
```

**Codex:**

```bash
codex plugin marketplace add distilledcx/plugins
codex plugin add distilled@distilled
```

**ChatGPT:** open **Settings > Apps & Connectors > Advanced**, turn on **Developer mode**, select **Create**, and enter
`https://mcp.distilled.cx/mcp` with OAuth.

**Any other MCP client:** add `https://mcp.distilled.cx/mcp` and sign in with OAuth.

Then ask: "List my Distilled phones, then show me the first running one live."

## What's here

| Path | What |
| --- | --- |
| `plugins/distilled` | The plugin: the MCP server by URL, the `drive-phone` skill, its README and license |
| `.claude-plugin/marketplace.json` | The marketplace Claude and Claude Code add |
| `.agents/plugins/marketplace.json` | The marketplace Codex adds |
| `scripts/pack.ts` | Zips the plugin: `bun scripts/pack.ts distilled` |

Each push that changes the plugin publishes the zip to the release for its version.
