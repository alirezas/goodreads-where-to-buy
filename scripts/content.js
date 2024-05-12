window.addEventListener("load", function () {
  const DescListItems = document.querySelectorAll(
    ".EditionDetails .DescListItem dt"
  );

  for (const i = 0; i < DescListItems.length; i++) {
    if (DescListItems[i].textContent === "ISBN") {
      const ISBN = DescListItems[i].nextElementSibling.textContent;
    }
  }
});
