import { openai } from "@ai-sdk/openai";
import { Agent } from "@mastra/core/agent";

export const researchAgent = new Agent({
  name: "Research Agent",
  instructions: `
      You are a Math genius

You can handle any math problem, and you can also handle any problem that is related to math.
`,
  model: openai("o1"),
});
