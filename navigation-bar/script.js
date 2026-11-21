/*
  Loads the shared navbar into pages
  that contain the navbar container.
*/
document.addEventListener("DOMContentLoaded", async () => {
  const navbarContainer =
    document.getElementById("navbar-container");

  /*
    Stop if this page does not use
    the shared navbar.
  */
  if (!navbarContainer) {
    return;
  }

  try {
    /*
      Load the navbar HTML fragment.
    */
    const response = await fetch(
      "../navigation-bar/navbar.html"
    );

    /*
      Show an error if the file path is incorrect.
    */
    if (!response.ok) {
      throw new Error(
        `Navbar could not load: ${response.status}`
      );
    }

    /*
      Insert the navbar into the page.
    */
    navbarContainer.innerHTML =
      await response.text();

    /*
      Set up clicks and profile photo
      after the navbar has been inserted.
    */
    setupNavigation();

  } catch (error) {
    console.error("Navbar loading error:", error);
  }
});


/*
  Sets up navigation behavior
  after navbar.html has loaded.
*/
function setupNavigation() {
  const navItems =
    document.querySelectorAll(".navbar li");

  const profileNavIcon =
    document.getElementById("profileNavIcon");

  /*
    Load the saved account from localStorage.
  */
  const savedAccount =
    localStorage.getItem("matchupAccount");

  /*
    Display the uploaded profile photo
    if the user selected one during signup.
  */
  if (savedAccount && profileNavIcon) {
    try {
      const account = JSON.parse(savedAccount);

      if (account.profilePhoto) {
        profileNavIcon.src =
          account.profilePhoto;

        profileNavIcon.classList.add(
          "uploaded-profile-photo"
        );
      }
    } catch (error) {
      console.error(
        "Unable to load saved profile photo:",
        error
      );
    }
  }

  /*
    Add click behavior to each navigation item.
  */
  navItems.forEach((item) => {
    const link = item.querySelector("a");
    const icon = item.querySelector("img");

    link.addEventListener("click", () => {
      /*
        Remove the active state from
        every navigation item.
      */
      navItems.forEach((navItem) => {
        navItem.classList.remove("active");

        navItem
          .querySelector("a")
          .removeAttribute("aria-current");
      });

      /*
        Activate the clicked navigation item.
      */
      item.classList.add("active");

      link.setAttribute(
        "aria-current",
        "page"
      );
    });
  });
}