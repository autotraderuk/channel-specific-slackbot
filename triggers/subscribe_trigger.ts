import { Trigger } from "deno-slack-sdk/types.ts";
import { TriggerContextData, TriggerEventTypes, TriggerTypes } from "deno-slack-api/mod.ts";
import {ReplyToMessageWorkflow} from "../workflows/reply_to_message.ts";
/**
 * Triggers determine when workflows are executed. A trigger
 * file describes a scenario in which a workflow should be run,
 * such as a user pressing a button or when a specific event occurs.
 * https://api.slack.com/automation/triggers
 */
const trigger: Trigger<typeof ReplyToMessageWorkflow.definition> = {
  type: TriggerTypes.Event,
  event: {
    event_type: TriggerEventTypes.MessagePosted,
    // Update Channel Id on new installs
    channel_ids: ["C05AZ5T0N06"],
    // all_resources: true,
    // team_ids: ["E01MQAV116U"],
    
    filter: {
      root: {
        operator: "AND",
        inputs: [{
          operator: "NOT",
          inputs: [{
            // Filter out posts by apps
            statement: "{{data.user_id}} == null",
          }],
        }, {
          // Filter out thread replies
          statement: "{{data.thread_ts}} == null",
        }],
      },
      version: 1,
    },
  },
  name: "Respond to messages in channels with a configured response",
  workflow: `#/workflows/${ReplyToMessageWorkflow.definition.callback_id}`,
  inputs: {
    message_ts: {
      value: TriggerContextData.Event.MessagePosted.message_ts,
    },
    channel_id: {
      value: TriggerContextData.Event.MessagePosted.channel_id,
    },
  },
};

export default trigger;
