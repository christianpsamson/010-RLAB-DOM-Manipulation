// const styles = require("./styles.css");
// Menu data structure
var menuLinks = [
  { text: "about", href: "/about" },
  { text: "catalog", href: "/catalog" },
  { text: "orders", href: "/orders" },
  { text: "account", href: "/account" },
];
// PART 1
let mainEl = document.querySelector("main");
mainEl.style.backgroundColor = "#4a4e4d";
let mainHeader = document.createElement("h1");
mainHeader.textContent = "DOM Manipulation";
mainEl.appendChild(mainHeader);
mainEl.classList.add("flex-ctr");

// PART 2
let topMenuEl = document.getElementById("top-menu");
topMenuEl.style.height = "100%";
topMenuEl.style.backgroundColor = "#0e9aa7";
topMenuEl.classList.add("flex-around");

// PART 3

for (let i = 0; i < menuLinks.length; i++) {
  let anchorLinks = document.createElement("a");
  anchorLinks.setAttribute("href", menuLinks[i].href);
  anchorLinks.textcontent = menuLinks[i].text;
  topMenuEl.appendChild(anchorLinks);
}
