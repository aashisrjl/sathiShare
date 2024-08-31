const ip = require('ip');

function normalizeIp(ipAddress) {
  // Check if the IP is in IPv6 format and normalize it
  return ip.isV6Format(ipAddress) ? ip.toString(ip.toBuffer(ipAddress)) : ipAddress;
}

module.exports = { normalizeIp };

