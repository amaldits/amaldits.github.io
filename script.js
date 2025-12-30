// Matikan animasi logo setelah selesai
setTimeout(() => {
  const logo = document.querySelector('.logo');
  if (logo) logo.classList.add('animation-done');
}, 1000);

// Smooth scrolling function
function scrollToSection(id) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

// Open new tab function
function openNewTab(urlToOpen) {
  window.open(urlToOpen, "_blank");
}

// Toggle mobile menu
const menuIcon = document.querySelector("#menu-icon");
const navbar = document.querySelector(".navbar");

if (menuIcon && navbar) {
  menuIcon.onclick = () => {
    menuIcon.classList.toggle("bx-x");
    navbar.classList.toggle("active");
  };
}

// SINGLE SCROLL EVENT LISTENER - Gabungan semua fungsi
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      const header = document.getElementById('header');
      const scrollTop = document.getElementById('scrollTop');
      
      // 1. Header scroll effect
      if (scrollY > 100) {
        if (header) header.classList.add('scrolled');
        if (scrollTop) scrollTop.classList.add('visible');
      } else {
        if (header) header.classList.remove('scrolled');
        if (scrollTop) scrollTop.classList.remove('visible');
      }
      
      // 2. Active navigation detection
      const sections = document.querySelectorAll('section[id]');
      const navLinks = document.querySelectorAll('.navbar a');
      
      let currentSection = 'home'; // Default
      
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 150;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollY >= sectionTop && scrollY < sectionBottom) {
          currentSection = section.getAttribute('id');
        }
      });
      
      // Update active class on nav links
      navLinks.forEach(link => {
        link.classList.remove('active');
        const linkText = link.textContent.trim().toLowerCase();
        if (linkText === currentSection) {
          link.classList.add('active');
        }
      });
      
      // 3. Show/hide animations on scroll
      sections.forEach((sec) => {
        const offset = sec.offsetTop - 100;
        const height = sec.offsetHeight;
        
        if (scrollY >= offset && scrollY < offset + height) {
          sec.classList.add("show-animate");
        } else {
          sec.classList.remove("show-animate");
        }
      });
      
      // 4. Remove mobile menu when scrolling
      if (menuIcon && navbar) {
        menuIcon.classList.remove("bx-x");
        navbar.classList.remove("active");
      }
      
      ticking = false;
    });
    ticking = true;
  }
});

// Modal functionality
const modal = document.getElementById("myModal");
const openModalButton = document.getElementById("content");
const closeModalButton = document.getElementById("closeModal");

if (modal && openModalButton && closeModalButton) {
  openModalButton.addEventListener("click", () => {
    modal.style.display = "block";
  });

  closeModalButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
}

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.journey-item, .project-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'all 0.6s ease';
  observer.observe(el);
});

// Set active on page load
window.addEventListener('load', () => {
  const homeLink = document.querySelector('.navbar a');
  if (homeLink) {
    homeLink.classList.add('active');
  }
});

// Open project modal
function openProjectModal() {
  const modal = document.getElementById('projectModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  }
}

// Close project modal
function closeProjectModal() {
  const modal = document.getElementById('projectModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Enable scrolling
  }
}

// Close modal on ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeProjectModal();
  }
});