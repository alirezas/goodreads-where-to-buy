const someAction = () => {
  console.log("content.js loaded");
};

// Select the element containing the ISBN value
var DescListItems = document.querySelectorAll(
  ".EditionDetails .DescListItem dt"
);

for (var i = 0; i < DescListItems.length; i++) {
  if (DescListItems[i].textContent === "ISBN") {
    // Select the ISBN value
    var ISBN = DescListItems[i].nextElementSibling.textContent;
    // Send the ISBN value to the background script
    //   chrome.runtime.sendMessage({ ISBN: ISBN });
    alert("2: " + ISBN);
    console.log(ISBN);
  }
}

document.addEventListener("load", someAction);
