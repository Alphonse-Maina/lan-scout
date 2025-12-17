const net = require("net");

function checkPort(ip, port, timeout = 500) {
  return new Promise((resolve) => {
    const socket = new net.Socket();

    socket.setTimeout(timeout);
    socket.once("connect", () => {
      socket.destroy();
      resolve(port);
    });

    socket.once("timeout", () => {
      socket.destroy();
      resolve(null);
    });

    socket.once("error", () => {
      resolve(null);
    });

    socket.connect(port, ip);
  });
}

async function scanPorts(ip, ports) {
  const checks = ports.map((p) => checkPort(ip, p));
  const results = await Promise.all(checks);
  return results.filter(Boolean);
}

module.exports = { scanPorts };
