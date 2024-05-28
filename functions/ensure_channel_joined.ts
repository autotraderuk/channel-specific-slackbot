// borrowed from https://github.com/slack-samples/deno-daily-channel-topic/blob/main/functions/ensure_channel_joined.ts
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
 
import {SlackAPI} from "deno-slack-api/mod.ts";
import {DefineFunction, Schema, SlackFunction} from "deno-slack-sdk/mod.ts";

export const EnsureChannelJoined = DefineFunction({
    title: "Ensure the bot is part of the channel",
    callback_id: "ensure_channel_joined",
    source_file: "functions/ensure_channel_joined.ts",
    input_parameters: {
        properties: {
            channel_id: {
                description: "The id of the Channel to join",
                type: Schema.slack.types.channel_id,
            },
        },
        required: ["channel_id"],
    },
});

export default SlackFunction(
    EnsureChannelJoined,
    async ({inputs, token}) => {
        const client = SlackAPI(token);

        const joinResponse = await client.conversations.join({
            channel: inputs.channel_id,
        });
        if (!joinResponse.ok) throw new Error(joinResponse.error);

        return {
            outputs: {},
        };
    },
);