# GitHub Actions Setup

This document explains how to set up and use the GitHub Actions workflows for this repository.

## Workflows

This repository contains the following GitHub Actions workflows:

1. **Main Branch Packaging (`pack-extension.yml`)**: Automatically packages the extension when changes are pushed to the main branch.
2. **Release Creation (`release.yml`)**: Creates a GitHub release with packaged extension files when a new tag is pushed.
3. **Dev Branch Testing (`dev-test.yml`)**: Tests the packaging process when changes are pushed to the dev branch.

## Setting Up Secrets

For consistent signing of your extension, you should set up a GitHub repository secret:

### EXTENSION_PRIVATE_KEY

This secret should contain the contents of your private key file. This ensures that the same key is used for signing the extension across all workflow runs, allowing Chrome to recognize updates properly.

To set up this secret:

1. Generate a private key locally:

   ```bash
   openssl genrsa -out private.pem 2048
   ```

2. Copy the contents of the private.pem file:

   ```bash
   cat private.pem
   ```

3. Go to your GitHub repository, then:
   - Click on "Settings"
   - Navigate to "Secrets and variables" → "Actions"
   - Click "New repository secret"
   - Name: `EXTENSION_PRIVATE_KEY`
   - Value: Paste the entire content of your private.pem file
   - Click "Add secret"

If this secret is not set, the workflows will generate a new key for each run, which is not recommended for production use as it would prevent Chrome from recognizing the extension as an update to a previously installed version.

## Development Workflow

The recommended development workflow is:

1. Create feature branches from the `dev` branch
2. Make your changes and push to your feature branch
3. Create a pull request to merge into the `dev` branch
4. Test the changes on the `dev` branch
5. When ready for release, create a pull request from `dev` to `main`
6. After merging to `main`, tag the release:
   ```bash
   git checkout main
   git pull
   git tag v1.0.1  # Use appropriate version number
   git push origin v1.0.1
   ```

The GitHub Actions will automatically:

- Package your extension when changes are pushed to `main`
- Create a release with the packaged files when you push a tag

## Manual Trigger

All workflows can also be triggered manually from the GitHub Actions tab in your repository.
