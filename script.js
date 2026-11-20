const navItems = document.querySelectorAll(".navbar li");

navItems.forEach((item) => {
    item.querySelector("a").addEventListener("click", () => {
        navItems.forEach((navItem) => {
            navItem.classList.remove("active");
            navItem.querySelector("a").removeAttribute("aria-current");
            const icon = navItem.querySelector("img");
            icon.src = icon.dataset.black;
        });

        item.classList.add("active");
        item.querySelector("a").setAttribute("aria-current", "page");
        const icon = item.querySelector("img");
        icon.src = icon.dataset.pink;
    });
});
