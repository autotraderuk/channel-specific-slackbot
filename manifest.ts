import { Manifest } from "deno-slack-sdk/mod.ts";
import ReplyToMessageWorkflow from "./workflows/reply_to_message.ts";

/**
 * The app manifest contains the app's configuration. This
 * file defines attributes like app name and description.
 * https://api.slack.com/automation/manifest
 */
export default Manifest({
  name: "channel-specific-slackbot",
  description: "A template for building Slack apps with Deno",
  icon: "assets/default_new_app_icon.png",
  workflows: [ReplyToMessageWorkflow],
  outgoingDomains: [],
  datastores: [],
  botScopes: [
    "commands",
    "channels:join",
    "channels:history",
    "channels:read",
    "chat:write",
    "chat:write.public",
  ],
});
