import { Client as WorkFlowClient } from "@upstash/workflow";
import config from "@/lib/config";

export const workflow = new WorkFlowClient({
  baseUrl: config.env.upstash.qstashUrl,
  token: config.env.upstash.qstashToken,
});
