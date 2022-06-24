import ZoneUpdater from "./Cron.js";
import HetznerZoneClient from "./HetznerClient.js";
import config from "./config.js";
import IPCheck from "./IPCheck.js";

function main() {
  console.log("[boot     ] Starting Hetzner Zone Updater");
  console.log("[boot     ] => Zone ID:    " + config.zoneId);
  console.log("[boot     ] => Record ID:  " + config.recordId);

  const ipCheck = new IPCheck();
  ipCheck.check().then(_ => {
    console.log("[boot     ] => Current IP: " + ipCheck.getIpAddress());
  });

  const hetzner = new HetznerZoneClient(config.apiToken, config.zoneId);
  const updater = new ZoneUpdater(ipCheck, hetzner, config.recordId);
  updater.update().then(_ => {
    updater.start();
  });
}

main();
