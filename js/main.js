import { createProjectCard, projects } from "./projects.js";

const menuToggle = document.getElementById("menuToggle");
const siteNav = document.getElementById("siteNav");
const yearNode = document.getElementById("currentYear");

let revealObserver = null;

function initYear() {
  if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
  }
}

function initNavigation() {
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const normalizedCurrentPath = currentPath === "" ? "index.html" : currentPath;

  document.querySelectorAll("[data-nav]").forEach((link) => {
    const targetPath = link.getAttribute("href");
    if (targetPath === normalizedCurrentPath) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  if (!menuToggle || !siteNav) return;

  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("click", (event) => {
    if (!siteNav.classList.contains("is-open")) return;
    if (siteNav.contains(event.target) || menuToggle.contains(event.target)) return;
    siteNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
}

function setupRevealObserver() {
  if (!("IntersectionObserver" in window)) {
    document.querySelectorAll(".reveal").forEach((element) => {
      element.classList.add("in-view");
    });
    return;
  }
  if (revealObserver) return;

  revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -40px 0px",
    }
  );
}

function bindRevealTargets() {
  if (!revealObserver) return;
  document.querySelectorAll(".reveal").forEach((element) => {
    if (element.dataset.revealBound === "true") return;
    element.dataset.revealBound = "true";
    revealObserver.observe(element);
  });
}

function renderProjects() {
  const featuredContainer = document.getElementById("featuredProjects");
  const allProjectsContainer = document.getElementById("allProjects");

  if (featuredContainer) {
    const featured = projects.filter((project) => project.featured).slice(0, 3);
    featured.forEach((project) => {
      featuredContainer.appendChild(createProjectCard(project));
    });
  }

  if (allProjectsContainer) {
    projects.forEach((project) => {
      allProjectsContainer.appendChild(createProjectCard(project));
    });
  }
}

initYear();
initNavigation();
setupRevealObserver();
renderProjects();
bindRevealTargets();
