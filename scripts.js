const header = document.querySelector(".header");
const mobileMenuButton = document.querySelector(".mobile-menu-button");
const menuIcon = document.querySelector(".menu-icon");
const navLinks = document.querySelector(".nav-links");
const pageName = document.body.dataset.page;

function setMenuOpen(isOpen) {
    if (!mobileMenuButton || !navLinks || !menuIcon) {
        return;
    }

    navLinks.classList.toggle("active", isOpen);
    mobileMenuButton.setAttribute("aria-expanded", String(isOpen));
    menuIcon.innerHTML = isOpen ? "&times;" : "&#9776;";
}

if (mobileMenuButton) {
    mobileMenuButton.addEventListener("click", () => {
        setMenuOpen(!navLinks.classList.contains("active"));
    });
}

document.querySelectorAll(".nav-link").forEach((link) => {
    if (link.dataset.nav === pageName) {
        link.classList.add("active");
    }

    link.addEventListener("click", () => setMenuOpen(false));
});

function updateHeaderState() {
    if (!header) {
        return;
    }

    header.classList.toggle("scrolled", window.scrollY > 12);
}

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    },
    {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px"
    }
);

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".card, .section-header, .profile-link, .page-hero .container").forEach((element) => {
        element.classList.add("fade-in");
        observer.observe(element);
    });

    updateHeaderState();
});

window.addEventListener("scroll", updateHeaderState);
