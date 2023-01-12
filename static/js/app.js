// FANCY INTRO
const slide = gsap.timeline({ defaults: { ease: "power1.out" } });
slide.to(".text", { y: "0%", duration: 0.75, stagger: 0 });
slide.to(".slider", { y: "-100%", duration: 1.5 }, "+=1.5");
slide.to(".fancyintro", { y: "-100%", duration: 1 }, "-=0.85");

window.onbeforeunload = function () {
  document.documentElement.scrollTo({ top: 0 });
};

//  TRAILER FUNCTION
const trailer = document.getElementById("trailer");

const animateTrailer = (e, interacting) => {
  const x = e.clientX - trailer.offsetWidth / 2,
    y = e.clientY - trailer.offsetHeight / 2;

  const keyframes = {
    transform: `translate(${x}px, ${y}px) scale(${interacting ? 3 : 0.8})`,
  };

  trailer.animate(keyframes, {
    duration: 600,
    fill: "forwards",
  });
};
const getTrailerClass = (type) => {
  switch (type) {
    case "video":
      return "ph-play-bold";
    default:
      return "ph-arrow-up-right-bold";
  }
};
window.onmousemove = (e) => {
  const interactable = e.target.closest(".interactable"),
    interacting = interactable !== null;

  const icon = document.getElementById("trailer-icon");
  animateTrailer(e, interacting);
  trailer.dataset.type = interacting ? interactable.dataset.type : "";

  if (interacting) {
    icon.className = getTrailerClass(interactable.dataset.type);
  }
};

const sectionClicker = () => {
  const sections = document.querySelectorAll("section");
  const headings = document.querySelectorAll(".hero__heading");
  const sectionNames = document.querySelectorAll(".section-name");
  /* FOR EACH SECTION */
  sections.forEach((section, i) => {
    /* ON CLICK */

    section.addEventListener("click", (e) => {
      if (e.currentTarget.classList.contains("focused")) {
        // headings.forEach((heading) => {
        //   heading.classList.add("slide-up");
        // });
        return;
      } else {
        sections.forEach((section) => {
          section.classList.remove("focused");
          headings.forEach((heading) => {
            heading.classList.remove("slide-up");
          });
        });

        e.currentTarget.classList.add("focused");
        window.scrollTo({ top: 0, behavior: "smooth" });
        if (e.currentTarget.id === "first") {
          sections.forEach((section) => {
            section.classList.remove("second-clicked");
            section.classList.remove("third-clicked");
            document.documentElement.style.cssText = "--sec-accent: #0076d5";
            sectionNames.forEach((span) => {
              span.classList.remove("remove-span");
            });
            sectionNames[0].classList.add("remove-span");
          });
        } else if (e.currentTarget.id === "second") {
          sections.forEach((section) => {
            section.classList.remove("third-clicked");
            section.classList.add("second-clicked");
            document.documentElement.style.cssText = "--sec-accent: #fc2100";
            sectionNames.forEach((span) => {
              span.classList.remove("remove-span");
            });
            sectionNames[1].classList.add("remove-span");
          });
          e.currentTarget.classList.add("second-clicked");
        } else if (e.currentTarget.id === "third") {
          sections.forEach((section) => {
            section.classList.remove("second-clicked");
            section.classList.add("third-clicked");
            document.documentElement.style.cssText = "--sec-accent: #ff970e";
            sectionNames.forEach((span) => {
              span.classList.remove("remove-span");
            });
            sectionNames[2].classList.add("remove-span");
          });
          e.currentTarget.classList.add("third-clicked");
        }
      }
    });
  });
};

// BURGER MENU
const burger = document.querySelector(".burger");
const miniSectionContainer = document.querySelector(".mini-sections");
const miniSections = document.querySelectorAll(".mini-sections .mini-section");
const sectionSpans = document.querySelectorAll("section .section-name");
const burgersections = document.querySelectorAll("section");
const headings = document.querySelectorAll(".hero__heading");

burger.addEventListener("click", (e) => {
  miniSectionContainer.classList.toggle("burger-clicked");
  burger.classList.toggle("toggle-burger");
  miniSections.forEach((miniSection) => {
    miniSection.classList.toggle("slide-in");
    miniSection.addEventListener("click", (e) => {
      burger.classList.remove("toggle-burger");
      miniSections.forEach((miniSection) => {
        miniSection.classList.remove("slide-in");
      });

      window.scrollTo({ top: 0, behavior: "smooth" });
      sectionSpans.forEach((span) => {
        span.style.display = "none";
      });

      burgersections.forEach((section) => {
        // section.style.display = "none";
        section.classList.remove("focused");
        if (e.currentTarget.id === "section-one") {
          burgersections[0].classList.add("focused");
          headings.forEach((heading) => {
            heading.classList.add("slide-up");
          });
          document.documentElement.style.cssText = "--sec-accent: #0076D5";
          console.log("sec1");
        } else if (e.currentTarget.id === "section-two") {
          burgersections[1].classList.add("focused");
          headings.forEach((heading) => {
            heading.classList.add("slide-up");
          });
          document.documentElement.style.cssText = "--sec-accent: #FC2100";
          console.log("sec2");
        } else if (e.currentTarget.id === "section-three") {
          burgersections[2].classList.add("focused");
          headings.forEach((heading) => {
            heading.classList.add("slide-up");
          });
          document.documentElement.style.cssText = "--sec-accent: #FF970E";
          console.log("sec3");
        }
      });
      miniSectionContainer.classList.remove("burger-clicked");
    });
  });
});

/* CALLING FUNCTION */
sectionClicker();
