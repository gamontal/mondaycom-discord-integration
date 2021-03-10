# Discord and monday.com Integration

## Inspiration
With over a **quarter of a billion users**, from gamers and programmers to educators, [Discord](https://discord.com) is one of the most popular ways people communicate online. Discord Servers can support up to 250,000 members and 25,000 simultaneous online members–more than enough for most business teams. Servers can also support up to 500 separate channels, so you can keep conversations organized under hundreds of different topics.

## What it does
### When you create a new task, change a status, or finish a project in monday.com, notify your entire server channel or individual members in Discord instantly.
### Stay in the loop when due dates are updated in monday.com and instantly notify an entire channel or individual members in Discord.
### Instantly communicate updates and conversations from monday.com to your entire Discord channel or individual members.

## How I built it
This integration project was built using the following resources:
- The [monday.com API](https://support.monday.com/hc/en-us/articles/360005144659-Does-monday-com-have-an-API-)
  - For authenticating monday.com users (JWT, ShortLivedToken, etc).
- The [monday.com GraphQL API](https://monday.com/developers/v2)
  - For querying User and Workflow data.
- The [monday.com Online Recipe Integration Builder](https://support.monday.com/hc/en-us/articles/360012254440-Build-your-own-custom-automation)
  - For creating custom fields, remote options and custom actions.
- The [Discord User and Bot APIs](https://discord.com/developers/docs/reference)
  - For authenticating Discord users and sending custom workflow event messages to Server Channels and Members.

## What I learned
I took this project as an opportunity to learn more about monday.com workflows and its developer resources. I had a ton of fun building this integration and engaging with the monday.com developer community!

## What's next for Discord Integration
This integration has the potential to bring Discord users to the platform and expand the way we communicate and share work together. I'm looking forward to making this integration officially available to users across monday.com!
