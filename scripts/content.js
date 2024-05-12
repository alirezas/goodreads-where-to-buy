window.addEventListener("load", function () {
  var DescListItems = document.querySelectorAll(
    ".EditionDetails .DescListItem dt"
  );

  for (var i = 0; i < DescListItems.length; i++) {
    if (DescListItems[i].textContent === "ISBN") {
      var ISBN = DescListItems[i].nextElementSibling.textContent;
    }
  }
});
