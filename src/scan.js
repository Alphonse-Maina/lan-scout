const ping = require("ping");
const { scanPorts } = require("./portScan");
const { guessDevice } = require("./deviceGuess");

const COMMON_PORTS = [80, 443, 554, 8000, 22];

function generateIPs(subnet) {
  const [base, mask] = subnet.split("/");
  if (mask !== "24") {
    console.error("Only /24 subnets supported");
    process.exit(1);
  }
  const parts = base.split(".");
  const prefix = `${parts[0]}.${parts[1]}.${parts[2]}`;
  return Array.from({ length: 254 }, (_, i) => `${prefix}.${i + 1}`);
}

async function scanSubnet(subnet) {
  const ips = generateIPs(subnet);
  console.log(`Scanning ${ips.length} IPs...\n`);

  for (const ip of ips) {
    const res = await ping.promise.probe(ip, { timeout: 1 });
    if (!res.alive) continue;

    const openPorts = await scanPorts(ip, COMMON_PORTS);
    const device = guessDevice(openPorts);

    console.log(
      `${ip}\tONLINE\t[${openPorts.join(",") || "-"}]\t${device}`
    );
  }
}

module.exports = { scanSubnet };
