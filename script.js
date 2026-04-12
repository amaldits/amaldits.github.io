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

// ========== COMPANY PROJECTS DATA ========== //
const companyProjects = {
  miota: {
    title: "Projects at PT. Miota International Teknologi",
    projects: [
      {
        icon: "bx bxs-chip",
        title: "IoT Asset Management System",
        description: "Developed end-to-end IoT solution for container asset with real-time tracking position dashboard",
        tech: ["ESP32", "C++", "Python", ".NET", "PostgreSQL"],
        detailId: "container"
      },
      {
        icon: "bx bxs-server",
        title: "Remote Terminal Unit (RTU)",
        description: "Developed an in-house Remote Terminal Unit (RTU) to support IoT company operations, enhancing system reliability, and operational efficiency",
        tech: ["Linux", "OpenWrt", "C", "Go"],
        detailId: "rtu" 
      },
      {
        icon: "bx bxs-server",
        title: "Automatic Water Level Recording (AWLR)",
        description: "Implemented water level recording building system for monitoring purposes at remote area",
        tech: ["Linux", "OpenWrt", "Go", "MQTT", "Modbus"],
        detailId: "awlr"
      },
      {
        icon: "bx bxs-devices",
        title: "Smartfarming",
        description: "Deployed a smart farming system for monitoring and control, incorporating automation capabilities to improve operational efficiency",
        tech: ["Linux", "OpenWrt", "Go", "MQTT", "Modbus"],
        detailId: "smartfarm"
      }
    ]
  },
  
  aria: {
    title: "Projects at PT. Aria Agri Indonesia",
    projects: [
      {
        icon: "bx bxs-chip",
        title: "Worker Tracker",
        date: "Mar 2022 - Sep 2023",
        description: "Wearable IoT device for tracking field workers' footprints in oil palm fields. Data visualized through web-based application for stakeholder decision-making.",
        tech: ["C++", "Arduino", "IoT", "GPS", "Wi-Fi"],
        detailId: "worker" // ← Links to projectDetails['worker']
      },
      {
        icon: "bx bxs-devices",
        title: "Turbo Spreader",
        date: "Mar 2022 - Sep 2023",
        description: "Tractor tracking system for monitoring fertilizer distribution in oil palm fields. Tracks fertilizer usage, detects excess application, and monitors tractor travel distance.",
        tech: ["C++", "Arduino", "IoT", "Data Analytics"],
        detailId: "turbo" // ← Links to projectDetails['turbo']
      }
    ]
  }
};


// Universal function to open company project modal
function openProjectModal(companyId) {
  const modal = document.getElementById('projectModal');
  const content = modal.querySelector('.modal-content');
  const company = companyProjects[companyId];
  
  if (!company) return;
  
  // Build project list HTML with clickable items
  let projectsHTML = company.projects.map(project => {
    // Check if project has a detailId for linking to featured project details
    const clickable = project.detailId ? `onclick="openProjectDetail('${project.detailId}')" style="cursor: pointer;"` : '';
    
    return `
    <div class="project-item" ${clickable}>
      <div class="project-icon">
        <i class="${project.icon}"></i>
      </div>
      <div class="project-info">
        <h4>${project.title}</h4>
        ${project.date ? `<p class="project-date">${project.date}</p>` : ''}
        <p class="project-desc">${project.description}</p>
        <div class="project-tech">
          ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>
      </div>
    </div>
  `}).join('');
  
  content.innerHTML = `
    <div class="modal-header">
      <h2>${company.title}</h2>
      <button class="modal-close" onclick="closeProjectModal()">
        <i class="bx bx-x"></i>
      </button>
    </div>
    <div class="modal-body">
      <div class="project-list">
        ${projectsHTML}
      </div>
    </div>
  `;
  
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Close project modal
function closeProjectModal() {
  const modal = document.getElementById('projectModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

// ========== FEATURED PROJECTS DATA ========== //
const projectDetails = {
  container: {
    title: "IoT Asset Management System",
    image: "container_asset.jpg", // Replace with your actual image
    description: [
      "This IoT asset management system was developed to track and monitor shipping containers in real-time. The solution provides end-to-end visibility of container locations, enabling logistics companies to optimize their operations and improve asset utilization.",
      "The system uses ESP32-based tracking devices installed on containers, communicating with a cloud backend. A comprehensive dashboard built with .NET provides stakeholders with real-time position tracking, historical movement data, and analytics. The PostgreSQL database ensures reliable data storage and fast query performance for large-scale deployments."
    ],
    images: ["container_asset.jpg"], // Add your images
    tech: ["ESP32", "C++", "Python", ".NET", "PostgreSQL", "MQTT", "GPS"]
  },
  
  rtu: {
    title: "Remote Terminal Unit (RTU)",
    image: "rtu_device.jpg", // Replace with your actual image
    description: [
      "This Remote Terminal Unit (RTU) was developed in-house to support Miota's IoT infrastructure. The RTU serves as a robust edge device for industrial IoT applications, collecting data from sensors and controlling actuators in remote locations.",
      "Built on OpenWrt Linux, the RTU provides reliable connectivity even in challenging network conditions. The device supports multiple communication protocols including Modbus, MQTT, and HTTP, making it versatile for various industrial applications. Written in Go and C for optimal performance and resource efficiency, the RTU handles real-time data acquisition, local processing, and secure transmission to cloud servers."
    ],
    images: ["rtu.jpeg"], // Add your images
    tech: ["Linux", "OpenWrt", "C", "Go", "Modbus", "MQTT", "Edge Computing"]
  },
  
  awlr: {
    title: "Automatic Water Level Recording (AWLR)",
    image: "awlr_system.jpg", // Replace with your actual image
    description: [
      "The AWLR system was implemented to monitor water levels in remote areas, providing critical data for flood early warning systems and water resource management. The system operates autonomously in locations with limited infrastructure and unreliable power supply.",
      "Using ultrasonic sensors and pressure transducers, the system continuously measures water levels with high accuracy. Data is transmitted via cellular networks using MQTT protocol to ensure reliable delivery even with intermittent connectivity. The OpenWrt-based device includes local data buffering, ensuring no data loss during network outages. The backend system processes incoming data and triggers alerts when water levels exceed predefined thresholds."
    ],
    images: ["awlr_system.jpg"], // Add your images
    tech: ["Linux", "OpenWrt", "Go", "MQTT", "Modbus", "Sensors", "IoT"]
  },
  
  smartfarm: {
    title: "Smartfarming System",
    image: "smartfarm.jpg", // Replace with your actual image
    description: [
      "This smart farming system was deployed to modernize agricultural operations through automation and data-driven decision making. The system monitors environmental conditions, controls irrigation and fertilization systems, and provides farmers with actionable insights through a mobile and web interface.",
      "The solution integrates multiple sensor types (soil moisture, temperature, humidity, light intensity) connected via Modbus protocol to a central RTU. The RTU processes sensor data locally and communicates with the cloud using MQTT for real-time monitoring. Automation capabilities include scheduled irrigation, threshold-based alerts, and remote control of farm equipment. The system has significantly improved water efficiency and crop yields while reducing manual labor requirements."
    ],
    images: ["smartfarm.jpg"], // Add your images
    tech: ["Linux", "OpenWrt", "Go", "MQTT", "Modbus", "Sensors", "Automation", "IoT"]
  },
  
  sawit: {
    title: "Oil Palm Fruit Sortation Machine",
    image: "mesin sawit 1.jpeg",
    description: [
      "This machine was developed to automatically sort oil palm fruits based on their ripeness level using a computer vision-based system. The traditional manual sorting process is time-consuming, inconsistent, and prone to human error.",
      "The system uses advanced image processing and machine learning algorithms to accurately classify palm fruits into different ripeness categories. This improves sorting accuracy, operational efficiency, and consistency in the grading process, ultimately enhancing the quality of palm oil production."
    ],
    images: ["mesin sawit 1.jpeg", "mesin sawit 2.jpeg"],
    tech: ["Python", "OpenCV", "Machine Learning", "Computer Vision", "Arduino", "Embedded Systems"]
  },
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
    images: ["wt.PNG", "worker_tracker_worker.PNG", "worker_tracker_data_platform.PNG"],
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
  let imagesHTML = `<div class="project-detail-images">` +
    project.images.map(img => 
      `<img src="${img}" alt="${project.title}" class="project-detail-image">`
    ).join('') +
    `</div>`;
  
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
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

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

// Close all modals on ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeProjectModal();
    closeProjectDetail();
  }
});