#!/usr/bin/env node

const { Command } = require("commander");
const program = new Command();

program
  .name("lan-scout")
  .description("Scan a local network and identify active devices")
  .version("1.0.0");

program
  .command("scan <subnet>")
  .description("Scan a subnet (e.g. 192.168.1.0/24)")
  .action((subnet) => {
    console.log(`Scanning subnet: ${subnet}`);
  });

program.parse(process.argv);
