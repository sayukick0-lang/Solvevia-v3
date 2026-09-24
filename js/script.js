document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       HEADER
       ===================================================== */

    const header = document.getElementById("header");

    function updateHeader() {

        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

    window.addEventListener("scroll", updateHeader);

    updateHeader();



    /* =====================================================
       MOBILE MENU
       ===================================================== */

    const mobileToggle =
        document.getElementById("mobileToggle");

    const mobileMenu =
        document.getElementById("mobileMenu");


    if (mobileToggle && mobileMenu) {

        mobileToggle.addEventListener("click", () => {

            mobileToggle.classList.toggle("active");

            mobileMenu.classList.toggle("active");

            document.body.style.overflow =
                mobileMenu.classList.contains("active")
                    ? "hidden"
                    : "";

        });


        mobileMenu
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener("click", () => {

                    mobileToggle.classList.remove("active");

                    mobileMenu.classList.remove("active");

                    document.body.style.overflow = "";

                });

            });

    }



    /* =====================================================
       GSAP
       ===================================================== */

    if (typeof gsap !== "undefined") {

        if (typeof ScrollTrigger !== "undefined") {

            gsap.registerPlugin(ScrollTrigger);

        }


        /* Hero entrance */

        const heroTimeline =
            gsap.timeline({
                defaults: {
                    ease: "power3.out"
                }
            });


        heroTimeline
            .to(".hero-eyebrow", {
                opacity: 1,
                y: 0,
                duration: .8
            })
            .to(".hero-title", {
                opacity: 1,
                y: 0,
                duration: 1
            }, "-=.5")
            .to(".hero-description", {
                opacity: 1,
                y: 0,
                duration: .8
            }, "-=.55")
            .to(".hero-actions", {
                opacity: 1,
                y: 0,
                duration: .7
            }, "-=.45")
            .to(".hero-trust", {
                opacity: 1,
                y: 0,
                duration: .7
            }, "-=.4");


        /* Section reveal */

        if (typeof ScrollTrigger !== "undefined") {

            gsap.utils.toArray(
                ".problem-card, .solution-card, .why-card, .process-step, .industries-grid div"
            ).forEach((element, index) => {

                gsap.fromTo(
                    element,

                    {
                        opacity: 0,
                        y: 35
                    },

                    {
                        opacity: 1,
                        y: 0,
                        duration: .7,
                        delay: (index % 3) * .05,
                        ease: "power3.out",

                        scrollTrigger: {

                            trigger: element,

                            start: "top 88%",

                            once: true

                        }

                    }
                );

            });


            gsap.utils.toArray(
                ".section-heading, .assessment-card, .trust-comparison, .about-layout, .contact-layout"
            ).forEach(element => {

                gsap.fromTo(
                    element,

                    {
                        opacity: 0,
                        y: 30
                    },

                    {
                        opacity: 1,
                        y: 0,
                        duration: .9,
                        ease: "power3.out",

                        scrollTrigger: {

                            trigger: element,

                            start: "top 85%",

                            once: true

                        }

                    }
                );

            });

        }

    }



    /* =====================================================
       MAGNETIC BUTTONS
       ===================================================== */

    const magneticElements =
        document.querySelectorAll(".magnetic");


    magneticElements.forEach(element => {

        element.addEventListener("mousemove", event => {

            const rect =
                element.getBoundingClientRect();

            const x =
                event.clientX -
                rect.left -
                rect.width / 2;

            const y =
                event.clientY -
                rect.top -
                rect.height / 2;


            element.style.transform =
                `translate(${x * .12}px, ${y * .12}px)`;

        });


        element.addEventListener("mouseleave", () => {

            element.style.transform =
                "translate(0,0)";

        });

    });



    /* =====================================================
       HERO PARALLAX
       ===================================================== */

    const heroVisual =
        document.getElementById("heroVisual");


    if (heroVisual && window.matchMedia("(pointer:fine)").matches) {

        heroVisual.addEventListener("mousemove", event => {

            const rect =
                heroVisual.getBoundingClientRect();

            const x =
                (event.clientX - rect.left) /
                rect.width -
                .5;

            const y =
                (event.clientY - rect.top) /
                rect.height -
                .5;


            const core =
                heroVisual.querySelector(
                    ".intelligence-core"
                );


            if (core) {

                core.style.transform =
                    `rotateY(${x * 7}deg) rotateX(${-y * 7}deg)`;

            }

        });


        heroVisual.addEventListener("mouseleave", () => {

            const core =
                heroVisual.querySelector(
                    ".intelligence-core"
                );


            if (core) {

                core.style.transform =
                    "";

            }

        });

    }



    /* =====================================================
       WHATSAPP ENQUIRY FORM
       ===================================================== */

    const contactForm =
        document.getElementById("contactForm");


    if (contactForm) {

        contactForm.addEventListener("submit", event => {

            event.preventDefault();


            const name =
                document
                    .getElementById("name")
                    .value
                    .trim();


            const company =
                document
                    .getElementById("company")
                    .value
                    .trim();


            const email =
                document
                    .getElementById("email")
                    .value
                    .trim();


            const phone =
                document
                    .getElementById("phone")
                    .value
                    .trim();


            const businessType =
                document
                    .getElementById("businessType")
                    .value
                    .trim();


            const challenges =
                document
                    .getElementById("challenges")
                    .value
                    .trim();


            const selectedServices =
                Array.from(
                    document.querySelectorAll(
                        'input[name="services"]:checked'
                    )
                )
                .map(input => input.value);


            const messageElement =
                document.getElementById("formMessage");


            /* Validate services */

            if (selectedServices.length === 0) {

                messageElement.textContent =
                    "Please select at least one service.";

                return;

            }


            /* Build WhatsApp message */

            const whatsappMessage =

`*SOLVEVIA BUSINESS ENQUIRY*

━━━━━━━━━━━━━━━━━━

*Name*
${name}

*Company*
${company}

*Work Email*
${email}

*Phone*
${phone}

*Business Type / Industry*
${businessType || "Not specified"}

*Services Required*
${selectedServices.join(", ")}

*Challenges*
${challenges}

━━━━━━━━━━━━━━━━━━

Enquiry received through the SOLVEVIA website.`;


            const encodedMessage =
                encodeURIComponent(
                    whatsappMessage
                );


            const whatsappNumber =
                "918891969283";


            const whatsappURL =
                `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;


            /* Show small confirmation */

            messageElement.textContent =
                "Opening WhatsApp...";


            /*
             * Because this action happens directly
             * from the user's form submission,
             * the browser should allow the WhatsApp
             * page to open.
             */

            window.open(
                whatsappURL,
                "_blank",
                "noopener,noreferrer"
            );


        });

    }



    /* =====================================================
       SERVICE CARD TILT
       ===================================================== */

    if (window.matchMedia("(pointer:fine)").matches) {

        const cards =
            document.querySelectorAll(
                ".solution-card, .problem-card, .why-card"
            );


        cards.forEach(card => {

            card.addEventListener("mousemove", event => {

                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const rotateY =
                    ((x / rect.width) - .5) * 5;


                const rotateX =
                    ((y / rect.height) - .5) * -5;


                card.style.transform =
                    `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

                card.style.transformStyle =
                    "preserve-3d";

            });


            card.addEventListener("mouseleave", () => {

                card.style.transform =
                    "";

            });

        });

    }



    /* =====================================================
       SMOOTH ANCHOR SCROLL
       ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener("click", event => {

                const targetID =
                    link.getAttribute("href");


                if (
                    !targetID ||
                    targetID === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(targetID);


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

                    top: targetPosition,

                    behavior: "smooth"

                });

            });

        });


});