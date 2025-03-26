chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "searchIranketab") {
    fetch(
      `https://www.iranketab.ir/search/${encodeURIComponent(request.bookName)}`,
      {
        method: "GET",
        headers: {
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.5",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/115.0",
        },
        mode: "cors",
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then((html) => {
        try {
          // Parse the outer JSON that contains the inner JSON string
          const jsonResponse = JSON.parse(html);

          // Check if we have the expected structure
          if (jsonResponse.data && jsonResponse.data.content) {
            sendResponse({
              success: true,
              parsedData: jsonResponse.data,
              html: jsonResponse.data.content,
            });
          } else {
            // If the structure is different, just send the raw response
            sendResponse({ success: true, html });
          }
        } catch (error) {
          console.error("Error parsing JSON response:", error);
          // If parsing fails, just send the raw HTML
          sendResponse({ success: true, html });
        }
      })
      .catch((error) => {
        console.error("Error in background script:", error);
        sendResponse({ success: false, error: error.message });
      });

    return true; // Will respond asynchronously
  }
});
