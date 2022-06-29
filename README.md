# 🚀 Hetzner DDNS Agent

![Build Status](https://github.com/tinyoverflow/hetzner-ddns-agent/actions/workflows/docker.yml/badge.svg)
![Version](https://img.shields.io/github/v/tag/tinyoverflow/hetzner-ddns-agent?label=Version&sort=semver)
![Updated](https://img.shields.io/github/last-commit/tinyoverflow/hetzner-ddns-agent?label=Updated)

This program allows to use [Hetzner DNS](https://www.hetzner.com/dns-console) as
a [DDNS](https://en.wikipedia.org/wiki/Dynamic_DNS) service. It does that by updating a given record inside a DNS zone
to the current public IPv4 address.

To minimize API calls to the Hetzner API, it'll check if the IP is different from the previous IP. It *cannot* detect if
the IP has changed on Hetzners side to update accordingly. The update will only be triggered on start or when the public
IP changed.

It uses the following packages:

- [public-ip](https://github.com/sindresorhus/public-ip) to retrieve the current public IPv4 address.
- [node-cron](https://github.com/node-cron/node-cron) to schedule the continuous updates.

## Usage

This service is available as a Docker image, so you can get up and running in just a minute. The image is available
at `ghcr.io/tinyoverflow/hetzner-ddns-agent:latest`. All tags can be found at
the [GitHub container registry](https://github.com/tinyoverflow/hetzner-ddns-agent/pkgs/container/hetzner-ddns-agent).

While this container does not require any additional dependencies
or port mappings, it requires the configuration of some environment variables to work properly.

### Environment variables

| Variable      | Type   | Required | Default       | Description                                                                                              |
|---------------|--------|----------|:--------------|----------------------------------------------------------------------------------------------------------|
| API_TOKEN     | string | Yes      | -             | You can create an API token in your [Hetzner DNS Console](https://dns.hetzner.com/settings/api-token).   |
| ZONE_ID       | string | Yes      | -             | ID of the zone in which your record is located.                                                          |
| RECORD_ID     | string | Yes      | -             | ID of the record to keep updated.                                                                        |
| RECORD_NAME   | string | No       | `@`           | Name of the record. This is basically the subdomain, or `@` if you want to use the domain itself.        |
| RECORD_TTL    | int    | No       | `300`         | TTL of the record in seconds. It defines how long the entry should be cached by DNS servers and clients. |
| CRON_INTERVAL | string | No       | `*/5 * * * *` | Cron interval in which a check for a new IP address should be performed. Defaults to every 5 minutes.    |

### Start Docker container

```sh
# Download the current image.
$ docker pull ghcr.io/tinyoverflow/hetzner-ddns-agent:latest

# Run the docker container.
$ docker run --name hetzner-ddns-agent --detach \
    -e "API_TOKEN=YOUR_API_TOKEN" \
    -e "ZONE_ID=YOUR_ZONE_ID" \
    -e "RECORD_ID=YOUR_RECORD_ID" \
    ghcr.io/tinyoverflow/hetzner-ddns-agent:latest
```

## Exit Codes

| Code | Meaning                            |
|-----:|------------------------------------|
|    0 | Success. Nothing special happened. |
|    1 | Missing configuration parameters.  |