import ZoneUpdater from "./ZoneUpdater.js";
import HetznerZoneClient from "./HetznerClient.js";
import config from "./config.js";
import IPCheck from "./IPCheck.js";

async function main() {
  console.log("[boot     ] Starting Hetzner Zone Updater");
  console.log("[boot     ] => Zone ID:    " + config.zoneId);
  console.log("[boot     ] => Record ID:  " + config.recordId);

  const ipCheck = new IPCheck();
  const ipAddress = await ipCheck.query();
  ipCheck.query().then(_ => {
    console.log("[boot     ] => Current IP: " + ipAddress);
  });

  const hetzner = new HetznerZoneClient(config.apiToken, config.zoneId);
  const updater = new ZoneUpdater(ipCheck, hetzner, config.recordId);
  await updater.updateCurrentIp();

  updater.update().then(_ => {
    updater.start();
  });
}

main();
