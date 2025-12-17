const ping = require("ping");

function generateIPs(subnet) {
  // Expect format: 192.168.10.0/24
  const [base, mask] = subnet.split("/");

  if (mask !== "24") {
    console.error("Only /24 subnets are supported for now");
    process.exit(1);
  }

  const parts = base.split(".");
  if (parts.length !== 4) {
    console.error("Invalid subnet format");
    process.exit(1);
  }

  const prefix = `${parts[0]}.${parts[1]}.${parts[2]}`;

  const ips = [];
  for (let i = 1; i <= 254; i++) {
    ips.push(`${prefix}.${i}`);
  }
  return ips;
}

async function scanSubnet(subnet) {
  const ips = generateIPs(subnet);
  console.log(`Scanning ${ips.length} IPs...\n`);

  for (const ip of ips) {
    try {
      const res = await ping.promise.probe(ip, { timeout: 1 });
      if (res.alive) {
        console.log(`${ip}\tONLINE`);
      }
    } catch {
      // ignore
    }
  }
}

module.exports = { scanSubnet };
