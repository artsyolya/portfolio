const smoothScroll = (target, duration) => {
  const targetSection = document.querySelector(target);
  const targetPosition = targetSection.getBoundingClientRect().top;
  const startPosition = window.pageYOffset;
  //var distance = targetPosition - startPosition;
  let startTime = null;

  /*if(window.innerWidth < 760) {
        startPosition = startPosition - 200;
    }*/
  console.log(startPosition, targetPosition);

  const animation = (currentTime) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = ease(timeElapsed, startPosition, targetPosition, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  };

  const ease = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  requestAnimationFrame(animation);
};
const navSlide = () => {
  const burger = document.querySelector(".nav__mobile");
  const burgerLines = document.querySelectorAll(".nav__mobile div");
  const nav = document.querySelector(".nav__list");
  const navLinks = document.querySelectorAll(".nav__list li");

  burger.addEventListener("click", () => {
    if (
      nav.classList.contains("nav__list--open") &&
      burger.classList.contains("toggle")
    ) {
      nav.classList.remove("nav__list--open");
      burger.classList.remove("toggle");

      // only change mobile menu lines back to white if at top of page
      if (window.scrollY < 100) {
        burgerLines.forEach((line, index) => {
          line.classList.remove("bkgnd-color--black");
        });
      }

      //reset links animation
      navLinks.forEach((link, index) => {
        link.style.animation = "";
      });
    } else {
      //activate mobile nav
      nav.classList.add("nav__list--open");

      //animate links
      navLinks.forEach((link, index) => {
        link.style.animation = `navLinkFadeIn 0.5s ease forwards ${
          index / 7 + 0.5
        }s`;
      });

      //burger animation
      burger.classList.add("toggle");

      burgerLines.forEach((line, index) => {
        line.classList.add("bkgnd-color--black");
        console.log("burgerLines");
      });

      // close mobile nav menu upon scrolling
      // this will ensure the menu closes when one of the nav page links is clicked
      window.addEventListener("scroll", (event) => {
        if (
          nav.classList.contains("nav__list--open") &&
          burger.classList.contains("toggle")
        ) {
          nav.classList.remove("nav__list--open");
          burger.classList.remove("toggle");

          //reset links animation
          navLinks.forEach((link) => {
            link.style.animation = "";
          });
        }
      });
    }
  });

  // change mobile menu lines upon scrolling for visibility
  window.addEventListener("scroll", (event) => {
    if (window.scrollY >= 100) {
      burgerLines.forEach((line, index) => {
        line.classList.add("bkgnd-color--black");
      });
    } else {
      burgerLines.forEach((line, index) => {
        line.classList.remove("bkgnd-color--black");
      });
    }
  });
};
navSlide();

const work = document.querySelector(".nav-work");
const about = document.querySelector(".nav-about");
const contact = document.querySelector(".nav-contact");
const viewWork = document.querySelector(".hero__view-work");

work.addEventListener("click", function () {
  smoothScroll("#work", 2000);
});

about.addEventListener("click", function () {
  smoothScroll("#about", 2800);
});

contact.addEventListener("click", function () {
  smoothScroll("#contact", 2800);
});

viewWork.addEventListener("click", function () {
  smoothScroll("#work", 1800);
});
