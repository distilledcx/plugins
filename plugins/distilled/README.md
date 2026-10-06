# Distilled

Drive Distilled's cloud Android phones from a conversation. The agent lists your phones, installs apps, taps, swipes
and types, reads the screen, and can hand longer jobs to Distilled's own agent. In Claude and ChatGPT the phone's screen
plays live in the conversation while the agent works on it, so you see every step as it happens.

The plugin connects the hosted Distilled MCP server, `https://mcp.distilled.cx/mcp`, and adds a skill that tells the
agent how to drive a phone: watch it, take a screenshot, do one thing, check the result, and let the phone go when done.

## Use it

You need a Distilled account with at least one phone (sign up at [distilled.cx](https://distilled.cx)).

1. Add the plugin, then connect it. Distilled opens in your browser: sign in, pick a workspace, and select **Allow**.
2. Ask, for example: "List my Distilled phones, then show me the first running one live."
3. Ask for what you want done on the phone. The agent drives it while you watch.

The connection appears under API keys in your Distilled workspace, named after the app. Revoke that key to disconnect.

## Data

The plugin sends the agent's tool calls to `mcp.distilled.cx`, which acts on your workspace through `api.distilled.cx`:
listing and starting phones, screenshots, taps and typed text, app installs, and runs. Screenshots and screen text come
back to the conversation. The live view streams the phone's screen from `api.distilled.cx` straight to the conversation;
it only watches and never takes the phone. Nothing is sent anywhere else. See the
[privacy policy](https://distilled.cx/privacy/).

## Other apps

- Claude Code: `/plugin marketplace add distilledcx/plugins`, then `/plugin install distilled@distilled`.
- Codex: `codex plugin marketplace add distilledcx/plugins`, then `codex plugin add distilled@distilled`.
- Any MCP client: add `https://mcp.distilled.cx/mcp` and sign in with OAuth, or send a Distilled API key as
  `Authorization: Bearer dk_live_...` from scripts that can't open a browser.
