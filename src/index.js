// const styles = require("./styles.css");
// Menu data structure
const menuLinks = [
  { text: "about", href: "/about" },
  {
    text: "catalog",
    href: "#",
    sublinks: [
      { text: "all", href: "/catalog/all" },
      { text: "top-selling", href: "/catalog/top" },
      { text: "search", href: "/catalog/search" },
    ],
  },
  {
    text: "orders",
    href: "#",
    sublinks: [
      { text: "new", href: "/orders/new" },
      { text: "pending", href: "/orders/pending" },
      { text: "history", href: "/orders/history" },
    ],
  },
  {
    text: "account",
    href: "#",
    sublinks: [
      { text: "profile", href: "/account/profile" },
      { text: "signout", href: "/account/signout" },
    ],
  },
];

let menuLinksObj;
// PART 1.1
let mainEl = document.querySelector("main");
mainEl.style.backgroundColor = "#4a4e4d";
let mainHeader = document.createElement("h1");
mainHeader.textContent = "DOM Manipulation";
mainEl.appendChild(mainHeader);
mainEl.classList.add("flex-ctr");

// PART 1.2
let topMenuEl = document.querySelector("#top-menu");
topMenuEl.style.height = "100%";
topMenuEl.style.backgroundColor = "#0e9aa7";
topMenuEl.classList.add("flex-around");

// 2.3
let subMenuEl = document.querySelector("#sub-menu");
subMenuEl.style.height = "100%";
subMenuEl.style.backgroundColor = "#3da4ab";
subMenuEl.classList.add("flex-around");
subMenuEl.style.position = "absolute";
subMenuEl.style.top = "0";

// PART 1.3 Create the <a> elements using array

for (let i = 0; i < menuLinks.length; i++) {
  let anchorLinks = document.createElement("a");
  anchorLinks.setAttribute("href", menuLinks[i].href);
  anchorLinks.textContent = menuLinks[i].text;
  topMenuEl.appendChild(anchorLinks);
}

// 2.4 - Deactivate other nav buttons when new buttons is clicked

const removeActiveClass = () => {
  let topMenuLinks = topMenuEl.querySelectorAll("a");
  topMenuLinks.forEach((link) => {
    if (link.classList.contains("active")) {
      link.classList.remove("active");
    }
  });
};

// helper function Dynamic sub menu
const buildSubmenu = (sublinkArray) => {
  let submenuLinks = subMenuEl.querySelectorAll("a");
  submenuLinks.forEach((link) => {
    link.textContent = "";
  });

  for (let x = 0; x < sublinkArray.length; x++) {
    let anchorSubLinks = document.createElement("a");
    anchorSubLinks.setAttribute("href", sublinkArray[x].href);
    anchorSubLinks.textContent = sublinkArray[x].text;
    subMenuEl.appendChild(anchorSubLinks);
  }
};

// Event listener: Toggle "active" class
let secondClickTracker = null;
const handlingTopMenu = (event) => {
  event.preventDefault();
  removeActiveClass();
  event.target.classList.toggle("active");

  if (event.target.tagName === "A") {
    // Find the array equal to the clicked nav button
    let clickedNavBtn = event.target.textContent;
    console.log(clickedNavBtn); //Requirement
    menuLinksObj = menuLinks.find(
      (subMenuLinks) => subMenuLinks.text === clickedNavBtn
    );

    // btnHasSubMenu will return 'undefined' if sublinks does not exist
    let btnHasSubMenu = menuLinksObj.hasOwnProperty("sublinks");
    let btnIsActive = event.target.classList.contains("active");
    let secondClick = secondClickTracker == clickedNavBtn;

    // sub-menu will be hidden if same button is clicked twice
    if (btnHasSubMenu && btnIsActive && !secondClick) {
      subMenuEl.style.top = "100%";
      // Evoke helper function
      buildSubmenu(menuLinksObj.sublinks);
      // Tracker for the second click
      secondClickTracker = clickedNavBtn;
    } else {
      subMenuEl.style.top = "0";
      secondClickTracker = null;
    }
  }
};
topMenuEl.addEventListener("click", handlingTopMenu);

const handlingSubMenu = (evt) => {
  evt.preventDefault();
  //return if not <a>

  // submenu should be hidden
  // h1 element in top menu must be updated
};
