---
name: drive-phone
description: Drive a Distilled cloud Android phone with the distilled MCP tools while the person watches it live. Use when asked to do something on a phone, test an app on one, or show what a phone is doing.
---

# Drive a phone

The `distilled` MCP server drives real Android phones in the cloud. The first call asks the person to sign in to
Distilled in their browser and approve the workspace; nothing has to be pasted.

1. Pick the phone with `list_phones`. A stopped phone needs `start_phones` and a minute or two to boot.
2. Call `watch_phone` once for that phone, before the first action.
   - Where the client draws MCP Apps, the phone's screen plays live in the chat. Watching never takes the phone.
   - Elsewhere the answer has a console link ending in `&watch=1`. Give it to the person once. When this session has a
     browser pane, open the link there.
3. Work in a loop: `screenshot`, one action (`tap`, `swipe`, `type_text`, `press_key`, `launch_app`, `open_url`),
   then `screenshot` again to check what happened. Pass the screenshot's `frame` with every coordinate.
4. Call `release_phone` when you are done, so a person or a run can use the phone.

Don't call `watch_phone` after every action: the view stays live on its own. `stream_ticket` is for the viewer; never
call it yourself.
