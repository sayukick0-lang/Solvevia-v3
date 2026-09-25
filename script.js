/* =========================================================
   SOLVEVIA
   BUSINESS SOLUTIONS & TECHNOLOGY CONSULTING

   Main JavaScript

   - Mobile navigation
   - Header behavior
   - Smooth navigation
   - Scroll reveal
   - Hero visual animation
   - WhatsApp enquiry form
   - Responsive viewport handling
   ========================================================= */

"use strict";


/* =========================================================
   DOM READY
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
       ===================================================== */

    const body = document.body;
    const html = document.documentElement;

    const header =
        document.getElementById("siteHeader");

    const mobileToggle =
        document.getElementById("mobileToggle");

    const mobileMenu =
        document.getElementById("mobileMenu");

    const mobileLinks =
        mobileMenu
            ? mobileMenu.querySelectorAll("a")
            : [];

    const contactForm =
        document.getElementById("contactForm");

    const formStatus =
        document.getElementById("formStatus");

    const currentYear =
        document.getElementById("currentYear");


    /* =====================================================
       CONSTANTS
       ===================================================== */

    const desktopBreakpoint = 850;

    /*
     * SOLVEVIA WhatsApp number.
     *
     * WhatsApp wa.me links require the country code
     * without +, spaces or other characters.
     */
    const whatsappNumber = "918891969283";


    /* =====================================================
       CURRENT YEAR
       ===================================================== */

    if (currentYear) {
        currentYear.textContent =
            new Date().getFullYear();
    }


    /* =====================================================
       VIEWPORT HEIGHT
       ===================================================== */

    function updateViewportHeight() {

        const height =
            window.innerHeight;

        html.style.setProperty(
            "--viewport-height",
            `${height}px`
        );
    }

    updateViewportHeight();

    let viewportTimer;

    window.addEventListener(
        "resize",
        () => {

            clearTimeout(viewportTimer);

            viewportTimer = setTimeout(
                updateViewportHeight,
                100
            );
        }
    );


    /* =====================================================
       HEADER SCROLL STATE
       ===================================================== */

    function updateHeader() {

        if (!header) {
            return;
        }

        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    /* =====================================================
       MOBILE MENU
       ===================================================== */

    function openMobileMenu() {

        if (!mobileMenu || !mobileToggle) {
            return;
        }

        mobileMenu.classList.add("active");

        mobileToggle.classList.add("active");

        mobileToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        mobileToggle.setAttribute(
            "aria-label",
            "Close navigation"
        );

        body.classList.add(
            "mobile-menu-open"
        );
    }


    function closeMobileMenu() {

        if (!mobileMenu || !mobileToggle) {
            return;
        }

        mobileMenu.classList.remove("active");

        mobileToggle.classList.remove("active");

        mobileToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        mobileToggle.setAttribute(
            "aria-label",
            "Open navigation"
        );

        body.classList.remove(
            "mobile-menu-open"
        );
    }


    function toggleMobileMenu() {

        if (!mobileMenu) {
            return;
        }

        if (
            mobileMenu.classList.contains(
                "active"
            )
        ) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }


    if (mobileToggle) {

        mobileToggle.addEventListener(
            "click",
            (event) => {

                event.preventDefault();
                event.stopPropagation();

                toggleMobileMenu();
            }
        );
    }


    /* =====================================================
       MOBILE NAVIGATION LINKS
       ===================================================== */

    mobileLinks.forEach((link) => {

        link.addEventListener(
            "click",
            () => {
                closeMobileMenu();
            }
        );
    });


    /* =====================================================
       ESCAPE KEY
       ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Escape") {
                closeMobileMenu();
            }
        }
    );


    /* =====================================================
       CLICK OUTSIDE MOBILE MENU
       ===================================================== */

    document.addEventListener(
        "click",
        (event) => {

            if (
                !mobileMenu ||
                !mobileMenu.classList.contains(
                    "active"
                )
            ) {
                return;
            }

            const clickedInsideMenu =
                mobileMenu.contains(
                    event.target
                );

            const clickedToggle =
                mobileToggle &&
                mobileToggle.contains(
                    event.target
                );

            if (
                !clickedInsideMenu &&
                !clickedToggle
            ) {
                closeMobileMenu();
            }
        }
    );


    /* =====================================================
       CLOSE MENU WHEN MOVING TO DESKTOP
       ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth >
                desktopBreakpoint
            ) {
                closeMobileMenu();
            }
        }
    );


    /* =====================================================
       ORIENTATION CHANGE
       ===================================================== */

    window.addEventListener(
        "orientationchange",
        () => {

            setTimeout(
                () => {

                    updateViewportHeight();

                    if (
                        window.innerWidth >
                        desktopBreakpoint
                    ) {
                        closeMobileMenu();
                    }

                },
                150
            );
        }
    );


    /* =====================================================
       SMOOTH INTERNAL NAVIGATION
       ===================================================== */

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );

    internalLinks.forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetId =
                    link.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }

                let target;

                try {
                    target =
                        document.querySelector(
                            targetId
                        );
                } catch (error) {
                    return;
                }

                if (!target) {
                    return;
                }

                event.preventDefault();

                const headerHeight =
                    header
                        ? header.offsetHeight
                        : 0;

                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    headerHeight;

                window.scrollTo({
                    top: Math.max(
                        0,
                        targetPosition
                    ),
                    behavior: "smooth"
                });

                /*
                 * Update the URL without creating
                 * another navigation jump.
                 */
                if (
                    window.history &&
                    history.pushState
                ) {
                    history.pushState(
                        null,
                        "",
                        targetId
                    );
                }
            }
        );
    });


    /* =====================================================
       SCROLL REVEAL
       ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

    if (
        prefersReducedMotion ||
        !("IntersectionObserver" in window)
    ) {

        revealElements.forEach(
            (element) => {
                element.classList.add(
                    "visible"
                );
            }
        );

    } else {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible"
                                );

                                observer.unobserve(
                                    entry.target
                                );
                            }
                        }
                    );
                },
                {
                    threshold: 0.12,
                    rootMargin:
                        "0px 0px -40px 0px"
                }
            );

        revealElements.forEach(
            (element) => {

                revealObserver.observe(
                    element
                );
            }
        );
    }


    /* =====================================================
       HERO VISUAL POINTER EFFECT
       ===================================================== */

    const heroVisual =
        document.querySelector(
            ".hero-visual"
        );

    const intelligenceCore =
        document.querySelector(
            ".intelligence-core"
        );

    const heroGrid =
        document.querySelector(
            ".hero-grid-plane"
        );

    const touchDevice =
        window.matchMedia(
            "(hover: none) and (pointer: coarse)"
        ).matches;


    if (
        heroVisual &&
        intelligenceCore &&
        heroGrid &&
        !prefersReducedMotion &&
        !touchDevice
    ) {

        let pointerFrame = null;

        heroVisual.addEventListener(
            "pointermove",
            (event) => {

                const rect =
                    heroVisual.getBoundingClientRect();

                if (
                    !rect.width ||
                    !rect.height
                ) {
                    return;
                }

                const x =
                    (
                        event.clientX -
                        rect.left
                    ) /
                    rect.width -
                    0.5;

                const y =
                    (
                        event.clientY -
                        rect.top
                    ) /
                    rect.height -
                    0.5;

                if (pointerFrame) {
                    cancelAnimationFrame(
                        pointerFrame
                    );
                }

                pointerFrame =
                    requestAnimationFrame(
                        () => {

                            intelligenceCore.style.setProperty(
                                "--pointer-x",
                                `${x * 12}px`
                            );

                            intelligenceCore.style.setProperty(
                                "--pointer-y",
                                `${y * 12}px`
                            );

                            heroGrid.style.setProperty(
                                "--mouse-x",
                                `${x * 8}px`
                            );

                            heroGrid.style.setProperty(
                                "--mouse-y",
                                `${y * 8}px`
                            );
                        }
                    );
            }
        );


        heroVisual.addEventListener(
            "pointerleave",
            () => {

                intelligenceCore.style.setProperty(
                    "--pointer-x",
                    "0px"
                );

                intelligenceCore.style.setProperty(
                    "--pointer-y",
                    "0px"
                );

                heroGrid.style.setProperty(
                    "--mouse-x",
                    "0px"
                );

                heroGrid.style.setProperty(
                    "--mouse-y",
                    "0px"
                );
            }
        );
    }


    /* =====================================================
       FORM
       ===================================================== */

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();

                /*
                 * Remove any previous error state.
                 */
                clearFormMessage();


                /* -----------------------------------------
                   GET FORM VALUES
                   ----------------------------------------- */

                const name =
                    document
                        .getElementById("name")
                        ?.value
                        .trim() || "";

                const email =
                    document
                        .getElementById("email")
                        ?.value
                        .trim() || "";

                const phone =
                    document
                        .getElementById("phone")
                        ?.value
                        .trim() || "";

                const company =
                    document
                        .getElementById("company")
                        ?.value
                        .trim() || "";

                const message =
                    document
                        .getElementById("message")
                        ?.value
                        .trim() || "";


                /* -----------------------------------------
                   VALIDATION
                   ----------------------------------------- */

                if (!name) {

                    showFormMessage(
                        "Please enter your name.",
                        true
                    );

                    focusField("name");

                    return;
                }


                if (!email) {

                    showFormMessage(
                        "Please enter your email.",
                        true
                    );

                    focusField("email");

                    return;
                }


                if (!isValidEmail(email)) {

                    showFormMessage(
                        "Please enter a valid email address.",
                        true
                    );

                    focusField("email");

                    return;
                }


                if (!message) {

                    showFormMessage(
                        "Please tell us briefly about your requirement.",
                        true
                    );

                    focusField("message");

                    return;
                }


                /* -----------------------------------------
                   COLLECT SELECTED SERVICES
                   ----------------------------------------- */

                const selectedServices =
                    Array.from(
                        contactForm.querySelectorAll(
                            'input[name="service"]:checked'
                        )
                    ).map(
                        (input) => input.value
                    );


                const servicesText =
                    selectedServices.length
                        ? selectedServices.join(", ")
                        : "Not specified";


                /* -----------------------------------------
                   BUILD WHATSAPP MESSAGE
                   ----------------------------------------- */

                const whatsappMessage =
                    buildWhatsAppMessage({
                        name,
                        email,
                        phone,
                        company,
                        services: servicesText,
                        requirement: message
                    });


                /* -----------------------------------------
                   CREATE WHATSAPP URL
                   ----------------------------------------- */

                const whatsappUrl =
                    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                        whatsappMessage
                    )}`;


                /* -----------------------------------------
                   UI FEEDBACK
                   ----------------------------------------- */

                const submitButton =
                    contactForm.querySelector(
                        ".form-submit"
                    );

                if (submitButton) {

                    submitButton.classList.add(
                        "is-loading"
                    );

                    submitButton.setAttribute(
                        "aria-busy",
                        "true"
                    );
                }

                showFormMessage(
                    "Opening WhatsApp with your enquiry..."
                );


                /*
                 * Small delay gives the visitor visual
                 * feedback before navigating to WhatsApp.
                 */
                window.setTimeout(
                    () => {

                        /*
                         * Direct navigation is intentional.
                         * It is less likely to be blocked than
                         * a popup opened from asynchronous code.
                         */
                        window.location.href =
                            whatsappUrl;

                    },
                    250
                );
            }
        );
    }


    /* =====================================================
       BUILD WHATSAPP MESSAGE
       ===================================================== */

    function buildWhatsAppMessage(data) {

        return [
            "SOLVEVIA BUSINESS SOLUTIONS",
            "NEW WEBSITE ENQUIRY",
            "",
            "CONTACT DETAILS",
            `Name: ${data.name}`,
            `Email: ${data.email}`,
            `Phone: ${data.phone || "Not provided"}`,
            `Company: ${data.company || "Not provided"}`,
            "",
            "WHAT CAN WE HELP WITH?",
            data.services,
            "",
            "REQUIREMENT",
            data.requirement,
            "",
            "SOURCE",
            "SOLVEVIA Website"
        ].join("\n");
    }


    /* =====================================================
       EMAIL VALIDATION
       ===================================================== */

    function isValidEmail(email) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
            email
        );
    }


    /* =====================================================
       FORM MESSAGE
       ===================================================== */

    function showFormMessage(
        message,
        isError = false
    ) {

        if (!formStatus) {
            return;
        }

        formStatus.textContent =
            message;

        formStatus.classList.toggle(
            "error",
            isError
        );
    }


    function clearFormMessage() {

        if (!formStatus) {
            return;
        }

        formStatus.textContent = "";

        formStatus.classList.remove(
            "error"
        );
    }


    /* =====================================================
       FOCUS FORM FIELD
       ===================================================== */

    function focusField(id) {

        const field =
            document.getElementById(id);

        if (field) {

            window.setTimeout(
                () => field.focus(),
                0
            );
        }
    }


    /* =====================================================
       SERVICE OPTION ACCESSIBILITY
       ===================================================== */

    const serviceInputs =
        document.querySelectorAll(
            ".service-option input"
        );

    serviceInputs.forEach(
        (input) => {

            input.addEventListener(
                "change",
                () => {

                    /*
                     * CSS handles the visual selected
                     * state through :checked.
                     *
                     * This listener intentionally does not
                     * manipulate styling directly.
                     */
                }
            );
        }
    );


    /* =====================================================
       MOBILE SAFETY
       ===================================================== */

    html.style.overflowX = "hidden";
    body.style.overflowX = "hidden";


    /* =====================================================
       INITIAL REVEAL STATE
       ===================================================== */

    revealElements.forEach(
        (element) => {

            const rect =
                element.getBoundingClientRect();

            if (
                rect.top <
                window.innerHeight * 0.9
            ) {

                element.classList.add(
                    "visible"
                );
            }
        }
    );

});