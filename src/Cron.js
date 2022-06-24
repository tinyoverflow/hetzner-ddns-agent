import cron from "node-cron";

/**
 * @property {IPCheck} _ipCheck
 * @property {HetznerZoneClient} _hetzner
 * @property {string} _recordId
 */
export default class ZoneUpdater {
  constructor(ipCheck, hetznerClient, recordId) {
    this._ipCheck = ipCheck;
    this._recordId = recordId;
    this._hetzner = hetznerClient;
  }

  start() {
    console.log("[scheduler] Starting scheduler...");
    cron.schedule("0 */5 * * * *", this.update);
  }

  async update() {
    const ipHasChanged = await this._ipCheck.check();
    if (! ipHasChanged) return;

    const ipAddress = this._ipCheck.getIpAddress();
    console.log(`[updater  ] IP address has changed. Updating IP to: ${ipAddress}`);
    const success = await this._hetzner.updateDnsRecord(this._recordId, "@", "A", ipAddress, 300);
    console.log("[updater  ] " + (success ? "IP address updated." : "Could not update IP address."));
    return success;
  }
}