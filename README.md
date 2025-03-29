# Goodreads Where to Buy

A Chrome extension that enhances your Goodreads experience by showing where you can purchase books from Iranian online bookstores directly on book pages.

## Features

- Adds a convenient panel to Goodreads book pages
- Shows available Iranian online bookstores where the book can be purchased
- Seamlessly integrates with the existing Goodreads interface
- Helps Iranian readers find local sources for their desired books

## Installation

### Method 1: Download from GitHub Releases (Recommended)

1. Go to the [Releases](https://github.com/alirezas/goodreads-where-to-buy/releases) page
2. Download the latest `.crx` file from the most recent release
3. Open Chrome and navigate to `chrome://extensions/`
4. Enable "Developer mode" in the top right corner
5. Drag and drop the downloaded `.crx` file onto the Chrome Extensions page
6. Click "Add extension" when prompted

If you encounter any issues with the `.crx` file installation, try the `.zip` method:

1. Download the latest `.zip` file from the Releases page
2. Extract the zip file to a folder on your computer
3. Follow the steps below for "Manual Installation"

### Method 2: Manual Installation

1. Clone this repository or download the source code
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the extension directory

## Usage

1. Visit any book page on Goodreads.com
2. Look for the new panel that appears on the page
3. Browse through the list of Iranian online bookstores where the book is available
4. Click on any store link to visit the book's page on that store

## Packaging

### Local Packaging

Two methods are available to package the extension locally:

1. Using Node.js:

```
npm run pack
```

2. Using Bash script:

```
npm run pack:bash
```

Both methods will generate:

- A `.crx` file that can be installed in Chrome
- A `.zip` file that can be uploaded to the Chrome Web Store

The packaged files will be available in the `dist` directory.

### GitHub Actions Workflows

This repository includes GitHub Actions workflows to automate the packaging process:

1. **Automatic Packaging**: On every push to the main branch, the extension is automatically packaged and made available as artifacts.

2. **Release Creation**: When you push a tag with the format `v*` (e.g., `v1.0`), a GitHub release is automatically created with the packaged extension attached.

3. **Dev Branch Testing**: Pushes to the dev branch automatically trigger a test packaging process.

To create a new release:

```bash
# Update version in manifest.json first
git tag v1.0.1
git push origin v1.0.1
```

The GitHub Actions will automatically create a release with the packaged extension files.

For detailed information about GitHub Actions setup and the development workflow, see [ACTIONS.md](.github/ACTIONS.md).

## Development

This repository follows a branch-based development workflow:

- `main`: Production-ready code. Changes pushed to this branch trigger automatic packaging.
- `dev`: Development branch for testing before merging to main.

For contributing:

1. Fork the repository
2. Create a feature branch from `dev`
3. Make your changes
4. Submit a pull request to the `dev` branch

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
