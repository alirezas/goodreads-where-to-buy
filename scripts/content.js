window.addEventListener("load", function () {
  // Find all <script> elements with type="application/ld+json"
  const ldJsonScripts = document.querySelectorAll(
    'script[type="application/ld+json"]'
  );

  // Extract the content of each script element
  const ldJsonData = Array.from(ldJsonScripts).map((script) =>
    JSON.parse(script.textContent)
  );

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
