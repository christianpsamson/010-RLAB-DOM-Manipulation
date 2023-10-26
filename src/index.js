//=====================================================================//
// Menu data structure
//=====================================================================//
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

//=====================================================================//
// Global Variable
//=====================================================================/

//=====================================================================//
// Main Element Manipulation
//=====================================================================//
let mainEl = document.querySelector("main");
mainEl.style.backgroundColor = "#4a4e4d";
let mainHeader = document.createElement("h1");
mainHeader.textContent = "DOM Manipulation";
mainEl.appendChild(mainHeader);
mainEl.classList.add("flex-ctr");

//=====================================================================//
// Top Menu Element Manipulation
//=====================================================================//
let topMenuEl = document.querySelector("#top-menu");
topMenuEl.style.height = "100%";
topMenuEl.style.backgroundColor = "#0e9aa7";
topMenuEl.classList.add("flex-around");

//=====================================================================//
// Sub Menu Element Manipulation
//=====================================================================//
let subMenuEl = document.querySelector("#sub-menu");
subMenuEl.style.height = "100%";
subMenuEl.style.backgroundColor = "#3da4ab";
subMenuEl.classList.add("flex-around");
subMenuEl.style.position = "absolute";
subMenuEl.style.top = "0";

//=====================================================================//
// Create Anchor Tags for Top Menu Using Array - menuLinks
//=====================================================================//
for (let i = 0; i < menuLinks.length; i++) {
  let anchorLinks = document.createElement("a");
  anchorLinks.setAttribute("href", menuLinks[i].href);
  anchorLinks.textContent = menuLinks[i].text;
  topMenuEl.appendChild(anchorLinks);
}

//=====================================================================//
// Top Menu: Deactivate Other Buttons When New Button is Clicked
//=====================================================================//
const removeActiveClass = () => {
  let topMenuLinks = topMenuEl.querySelectorAll("a");
  topMenuLinks.forEach((link) => {
    if (link.classList.contains("active")) {
      link.classList.remove("active");
    }
  });
};

//=====================================================================//
// Helper Function: buildSubmenu (Dynamic)
//=====================================================================//
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

//=====================================================================//
// Event Handler: handlingTopMenu
//=====================================================================//
let menuLinksObj;
let secondClickTracker = null;
const handlingTopMenu = (event) => {
  event.preventDefault();
  removeActiveClass();
  event.target.classList.toggle("active");

  if (event.target.tagName === "A") {
    // Find the array equal to the clicked nav button
    let clickedNavBtn = event.target.textContent;
    console.log(clickedNavBtn); /*(Requirement)*/
    menuLinksObj = menuLinks.find(
      (subMenuLinks) => subMenuLinks.text === clickedNavBtn
    );

    // Note: btnHasSubMenu will return 'undefined' if sublinks does not exist
    let btnHasSubMenu = menuLinksObj.hasOwnProperty("sublinks");
    let btnIsActive = event.target.classList.contains("active");
    let secondClick = secondClickTracker == clickedNavBtn;

    // Note: sub-menu will be hidden if same button is clicked twice
    if (btnHasSubMenu && btnIsActive && !secondClick) {
      subMenuEl.style.top = "100%";

      // Tracker for the second click
      secondClickTracker = clickedNavBtn;

      // Evoke helper function
      buildSubmenu(menuLinksObj.sublinks);
    } else {
      subMenuEl.style.top = "0";
      secondClickTracker = null;
    }
  }
};
//=====================================================================//
// Register Event Handler for Top Menu
//=====================================================================//
topMenuEl.addEventListener("click", handlingTopMenu);

//=====================================================================//
// Event Handler: handlingSubMenu
//=====================================================================//
const handlingSubMenu = (evt) => {
  evt.preventDefault();
  if (evt.target.tagName === "A") {
    let clickedSubBtn = evt.target.textContent;
    console.log(clickedSubBtn);
    subMenuEl.style.top = "0";
    removeActiveClass;
    mainHeader.textContent = clickedSubBtn;
  }
};

//=====================================================================//
// Register Event Handler for Sub Menu
//=====================================================================//
subMenuEl.addEventListener("click", handlingSubMenu);
