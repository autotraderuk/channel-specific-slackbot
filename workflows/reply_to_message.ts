// borrowed from https://github.com/slack-samples/deno-daily-channel-topic/blob/main/workflows/reply_to_message.ts
// Including MIT licence for this file:
// The MIT License (MIT)
// 
// Copyright (c) 2023 Slack Technologies, LLC
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

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