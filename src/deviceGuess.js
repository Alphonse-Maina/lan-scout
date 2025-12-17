function guessDevice(openPorts) {
  if (openPorts.includes(554)) return "IP Camera";
  if (openPorts.includes(8000)) return "NVR / DVR";
  if (openPorts.includes(80) || openPorts.includes(443)) return "Router / Web Device";
  if (openPorts.includes(22)) return "Server / Linux Host";
  return "Unknown";
}

module.exports = { guessDevice };
