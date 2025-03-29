// Main entry point - Execute when DOM is fully loaded
window.addEventListener("load", function () {
  initializeBookSearch();
});

/**
 * Initializes the book search functionality
 * Creates panel and handles the book data extraction and search flow
 */
function initializeBookSearch() {
  const floatingPanel = window.createPanel();
  const panelContent = floatingPanel.querySelector(".panel-content");

  const bookData = extractBookData();

  if (bookData && bookData.name) {
    const bookName = bookData.name;
    showLoadingState(panelContent);
    searchBookAndDisplayResults(bookName, panelContent);
  } else {
    showErrorMessage(panelContent, "اطلاعات کتاب در این صفحه یافت نشد");
  }
}

/**
 * Extracts book data from JSON-LD script tags on the page
 * @returns {Object|null} The book data object or null if not found
 */
function extractBookData() {
  // Find all <script> elements with type="application/ld+json"
  const ldJsonScripts = document.querySelectorAll(
    'script[type="application/ld+json"]'
  );

  // Extract the content of each script element
  const ldJsonData = Array.from(ldJsonScripts).map((script) =>
    JSON.parse(script.textContent)
  );

  // Find the book data from JSON-LD
  return ldJsonData.find((data) => data["@type"] === "Book");
}

/**
 * Shows loading state in the panel
 * @param {HTMLElement} panelContent - The panel content element
 */
function showLoadingState(panelContent) {
  panelContent.innerHTML =
    '<div class="loading">در حال جستجوی کتاب‌ها...</div>';
}

/**
 * Shows error message in the panel
 * @param {HTMLElement} panelContent - The panel content element
 * @param {string} message - Error message to display
 */
function showErrorMessage(panelContent, message) {
  panelContent.innerHTML = `<div class="error">${message}</div>`;
}

/**
 * Initiates book search and handles the results
 * @param {string} bookName - Name of the book to search for
 * @param {HTMLElement} panelContent - The panel content element
 */
function searchBookAndDisplayResults(bookName, panelContent) {
  searchIranketab(bookName)
    .then((results) => {
      displaySearchResults(results, panelContent, bookName);
    })
    .catch((error) => {
      console.error("Error searching Iranketab:", error);
      showErrorMessage(panelContent, `خطا در جستجو: ${error.message}`);
    });
}

/**
 * Creates and displays book search results in the panel
 * @param {Array} results - Array of book results from search
 * @param {HTMLElement} panelContent - The panel content element
 * @param {string} bookName - Name of the book searched for
 */
function displaySearchResults(results, panelContent, bookName) {
  if (results.length === 0) {
    panelContent.innerHTML = `<div class="no-results">هیچ نتیجه‌ای برای "${bookName}" یافت نشد</div>`;
    return;
  }

  let html = createResultsHeaderHtml(results, bookName);
  html += '<ul class="book-results">';

  results.forEach((result) => {
    html += createBookItemHtml(result);
  });

  html += "</ul>";
  panelContent.innerHTML = html;
}

/**
 * Creates HTML for the results header
 * @param {Array} results - Array of search results
 * @param {string} bookName - Name of the book searched for
 * @returns {string} HTML string for the header
 */
function createResultsHeaderHtml(results, bookName) {
  const resultText = results.length > 1 ? "نتیجه" : "نتیجه";
  return `<h4>${results.length} ${resultText} برای "${bookName}" یافت شد:</h4>`;
}

/**
 * Creates HTML for a single book result item
 * @param {Object} result - Book result object
 * @returns {string} HTML string for the book item
 */
function createBookItemHtml(result) {
  const imageHtml = result.imageUrl
    ? `<img src="${result.imageUrl}" alt="${result.title}" class="book-image">`
    : "";

  return `
    <li class="book-item">
      <div class="book-content">
        ${imageHtml}
        <div class="book-details">
          <div class="book-title">${result.title}</div>
          <div class="book-price">${result.price}</div>
          <a href="${result.url}" target="_blank" class="book-link">مشاهده در ایران‌کتاب</a>
        </div>
      </div>
    </li>
  `;
}

// Example JSON-LD data structure (preserved from original code for reference)
//   [
//     {
//         "@context": "https://schema.org",
//         "@type": "Book",
//         "name": "از غبار بپرس",
//         "image": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1554517635i/39322908.jpg",
//         "bookFormat": "Paperback",
//         "numberOfPages": 251,
//         "inLanguage": "Persian",
//         "isbn": "9789643626280",
//         "author": [
//             {
//                 "@type": "Person",
//                 "name": "John Fante",
//                 "url": "https://www.goodreads.com/author/show/25864.John_Fante"
//             },
//             {
//                 "@type": "Person",
//                 "name": "بابک تبرایی",
//                 "url": "https://www.goodreads.com/author/show/1614454._"
//             }
//         ],
//         "aggregateRating": {
//             "@type": "AggregateRating",
//             "ratingValue": 4.11,
//             "ratingCount": 35406,
//             "reviewCount": 2570
//         }
//     }
// ]
