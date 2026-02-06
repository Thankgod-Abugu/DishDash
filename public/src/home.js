/* NAVIGATION & SCROLL LOGIC */
const pageSections = document.querySelectorAll("section");
const allNavLinks = document.querySelectorAll(".nav-links");

// This function runs every time the user scrolls the mouse/page
window.onscroll = () => {
  pageSections.forEach((currentSection) => {
    let scrollPosition = window.scrollY;

    // Calculate the section's position on the page
    // We subtract 150 pixels so the link highlights slightly before you reach the section
    let sectionTopOffset = currentSection.offsetTop - 175;
    let sectionHeight = currentSection.offsetHeight;
    let sectionId = currentSection.getAttribute("id");

    // Check if our current scroll position is inside the boundaries of this section
    const isInsideSection =
      scrollPosition >= sectionTopOffset &&
      scrollPosition < sectionTopOffset + sectionHeight;

    if (isInsideSection) {
      // 1. Remove the 'active' highlight from ALL links first
      allNavLinks.forEach((link) => {
        link.classList.remove("active");
      });

      // 2. Find the specific link that points to this section and highlight it
      const activeLink = document.querySelector(
        `header nav a[href*=${sectionId}]`,
      );

      if (activeLink) {
        activeLink.classList.add("active");
      }
    }
  });
};

/* MOBILE MENU TOGGLE LOGIC */
const mobileNav = document.querySelector(".mobile-nav");
const navMenu = document.querySelector(".nav-menu");

// Toggles the mobile dropdown menu and mobile-nav icon state
window.toggleMobileMenu = function () {
  mobileNav.classList.toggle("active");
  navMenu.classList.toggle("active");
};

// Closes the mobile menu, typically called after a navigation link is clicked
window.closeMobileMenu = function () {
  mobileNav.classList.remove("active");
  navMenu.classList.remove("active");
};

/* SEND MESSAGE LOGIC */
function handleMsgSubmission(event) {
  // 1. Get the CURRENT values of the input fields at the moment the button is clicked
  const userName = document.querySelector(".name").value;
  const userEmail = document.querySelector(".email").value;
  const msgSubject = document.querySelector(".subject").value;
  const msgBody = document.querySelector(".message").value;

  // 2. Check if any of the fields are empty
  const isAnyFieldEmpty =
    userName === "" || userEmail === "" || msgSubject === "" || msgBody === "";

  if (isAnyFieldEmpty) {
    // Stop the form from sending
    event.preventDefault();
  } else {
    alert("Your Message was sent successfully!");
  }
}
