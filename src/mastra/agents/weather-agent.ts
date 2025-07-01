import { openai } from "@ai-sdk/openai";
import { Agent } from "@mastra/core/agent";
import { weatherTool } from "../tools/weather-tool";
import { Memory } from "@mastra/memory";
import { PostgresStore } from "@mastra/pg";
import { z } from "zod";

export const weatherAgent = new Agent({
  name: "Weather Agent",
  instructions: `
      You are a helpful weather assistant that provides accurate weather information.

      Your primary function is to help users get weather details for specific locations. When responding:
      - Always ask for a location if none is provided
      - If the location name isn’t in English, please translate it
      - If giving a location with multiple parts (e.g. "New York, NY"), use the most relevant part (e.g. "New York")
      - Include relevant details like humidity, wind conditions, and precipitation
      - Keep responses concise but informative

      Use the weatherTool to fetch current weather data.
`,
  model: openai("gpt-4o-mini"),
  tools: { weatherTool },
  memory: new Memory({
    options: {
      workingMemory: {
        enabled: true,
        schema: z.object({
          items: z.array(
            z.object({
              location: z.string().optional(),
              weather: z.string().optional(),
              temperature: z.string().optional(),
              humidity: z.string().optional(),
              windSpeed: z.string().optional(),
            })
          ),
        }),
      },
    },
    storage: new PostgresStore({
      connectionString:
        "postgresql://postgres.rmhfybpfnykanqddfyjh:Zue8XbZqVpwszTsR@aws-0-eu-north-1.pooler.supabase.com:6543/postgres",
    }),
  }),
});
