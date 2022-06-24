import { publicIpv4 } from "public-ip";

export default class IPCheck {
  constructor() {
    publicIpv4().then(address => this._currentIp = address);
  }

  async check() {
    const lastIp = this._currentIp;
    [this._currentIp] = await Promise.all([publicIpv4()]);
    return lastIp !== this._currentIp;
  }

  getIpAddress() {
    return this._currentIp;
  }
}