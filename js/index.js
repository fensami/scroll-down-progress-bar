// document.addEventListener("DOMContentLoaded", function () {
//   const percentDivs = document.querySelectorAll(".percent");
//   const observer = new IntersectionObserver((entries) => {
//     entries.forEach((entry) => {
//       if (entry.isIntersecting) {
//         animateCircle(entry.target);
//         observer.unobserve(entry.target);
//       }
//     });
//   });
//   percentDivs.forEach((percentDiv) => {
//     observer.observe(percentDiv);
//   });

//   function animateCircle(percentDiv) {
//     const percent = parseInt(percentDiv.getAttribute("data-percent"), 10);
//     const duration = parseInt(percentDiv.getAttribute("data-duration")) || 1500;
//     const delay = parseInt(percentDiv.getAttribute("data-delay")) || 0;

//     const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
//     const bgCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
//     const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");

//     svg.setAttribute("viewBox", "0 0 215 215");
//     svg.setAttribute("width", "100%");

//     bgCircle.setAttribute("cx", "108");
//     bgCircle.setAttribute("cy", "108");
//     bgCircle.setAttribute("r", "100");

//     circle.setAttribute("cx", "108");
//     circle.setAttribute("cy", "108");
//     circle.setAttribute("r", "100");

//     svg.appendChild(bgCircle);
//     svg.appendChild(circle);
//     percentDiv.appendChild(svg);

//     anime({
//       targets: circle,
//       strokeDashoffset: [
//         anime.setDashoffset,
//         2 * Math.PI * 100 - (2 * Math.PI * 100 * percent) / 100,
//       ],
//       easing: "easeInOutSine",
//       duration: duration,
//       delay: delay,
//     });

//     const numberDiv = document.createElement("div");
//     numberDiv.classList.add("number");
//     percentDiv.appendChild(numberDiv);

//     anime({
//       targets: numberDiv,
//       innerHTML: [0, percent],
//       round: 1,
//       easing: "easeInOutQuad",
//       duration: duration,
//       delay: delay,
//     });
//   }
// });

$(document).ready(function () {
  const $progressElements = $(".my-progress-bar .progress-vale");

  function animateElement() {
    $progressElements.each(function () {
      anime({
        targets: this,
        width: [
          `${parseInt(this.dataset.progressMinWidth)}%`,
          `${parseInt(this.dataset.progressMaxWidth)}%`,
        ],
        easing: "linear",
        duration: parseInt(this.dataset.progressDuration) || 1000,
        delay: parseInt(this.dataset.progressDelay) || 500,
      });
    });
  }

  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function handleScroll() {
    $progressElements.each(function () {
      if (isElementInViewport(this)) {
        animateElement();
        $(window).off("scroll", handleScroll);
      }
    });
  }

  $(window).on("scroll", handleScroll);
});