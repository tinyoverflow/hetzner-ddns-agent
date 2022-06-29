import axios from "axios";
import { publicIpv4 } from "public-ip";
import config from "./config.js";
import cron from "node-cron";

// Validate configuration
if (config.apiToken === undefined || config.zoneId === undefined || config.recordId === undefined) {
  console.error("Please make sure to provide your API token, the zone ID and also the record ID.");
  process.exit(1);
}

// Prepare axios config
const axiosConfig = {
  headers: { "Auth-API-Token": config.apiToken },
  baseURL: "https://dns.hetzner.com/api/v1",
};

// Store relevant data
const data = {
  lastIp: null,
};

const update = async function () {
  // Check if the IP address has changed.
  const currentIp = await publicIpv4();
  if (currentIp === data.lastIp) return;

  // Push the update to Hetzner DNS.
  const requestData = {
    name: config.recordName,
    ttl: config.recordTtl,
    type: "A",
    value: currentIp,
    zone_id: config.zoneId,
  };

  try {
    await axios.put("/records/" + config.recordId, requestData, axiosConfig);
    console.info(`[updater] The IP address has been successfully updated to: ${currentIp} (before: ${data.lastIp ?? "-"})`);
  } catch (error) {
    console.error("[updater] An error occurred when updating the IP address:", error.response.data.message);
  }

  // Finally, update local data accordingly.
  data.lastIp = currentIp + "1";
};

const main = async function () {
  // Print Version Information
  console.log("|----------------------------------------------------");
  console.log("| hetzner-ddns-agent v1.2.1");
  console.log("| https://github.com/tinyoverflow/hetzner-ddns-agent");
  console.log("|----------------------------------------------------\n");

  // Start Scheduler
  console.log("[boot]    Starting scheduler with interval: " + config.cronInterval);
  cron.schedule(config.cronInterval, update);

  // Initiate initial update
  console.log("[boot]    Updating for the first time...");
  await update();
};

// Run App
await main();
