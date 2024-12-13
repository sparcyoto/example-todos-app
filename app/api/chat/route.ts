// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();

//     // Here you can process the chat message and generate a response
//     // For example, you might want to:
//     // 1. Call an AI service
//     // 2. Process the message
//     // 3. Return a response

//     const response = {
//       role: "assistant",
//       content: "This is a sample response. Replace with actual AI processing.",
//     };

//     return NextResponse.json(response);
//   } catch (error) {
//     console.error("Chat API error:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import { CopilotBackend } from "@copilotkit/backend";

// Initialize CopilotKit backend
const copilotKit = new CopilotBackend({
  apiKey: process.env.COPILOTKIT_API_KEY, // Make sure to add this to your .env file
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("body", body);
    const { messages, functions } = body;

    // if (!messages) {
    //   return NextResponse.json(
    //     { error: "Messages are required" },
    //     { status: 400 }
    //   );
    // }

    // Call CopilotKit backend to process the chat
    const response = await copilotKit.chat.completions.create({
      messages: body,
      functions: functions || [], // Optional function calling
      stream: false, // Set to true if you want to stream responses
      model: "gpt-4", // Or your preferred model
    });

    // Extract the assistant's message from the response
    const assistantMessage = {
      role: "assistant",
      content: response.choices[0].message.content,
    };

    return NextResponse.json(assistantMessage);
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Enable streaming for larger responses
export const runtime = "edge";
