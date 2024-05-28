// borrowed from https://github.com/slack-samples/deno-daily-channel-topic/blob/main/workflows/reply_to_message.ts

import {DefineWorkflow, Schema} from "deno-slack-sdk/mod.ts";
import {EnsureChannelJoined } from "../functions/ensure_channel_joined.ts";

// import {GenerateDailyMessage} from "../functions/daily_message.ts";

export const ReplyToMessageWorkflow = DefineWorkflow(
    {
        callback_id: "reply_to_message",
        title: "Reply to the message posted",
        description: "Reply with today's message",
        input_parameters: {
            properties: {
                message_ts: {
                    description: "The message to respond to",
                    type: Schema.types.string,
                },
                channel_id: {
                    description: "The id of the Channel to join",
                    type: Schema.slack.types.channel_id,
                },
            },
            required: ["channel_id", "message_ts"],
        },
    },
);

ReplyToMessageWorkflow.addStep(
    EnsureChannelJoined,
    {
        channel_id: ReplyToMessageWorkflow.inputs.channel_id,
    },
);

// const generateMessageStep = ReplyToMessageWorkflow.addStep(
//     GenerateDailyMessage,
//     {},
// );

ReplyToMessageWorkflow.addStep(
    Schema.slack.functions.ReplyInThread,
    {
        message_context: {
            channel_id: ReplyToMessageWorkflow.inputs.channel_id,
            message_ts: ReplyToMessageWorkflow.inputs.message_ts,
        },
        message:
            `This message was replied to by the Bot.`,
            // `This message was replied to by the Bot. ${generateMessageStep.outputs.message}`,
    },
);

export default ReplyToMessageWorkflow;