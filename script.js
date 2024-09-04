// var typed = new Typed(".multiple-text", {
//   strings: ["Frontend Developer", "YouTuber", "Blogger"],
//   typeSpeed: 100,
//   backSpeed: 100,
//   backDelay: 1000,
//   loop: true,
// });

// toggle icon navbar
let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

// scroll sections
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 100;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      // active navbar links
      navLinks.forEach((links) => {
        links.classList.remove("active");
        document.querySelector("header nav a[href*=" + id + "]").classList.add("active");
      });

      // active sections for animation on scroll
      sec.classList.add("show-animate");
    }

    // if want to use animation that repeats on scroll use this
    else {
      sec.classList.remove("show-animate");
    }
  });

  // sticky header
  let header = document.querySelector("header");

  header.classList.toggle("sticky", window.scrollY > 100);

  // remove toggle icon and navbar when click navbar links (scroll)
  menuIcon.classList.remove("bx-x");
  navbar.classList.remove("active");
};

function openNewTab(urlToOpen) {
  // Open a new tab/window
  window.open(urlToOpen, "_blank");
}

const modal = document.getElementById("myModal");
const openModalButton = document.getElementById("content");
// const openModalButton = document.getElementsByClassName("open-modal-button");
const closeModalButton = document.getElementById("closeModal");

// Open the modal when the button is clicked
openModalButton.addEventListener("click", () => {
  modal.style.display = "block";
});

// Close the modal when the close button is clicked
closeModalButton.addEventListener("click", () => {
  modal.style.display = "none";
});

// Close the modal when the background is clicked
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});
