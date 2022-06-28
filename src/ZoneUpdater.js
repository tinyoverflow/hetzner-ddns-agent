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

  async updateCurrentIp() {
    this._currentIp = await this._hetzner.getRecordValue(this._recordId);
  }

  start() {
    console.log("[scheduler] Starting scheduler...");
    cron.schedule("0 */5 * * * *", this.update);
  }

  async update() {
    const ipAddress = await this._ipCheck.query();
    if (ipAddress === this._currentIp) return;

    console.log(`[updater  ] Updating IP to ${ipAddress}`);
    const success = await this._hetzner.updateDnsRecord(this._recordId, "@", "A", ipAddress, 300);

    if (success) {
      console.log("[updater  ] Hetzner confirmed the DNS update. Verifying change...");
      const newIpAddress = await this._hetzner.getRecordValue(this._recordId);
      console.log("[updater  ] " + (newIpAddress === ipAddress ? "Update was successful." : "Update was not successful, soemhow."))
    } else {
      console.log("[updater  ] Could not update IP address.");
    }

    return success;
  }
}