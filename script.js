/* =====================================================
   PERSONAL PORTFOLIO
   Main JavaScript
   ===================================================== */


/* =========================
   ELEMENTS
   ========================= */

const body = document.body;

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

const themeToggle = document.getElementById("themeToggle");

const backToTop = document.getElementById("backToTop");

const revealElements = document.querySelectorAll(".reveal");

const contactForm = document.getElementById("contactForm");

const currentYear = document.getElementById("currentYear");


/* =========================
   CURRENT YEAR
   Automatically updates the
   copyright year.
   ========================= */

currentYear.textContent = new Date().getFullYear();


/* =========================
   MOBILE MENU
   ========================= */

menuToggle.addEventListener("click", () => {

    const isOpen = navMenu.classList.toggle("active");

    menuToggle.classList.toggle("active");

    body.classList.toggle("menu-open");

    menuToggle.setAttribute("aria-expanded", isOpen);
});


/* Close mobile menu when
   clicking a navigation link */

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("active");

        menuToggle.classList.remove("active");

        body.classList.remove("menu-open");

        menuToggle.setAttribute("aria-expanded", "false");

    });

});


/* =========================
   DARK / LIGHT MODE
   ========================= */

/*
   Check if the user already
   saved a theme preference.
*/

const savedTheme = localStorage.getItem("portfolio-theme");


if (savedTheme === "light") {

    body.classList.add("light-theme");

    themeToggle.textContent = "☾";

} else {

    body.classList.remove("light-theme");

    themeToggle.textContent = "☀";

}


/*
   Change theme when the button
   is clicked.
*/

themeToggle.addEventListener("click", () => {

    body.classList.toggle("light-theme");

    const isLight = body.classList.contains("light-theme");

    if (isLight) {

        themeToggle.textContent = "☾";

        localStorage.setItem("portfolio-theme", "light");

    } else {

        themeToggle.textContent = "☀";

        localStorage.setItem("portfolio-theme", "dark");

    }

});


/* =========================
   SCROLL REVEAL
   ========================= */

/*
   IntersectionObserver detects
   when an element enters the
   screen.
*/

const revealObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================
   ACTIVE NAVIGATION
   ========================= */

/*
   Detect which section is
   currently visible and add
   the "active" class to its
   navigation link.
*/

const sections = document.querySelectorAll("section[id]");


const sectionObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                const currentId = entry.target.getAttribute("id");

                navLinks.forEach(link => {

                    link.classList.remove("active");

                    if (link.getAttribute("href") === `#${currentId}`) {

                        link.classList.add("active");

                    }

                });

            }

        });

    },
    {
        rootMargin: "-35% 0px -55% 0px"
    }
);


sections.forEach(section => {

    sectionObserver.observe(section);

});


/* =========================
   BACK TO TOP
   ========================= */

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});


backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =========================
   CONTACT FORM VALIDATION
   ========================= */

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");

const formSuccess = document.getElementById("formSuccess");


/*
   Simple email validation.
*/

function isValidEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

}


/*
   Remove previous errors.
*/

function clearErrors() {

    nameInput.classList.remove("invalid");
    emailInput.classList.remove("invalid");
    messageInput.classList.remove("invalid");

    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";

    formSuccess.textContent = "";

}


/*
   Form submit handler.
*/

contactForm.addEventListener("submit", event => {

    event.preventDefault();

    clearErrors();

    let isValid = true;


    /* Validate name */

    if (nameInput.value.trim() === "") {

        nameInput.classList.add("invalid");

        nameError.textContent = "Please enter your name.";

        isValid = false;

    }


    /* Validate email */

    if (emailInput.value.trim() === "") {

        emailInput.classList.add("invalid");

        emailError.textContent = "Please enter your email.";

        isValid = false;

    } else if (!isValidEmail(emailInput.value.trim())) {

        emailInput.classList.add("invalid");

        emailError.textContent = "Please enter a valid email.";

        isValid = false;

    }


    /* Validate message */

    if (messageInput.value.trim() === "") {

        messageInput.classList.add("invalid");

        messageError.textContent = "Please enter a message.";

        isValid = false;

    } else if (messageInput.value.trim().length < 10) {

        messageInput.classList.add("invalid");

        messageError.textContent =
            "Message must contain at least 10 characters.";

        isValid = false;

    }


    /* If everything is valid */

    if (isValid) {

        formSuccess.textContent =
            "Message looks good! This demo form does not actually send emails yet.";

        contactForm.reset();

    }

});


/* =========================
   REMOVE ERROR WHEN USER
   STARTS TYPING AGAIN
   ========================= */

nameInput.addEventListener("input", () => {

    nameInput.classList.remove("invalid");

    nameError.textContent = "";

});


emailInput.addEventListener("input", () => {

    emailInput.classList.remove("invalid");

    emailError.textContent = "";

});


messageInput.addEventListener("input", () => {

    messageInput.classList.remove("invalid");

    messageError.textContent = "";

});


/* =========================
   SMOOTH SCROLL
   ========================= */

/*
   The browser already supports
   smooth scrolling through CSS,
   but this JavaScript makes the
   behavior explicit and lets us
   account for the fixed navbar.
*/

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", event => {

        const targetId = anchor.getAttribute("href");

        if (targetId === "#") {
            return;
        }

        const target = document.querySelector(targetId);

        if (!target) {
            return;
        }

        event.preventDefault();

        const headerHeight =
            document.querySelector(".header").offsetHeight;

        const targetPosition =
            target.getBoundingClientRect().top +
            window.scrollY -
            headerHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
        });

    });

});