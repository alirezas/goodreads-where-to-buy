window.addEventListener("load", function () {
  const floatingPanel = window.createPanel();

  // Find all <script> elements with type="application/ld+json"
  const ldJsonScripts = document.querySelectorAll(
    'script[type="application/ld+json"]'
  );

  // Extract the content of each script element
  const ldJsonData = Array.from(ldJsonScripts).map((script) =>
    JSON.parse(script.textContent)
  );

  // Find the book data from JSON-LD
  const bookData = ldJsonData.find((data) => data["@type"] === "Book");
  if (bookData && bookData.name) {
    const bookName = bookData.name;
    // Show loading state in panel
    const panelContent = floatingPanel.querySelector(".panel-content");
    panelContent.innerHTML =
      '<div class="loading">Searching for books...</div>';

    // Search Iranketab with the book name
    searchIranketab(bookName)
      .then((results) => {
        // Update the panel with search results
        displaySearchResults(results, panelContent, bookName);
      })
      .catch((error) => {
        console.error("Error searching Iranketab:", error);
        panelContent.innerHTML = `<div class="error">Error searching: ${error.message}</div>`;
      });
  } else {
    const panelContent = floatingPanel.querySelector(".panel-content");
    panelContent.innerHTML =
      '<div class="error">No book information found on this page</div>';
  }

  // Function to display search results in the panel
  function displaySearchResults(results, panelContent, bookName) {
    if (results.length === 0) {
      panelContent.innerHTML = `<div class="no-results">No results found for "${bookName}"</div>`;
      return;
    }

    let html = `<h4>Found ${results.length} result${
      results.length > 1 ? "s" : ""
    } for "${bookName}":</h4>`;
    html += '<ul class="book-results">';

    results.forEach((result) => {
      let imageHtml = "";
      if (result.imageUrl) {
        imageHtml = `<img src="${result.imageUrl}" alt="${result.title}" class="book-image">`;
      }

      html += `
        <li class="book-item">
          <div class="book-content">
            ${imageHtml}
            <div class="book-details">
              <div class="book-title">${result.title}</div>
              <div class="book-price">${result.price}</div>
              <a href="${result.url}" target="_blank" class="book-link">View on Iranketab</a>
            </div>
          </div>
        </li>
      `;
    });

    html += "</ul>";
    panelContent.innerHTML = html;
  }

  // Example
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
});
