import { Manifest } from "deno-slack-sdk/mod.ts";

/**
 * The app manifest contains the app's configuration. This
 * file defines attributes like app name and description.
 * https://api.slack.com/automation/manifest
 */
export default Manifest({
  name: "channel-specific-slackbot",
  description: "A template for building Slack apps with Deno",
  icon: "assets/default_new_app_icon.png",
  workflows: [SampleWorkflow],
  outgoingDomains: [],
  datastores: [SampleObjectDatastore],
  botScopes: [
    "commands",
    "chat:write",
    "chat:write.public",
  ],
});
