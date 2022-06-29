export default {
  apiToken: process.env.API_TOKEN,
  zoneId: process.env.ZONE_ID,
  recordId: process.env.RECORD_ID,
  recordName: process.env.RECORD_NAME ?? "@",
  recordTtl: process.env.RECORD_TTL ?? 300,
};