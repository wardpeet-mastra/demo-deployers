import { Mastra } from "@mastra/core/mastra";
import { PinoLogger } from "@mastra/loggers";
import { weatherAgent } from "./agents/weather-agent";
import { NetlifyDeployer } from "@mastra/deployer-netlify";
import { VercelDeployer } from "@mastra/deployer-vercel";
import { CloudflareDeployer } from "@mastra/deployer-cloudflare";
import { researchAgent } from "./agents/research-agent";
import { store } from "./stores/pg";

export const mastra = new Mastra({
  agents: { weatherAgent, researchAgent },
  // logger: new PinoLogger({
  //   name: "Mastra",
  //   level: "info",
  // }),
  storage: store,
  deployer: process.env.VERCEL
    ? new VercelDeployer()
    : process.env.CLOUDFLARE_ACCOUNT_ID
    ? new CloudflareDeployer({
        scope: process.env.CLOUDFLARE_ACCOUNT_ID,
        auth: {
          apiToken: process.env.CLOUDFLARE_API_TOKEN!,
        },
      })
    : new NetlifyDeployer(),
});
