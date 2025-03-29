/**
 * Main function to create the floating panel
 * @returns {HTMLElement} The panel element
 */
function createPanel() {
  const floatingPanel = createPanelElement();
  addStylesToDocument();
  setupCloseButton(floatingPanel);
  return floatingPanel;
}

/**
 * Creates and appends the panel DOM element
 * @returns {HTMLElement} The created panel element
 */
function createPanelElement() {
  const floatingPanel = document.createElement("div");
  floatingPanel.id = "goodreads-where-to-buy-panel";
  floatingPanel.innerHTML = createPanelHTML();
  document.body.appendChild(floatingPanel);
  return floatingPanel;
}

/**
 * Creates the HTML content for the panel
 * @returns {string} HTML content as a string
 */
function createPanelHTML() {
  return `
    <div class="panel-header">
      <h3>Where to Buy</h3>
      <button class="close-button">×</button>
    </div>
    <div class="panel-content">
      <div class="loading">Loading...</div>
    </div>
  `;
}

/**
 * Creates and adds the CSS styles to the document
 */
function addStylesToDocument() {
  const styles = document.createElement("style");
  styles.textContent = getPanelStyles();
  document.head.appendChild(styles);
}

/**
 * Sets up the close button click handler
 * @param {HTMLElement} panelElement - The panel DOM element
 */
function setupCloseButton(panelElement) {
  const closeButton = panelElement.querySelector(".close-button");
  closeButton.addEventListener("click", () => {
    panelElement.style.display = "none";
  });
}

/**
 * Contains all CSS styles for the panel
 * @returns {string} CSS styles as a string
 */
function getPanelStyles() {
  return `
    #goodreads-where-to-buy-panel {
      position: fixed;
      top: 20px;
      right: 20px;
      width: 320px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      z-index: 9999;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }

    .panel-header {
      padding: 12px 16px;
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .panel-header h3 {
      margin: 0;
      font-size: 16px;
      color: #333;
    }

    .close-button {
      background: none;
      border: none;
      font-size: 20px;
      cursor: pointer;
      color: #666;
      padding: 0 4px;
    }

    .close-button:hover {
      color: #333;
    }

    .panel-content {
      padding: 16px;
      max-height: calc(100vh - 100px);
      overflow-y: auto;
    }

    .loading {
      text-align: center;
      color: #666;
    }

    .error, .no-results {
      text-align: center;
      color: #666;
      padding: 10px;
    }

    .error {
      color: #d32f2f;
    }

    .book-results {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .book-item {
      padding: 12px;
      border-bottom: 1px solid #eee;
      margin-bottom: 8px;
    }

    .book-item:last-child {
      border-bottom: none;
      margin-bottom: 0;
    }

    .book-content {
      display: flex;
      gap: 12px;
    }

    .book-image {
      width: 60px;
      height: 80px;
      object-fit: cover;
      border-radius: 4px;
      border: 1px solid #eee;
    }

    .book-details {
      flex: 1;
    }

    .book-title {
      font-weight: bold;
      margin-bottom: 4px;
      line-height: 1.3;
    }

    .book-price {
      color: #2e7d32;
      font-weight: bold;
      margin-bottom: 8px;
    }

    .book-link {
      display: inline-block;
      background: #f1c40f;
      color: #333;
      text-decoration: none;
      padding: 6px 12px;
      border-radius: 4px;
      font-size: 14px;
      transition: background 0.2s;
    }

    .book-link:hover {
      background: #f39c12;
    }

    h4 {
      margin-top: 0;
      margin-bottom: 12px;
      font-size: 14px;
      color: #333;
    }
  `;
}

// Make the function available globally for the extension
window.createPanel = createPanel;
