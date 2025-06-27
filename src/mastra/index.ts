import { Mastra } from "@mastra/core/mastra";
import { PinoLogger } from "@mastra/loggers";
import { weatherAgent } from "./agents/weather-agent";
import { NetlifyDeployer } from "@mastra/deployer-netlify";
import { VercelDeployer } from "@mastra/deployer-vercel";
import { researchAgent } from "./agents/research-agent";

export const mastra = new Mastra({
  agents: { weatherAgent, researchAgent },
  logger: new PinoLogger({
    name: "Mastra",
    level: "info",
  }),
  deployer: process.env.VERCEL ? new VercelDeployer() : new NetlifyDeployer(),
});
