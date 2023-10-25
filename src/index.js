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

  // Create sub-menu section using array

  // if (menuLinks[i].hasOwnProperty("sublinks")) {
  //   let sublinksLength = menuLinks[i].sublinks.length;
  //   for (let x = 0; x < sublinksLength; x++) {
  //     let anchorSubLinks = document.createElement("a");
  //     anchorSubLinks.setAttribute("href", menuLinks[i].sublinks[x].href);
  //     anchorSubLinks.textContent = menuLinks[i].sublinks[x].text;
  //     subMenuEl.appendChild(anchorSubLinks);
  //   }
  // }
}

//Create a for loop
//test:
// console.log(menuLinks[1].sublinks[1].text);

// 2.4 - Deactivate the nav buttons
let topMenuLinks = topMenuEl.querySelectorAll("a");

const removeActiveClass = () => {
  topMenuLinks.forEach((link) => {
    if (link.classList.contains("active")) {
      link.classList.remove("active");
    }
  });
};

// Event listener: Toggle "active" class
const handlingTopMenu = (event) => {
  event.preventDefault();
  removeActiveClass();
  event.target.classList.toggle("active");

  if (event.target.tagName === "A") {
    // Find the array equal to the clicked nav button
    let clickedNavBtn = event.target.textContent;
    console.log(clickedNavBtn);
    const menuLinksObj = menuLinks.find(
      (subMenuLinks) => subMenuLinks.text === clickedNavBtn
    );
    // btnHasSubMenu will return 'undefined' if sublinks does not exist
    let btnHasSubMenu = menuLinksObj.hasOwnProperty("sublinks");
    let btnIsActive = event.target.classList.contains("active");

    if (btnHasSubMenu && btnIsActive) {
      subMenuEl.style.top = "100%";
    } else {
      subMenuEl.style.top = "0";
    }
  }
};
topMenuEl.addEventListener("click", handlingTopMenu);

// if sublinks exist in the array &&
// the className is "active", show the sub-menu
// Study the following logic:
// const handlingTopMenu = (event) => {
//   event.preventDefault();
//   if (event.target.tagName === "A") {
//     const clickedLink = menuLinks.find(
//       (link) => link.text === event.target.textContent
//     );
//     if (!event.target.classList.contains("active")) {
//       if (clickedLink && clickedLink.sublinks) {
//         subMenuEl.style.top = "100%";
//       } else {
//         subMenuEl.style.top = "0";
//       }
//     }
//     removeActiveClass();
//     event.target.classList.toggle("active");
//   }
// };

// topMenuEl.addEventListener("click", handlingTopMenu);
