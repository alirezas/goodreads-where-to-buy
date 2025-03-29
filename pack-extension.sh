#!/bin/bash

# Define variables
EXTENSION_NAME="goodreads-where-to-buy"
EXTENSION_VERSION=$(grep -o '"version": "[^"]*"' manifest.json | cut -d'"' -f4)
PRIVATE_KEY="keys/private.pem"
OUTPUT_DIR="dist"

# Create output directory if it doesn't exist
mkdir -p $OUTPUT_DIR

echo "Packing extension version $EXTENSION_VERSION..."

# Create the CRX file using the crx tool
crx pack . --zip-output "$OUTPUT_DIR/${EXTENSION_NAME}-${EXTENSION_VERSION}.zip" \
           --private-key $PRIVATE_KEY \
           --output "$OUTPUT_DIR/${EXTENSION_NAME}-${EXTENSION_VERSION}.crx"

echo "Extension packed successfully:"
echo " - CRX file: $OUTPUT_DIR/${EXTENSION_NAME}-${EXTENSION_VERSION}.crx"
echo " - ZIP file: $OUTPUT_DIR/${EXTENSION_NAME}-${EXTENSION_VERSION}.zip"
