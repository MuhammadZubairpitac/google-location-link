
"use strict";

/* =====================================================
   NAMEIT.PK — PREMIUM CORPORATE WEBSITE
   File: script.js
   ===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ================================================
       1. AUTOMATIC FOOTER YEAR
    ================================================ */

    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    /* ================================================
       2. COPY ACCOUNT DETAILS FUNCTIONALITY
    ================================================ */

    const copyButtons = document.querySelectorAll(".copy-btn");

    async function copyToClipboard(text) {

        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
            return;
        }

        // Fallback for older browsers and non-secure contexts
        const temporaryInput = document.createElement("textarea");

        temporaryInput.value = text;
        temporaryInput.style.position = "fixed";
        temporaryInput.style.opacity = "0";

        document.body.appendChild(temporaryInput);

        temporaryInput.select();

        const successful = document.execCommand("copy");

        temporaryInput.remove();

        if (!successful) {
            throw new Error("Copy operation failed.");
        }
    }


    copyButtons.forEach(function (button) {

        button.addEventListener("click", async function () {

            const textToCopy = button.dataset.copy;
            const originalText = button.textContent.trim();

            const card = button.closest(".card");
            const status = card?.querySelector(".copy-status");

            if (!textToCopy) return;

            try {

                await copyToClipboard(textToCopy);

                // Update button
                button.textContent = "COPIED ✓";
                button.disabled = true;

                // Show success message
                if (status) {
                    status.textContent = "✓ Copied successfully!";
                    status.style.color = "#18744f";
                }

                // Reset button after 2 seconds
                setTimeout(function () {

                    button.textContent = originalText;
                    button.disabled = false;

                    if (status) {
                        status.textContent = "";
                    }

                }, 2000);

            } catch (error) {

                console.error("Clipboard Error:", error);

                if (status) {
                    status.textContent = "Unable to copy. Please copy manually.";
                    status.style.color = "#c0392b";
                }

            }

        });

    });


    /* ================================================
       3. SMOOTH NAVIGATION
    ================================================ */

    const navigationLinks = document.querySelectorAll('nav a[href^="#"]');

    navigationLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = link.getAttribute("href");
            const targetSection = document.querySelector(targetId);

            if (targetSection) {

                event.preventDefault();

                targetSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                // Update browser URL
                history.replaceState(null, "", targetId);

            }

        });

    });


    /* ================================================
       4. ACTIVE NAVIGATION ON SCROLL
    ================================================ */

    const sections = document.querySelectorAll(
        "main section[id]"
    );

    if ("IntersectionObserver" in window) {

        const sectionObserver = new IntersectionObserver(

            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        const activeId = entry.target.id;

                        navigationLinks.forEach(function (link) {

                            const isActive =
                                link.getAttribute("href") === "#" + activeId;

                            if (isActive) {
                                link.setAttribute("aria-current", "location");
                            } else {
                                link.removeAttribute("aria-current");
                            }

                        });

                    }

                });

            },

            {
                root: null,
                threshold: 0.25,
                rootMargin: "-15% 0px -55% 0px"
            }

        );

        sections.forEach(function (section) {
            sectionObserver.observe(section);
        });

    }


    /* ================================================
       5. SCROLL REVEAL ANIMATIONS
    ================================================ */

    const revealElements = document.querySelectorAll(
        ".section-heading, .about-content, .card, .contact-strip .container"
    );

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!prefersReducedMotion && "IntersectionObserver" in window) {

        revealElements.forEach(function (element) {

            element.style.opacity = "0";
            element.style.transform = "translateY(25px)";
            element.style.transition =
                "opacity 700ms ease, transform 700ms ease";

        });

        const revealObserver = new IntersectionObserver(

            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.style.opacity = "1";
                        entry.target.style.transform = "translateY(0)";

                        observer.unobserve(entry.target);

                    }

                });

            },

            {
                threshold: 0.12
            }

        );

        revealElements.forEach(function (element) {
            revealObserver.observe(element);
        });

    }


    /* ================================================
       6. PREVENT MULTIPLE FORM SUBMISSIONS
       Future-ready form support
    ================================================ */

    const forms = document.querySelectorAll("form");

    forms.forEach(function (form) {

        form.addEventListener("submit", function () {

            const submitButton = form.querySelector(
                'button[type="submit"], input[type="submit"]'
            );

            if (submitButton) {
                submitButton.disabled = true;
            }

        });

    });


    /* ================================================
       7. EXTERNAL LINKS SECURITY
    ================================================ */

    const externalLinks = document.querySelectorAll(
        'a[target="_blank"]'
    );

    externalLinks.forEach(function (link) {

        link.setAttribute("rel", "noopener noreferrer");

    });


    /* ================================================
       8. WEBSITE INITIALIZATION
    ================================================ */

    console.log(
        "NAMEIT.PK Website Successfully Initialized."
    );

});
