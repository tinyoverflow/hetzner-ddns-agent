# 🚀 Hetzner DDNS Agent

This program allows to use [Hetzner DNS](https://www.hetzner.com/de/dns-console) as
a [DDNS](https://en.wikipedia.org/wiki/Dynamic_DNS) service. It does that by updating a given record inside a DNS zone
to the current public IPv4 address.

To minimize API calls to the Hetzner API, it'll check if the IP is different from the previous IP. It *cannot* detect if
the IP has changed on Hetzners side to update accordingly. The update will only be triggered on start or when the public
IP changed.

It uses the [public-ip](https://github.com/sindresorhus/public-ip) package
by [sindresorhus](https://github.com/sindresorhus) to retrieve the current public IPv4.

## Usage

*To be documented.*

## Exit Codes

| Code | Meaning                            |
|-----:|------------------------------------|
|    0 | Success. Nothing special happened. |
|    1 | Missing configuration parameters.  |