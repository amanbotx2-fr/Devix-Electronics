document.addEventListener("DOMContentLoaded", function () {
  const toggleCheckbox = document.querySelector(".bb8-toggle__checkbox");
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const navbar = document.querySelector("#navbar");

  // Dark/Light mode toggle
  if (!toggleCheckbox) {
    console.error("BB-8 toggle checkbox not found.");
  } else {
    toggleCheckbox.addEventListener("change", () => {
      document.body.classList.toggle("dark");

      // Save preference
      const theme = document.body.classList.contains("dark") ? "dark" : "light";
      localStorage.setItem("theme", theme);
    });

    // Apply saved theme on load
    if (localStorage.getItem("theme") === "dark") {
      document.body.classList.add("dark");
      toggleCheckbox.checked = true;
    }
  }

  // Mobile menu toggle
  if (mobileMenuToggle && navbar) {
    mobileMenuToggle.addEventListener("click", () => {
      mobileMenuToggle.classList.toggle("active");
      navbar.classList.toggle("active");
    });

    // Close mobile menu when clicking on a link
    const navLinks = navbar.querySelectorAll("a");
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        mobileMenuToggle.classList.remove("active");
        navbar.classList.remove("active");
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!navbar.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        mobileMenuToggle.classList.remove("active");
        navbar.classList.remove("active");
      }
    });
  }

  // Smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });

  // Add loading animation for images
  const images = document.querySelectorAll("img");
  images.forEach(img => {
    img.addEventListener("load", () => {
      img.style.opacity = "1";
    });
    
    if (img.complete) {
      img.style.opacity = "1";
    } else {
      img.style.opacity = "0";
      img.style.transition = "opacity 0.3s ease";
    }
  });

  // Add intersection observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll(".pro, .feature-box");
  animateElements.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
});
