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

// Project detail data
const projectDetails = {
  uav: {
    title: "Unmanned Aerial Vehicle",
    image: "drone.jpg",
    description: [
      "When I was in college working on my final thesis, I worked on a project related to UAVs (Unmanned Aerial Vehicles). The mission of this vehicle is to carry out inspections on bridges with as little human influence as possible (semi-autonomous).",
      "The bridge sensors provide position and status data. When an issue is detected, signals are sent to the Ground Control Station (GCS). The drone receives these signals and, with operator validation, takes off to perform inspections. The drone flies with specific patterns depending on the bridge's condition and captures video or image data for surveyors. After completing the mission, the drone returns to the GCS."
    ],
    images: ["drone.jpg", "output.gif"],
    tech: ["Python", "C++", "ROS", "PX4", "OpenCV", "PyTorch", "Linux"]
  },
  tram: {
    title: "Autonomous Tram",
    image: "tram_assets/tram_inka_1.jpg",
    description: [
      "This project is a collaboration between ITB (Institut Teknologi Bandung), INKA (Industri Kereta Api), riset.ai, and LPDP (Lembaga Pengelola Dana Pendidikan) which aims to create a tram that can run autonomously.",
      "To assist autonomous operation, the tram has 9 cameras, a LIDAR, 2 RADAR, a GNSS, and an IMU. All sensors communicate with the tram's NVIDIA DRIVE AGX embedded computer which interfaces with the tram's PLC. In this project, I was responsible for integrating the tram's hardware system from power distribution to sensor data processing."
    ],
    images: ["tram_assets/tram_inka_1.jpg", "tram_assets/tram_hardware_2.jpeg"],
    tech: ["Python", "C++", "Linux", "NVIDIA DRIVE AGX"]
  },
  forklift: {
    title: "Autonomous Forklift",
    image: "forklift_assets/forklift2.jpeg",
    description: [
      "This project is a collaboration between ITB and CPIN (Charoen Pokphand Indonesia Tbk) which aims to create a forklift that can run autonomously and locate itself in indoor facilities. The forklift has a LIDAR and an IMU which communicate with a mini PC.",
      "My role was to integrate all sensors and serve the data for processing. The 2 sensors generate data that needs to be filtered using Kalman Filter. This data is needed for implementing HectorSLAM so the forklift can map the warehouse, locate itself, and automate cargo handling operations."
    ],
    images: ["forklift_assets/forklift.PNG", "forklift_assets/forklift_map.png"],
    tech: ["Python", "C++", "ROS", "SLAM", "Kalman Filter", "Linux"]
  },
  worker: {
    title: "Worker Tracker",
    image: "wt.PNG",
    description: [
      "Worker Tracker is a wearable device for tracking field workers' footprints in oil palm fields. The data can be visualized through a web-based application, allowing stakeholders to check completed regions and make informed decisions for the next day's work.",
      "The device is placed at workers' hips in a small compartment. It has no input interface, only an LED for status indication and a USB Type-C port for charging and data transfer via Wi-Fi. In this project, I worked on the firmware side, including design, feature development, and debugging."
    ],
    images: ["wt.PNG", "worker_tracker_data_platform.PNG", "worker_tracker_worker.PNG"],
    tech: ["C++", "Arduino", "IoT", "GPS", "Wi-Fi"]
  },
  turbo: {
    title: "Turbo Spreader",
    image: "tractor_assets/tractor2.jpeg",
    description: [
      "Turbo Spreader is a tractor tracking system for monitoring fertilizer distribution in oil palm fields. Similar to Worker Tracker, it tracks tractors instead of workers.",
      "Through the web-based application, users can check daily fertilizer usage, identify regions with excess fertilizer, and monitor tractor travel distance. In this project, I supported firmware creation, design, and debugging."
    ],
    images: ["tractor_assets/tractor2.jpeg", "tractor_assets/tractor_turbo_spreader.png"],
    tech: ["C++", "Arduino", "Data Analytics"]
  },
  humanoid: {
    title: "Humanoid Robot Soccer",
    image: "humanoid_1.PNG",
    description: [
      "This project was created to participate in KRSBI-H (Kontes Robot Sepak Bola - Humanoid) competition. The robot can walk, kick, and coordinate with other robots for passing.",
      "The humanoid robot has 20 servos communicating via RS485/TTL, connected to a CM730 sub-controller. It also has a camera and mini PC for object detection (ball, goalpost, lines). I worked on maintaining electrical components and creating interfaces to simplify strategy creation before games."
    ],
    images: ["humanoid.gif", "humanoid2.gif"],
    tech: ["C++", "ROS", "OpenCV", "Arduino", "Robotics", "Linux"]
  }
};

// Open project detail modal
function openProjectDetail(projectId) {
  const modal = document.getElementById('projectDetailModal');
  const content = document.getElementById('projectModalContent');
  const project = projectDetails[projectId];
  
  if (!project) return;
  
  // Build modal content
  let imagesHTML = project.images.map(img => 
    `<img src="${img}" alt="${project.title}" class="project-detail-image">`
  ).join('');
  
  let techHTML = project.tech.map(tech => 
    `<span class="tech-badge">${tech}</span>`
  ).join('');
  
  let descriptionHTML = project.description.map(para => 
    `<p>${para}</p>`
  ).join('');
  
  content.innerHTML = `
    <div class="modal-header">
      <h2>${project.title}</h2>
      <button class="modal-close" onclick="closeProjectDetail()">
        <i class="bx bx-x"></i>
      </button>
    </div>
    <div class="modal-body">
      ${imagesHTML}
      <div class="project-detail-section">
        <h3>Project Overview</h3>
        ${descriptionHTML}
      </div>
      <div class="project-detail-section">
        <h3>Technologies Used</h3>
        <div class="project-tech">
          ${techHTML}
        </div>
      </div>
    </div>
  `;
  
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Close project detail modal
function closeProjectDetail() {
  const modal = document.getElementById('projectDetailModal');
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

// Close on ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeProjectDetail();
  }
});

// Hide journey scroll hint on hover
const timelineWrapper = document.querySelector('.timeline-wrapper');
const scrollHint = document.querySelector('.scroll-hint');

if (timelineWrapper && scrollHint) {
  timelineWrapper.addEventListener('mouseenter', () => {
    scrollHint.style.opacity = '0';
    scrollHint.style.visibility = 'hidden';
  });
  
  timelineWrapper.addEventListener('mouseleave', () => {
    scrollHint.style.opacity = '0.7';
    scrollHint.style.visibility = 'visible';
  });
}