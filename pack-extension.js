#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const ChromeExtension = require("crx");
const manifest = require("./manifest.json");

// Define variables
const name = "goodreads-where-to-buy";
const version = manifest.version;
const keyPath = path.resolve(__dirname, "keys/private.pem");
const outputDir = path.resolve(__dirname, "dist");

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Create a new ChromeExtension instance
const crx = new ChromeExtension({
  privateKey: fs.readFileSync(keyPath),
});

async function pack() {
  try {
    // Pack the extension
    console.log(`Packing extension version ${version}...`);

    // Load the extension from the current directory
    await crx.load(path.resolve(__dirname));

    // Pack to CRX
    const crxBuffer = await crx.pack();

    // Generate CRX filename
    const crxFileName = `${name}-${version}.crx`;
    const crxPath = path.join(outputDir, crxFileName);

    // Save the CRX file
    fs.writeFileSync(crxPath, crxBuffer);

    console.log("Extension packed successfully:");
    console.log(` - CRX file: ${crxPath}`);

    // Let's also create a ZIP file using native Node.js functionality
    console.log("Creating ZIP file...");
    const { exec } = require("child_process");
    const zipFileName = `${name}-${version}.zip`;
    const zipPath = path.join(outputDir, zipFileName);

    // Using zip command if available (on macOS/Linux)
    exec(
      `zip -r "${zipPath}" . -x "node_modules/*" -x "dist/*" -x ".git/*" -x "keys/*"`,
      (error) => {
        if (error) {
          console.error("Error creating ZIP file:", error);
          return;
        }
        console.log(` - ZIP file: ${zipPath}`);
      }
    );
  } catch (err) {
    console.error("Error packing extension:", err);
    process.exit(1);
  }
}

pack();
