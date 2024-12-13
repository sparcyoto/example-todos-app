import { OpenAIStream, StreamingTextResponse } from "ai";
import { Configuration, OpenAIApi } from "openai-edge";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

export async function POST(req: Request) {
  const demoObject = {
    message: "This is a demo response",
    status: "success",
    data: {
      id: 1,
      name: "Demo Task",
      description: "This is a demo task description",
    },
  };

  return new Response(JSON.stringify(demoObject), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "max-age=600, s-maxage=600",
    },
  });
}
