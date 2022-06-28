import { publicIpv4 } from "public-ip";

export default class IPCheck {
  async query() {
    return publicIpv4();
  }
}