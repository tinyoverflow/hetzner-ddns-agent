import axios from "axios";

const baseUrl = "https://dns.hetzner.com/api/v1/records";

export default class HetznerZoneClient {
  constructor(apiToken, zoneId) {
    this.apiToken = apiToken;
    this.zoneId = zoneId;
  }

  /**
   * Updates the specified record ID with the given IP address.
   * @param {string} recordId
   * @param {string} name
   * @param {string} type
   * @param {string} value
   * @param {int} ttl
   */
  async updateDnsRecord(recordId, name, type, value, ttl) {
    const response = await axios.put(`${baseUrl}/${recordId}`, {
      name: name,
      type: type,
      value: value,
      zone_id: this.zoneId,
      ttl: ttl,
    }, { headers: { "Auth-API-Token": this.apiToken } });

    return response.status === 200;
  }

  async getRecordValue(recordId) {
    const response = await axios.get(`${baseUrl}/${recordId}`, { headers: { "Auth-API-Token": this.apiToken } });
    return response.data.record.value;
  }
}