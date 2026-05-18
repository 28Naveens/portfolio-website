export const projects = [
  {
    id: "vehicle-service-management-system",
    title: "Vehicle Service Management System",
    description:
      "Role-based Django platform where customers raise service requests, mechanics update repair workflows, and admins manage approvals and billing.",
    techStack: ["Django", "Python", "SQLite", "HTML", "CSS"],
    image: "assets/projects/vehicle-service.svg",
    liveUrl: "",
    githubUrl: "https://github.com/28Naveens",
    featured: true,
  },
  {
    id: "your-plan-b",
    title: "Your Plan-B",
    description:
      "AI-powered financial assistant that uses retrieval-augmented generation to improve recommendation quality and contextual relevance.",
    techStack: ["Python", "RAG", "Prompt Engineering"],
    image: "assets/projects/your-plan-b.svg",
    liveUrl: "",
    githubUrl: "https://github.com/28Naveens",
    featured: true,
  },
  {
    id: "spotify-clone-frontend",
    title: "Spotify Clone (Frontend)",
    description:
      "Responsive frontend interface inspired by Spotify with playlist layout, album sections, and structured UI flow for cross-device usability.",
    techStack: ["HTML", "CSS", "Responsive UI"],
    image: "assets/projects/spotify-clone.svg",
    liveUrl: "",
    githubUrl: "https://github.com/28Naveens",
    featured: true,
  },
  {
    id: "sakala-siddhi-website",
    title: "Sakala Siddhi Vidya Niketan Website",
    description:
      "Freelance client website showcasing academics, school events, and student activities with clear navigation and responsive structure.",
    techStack: ["HTML", "CSS", "JavaScript", "Vercel"],
    image: "assets/projects/school-website.svg",
    liveUrl: "",
    githubUrl: "https://github.com/28Naveens",
    featured: false,
  },
  {
    id: "interactive-portfolio",
    title: "Interactive Portfolio Website",
    description:
      "Personal brand site designed with scroll reveal effects, project filtering, and animated counters to present professional work.",
    techStack: ["HTML", "CSS", "JavaScript", "UI Design"],
    image: "assets/projects/interactive-portfolio.svg",
    liveUrl: "index.html",
    githubUrl: "https://github.com/28Naveens",
    featured: false,
  },
];

function createAction(label, url, variant) {
  const action = document.createElement("a");
  action.className = `project-action ${variant}`;
  action.textContent = label;

  if (url) {
    action.href = url;
    if (url.startsWith("http")) {
      action.target = "_blank";
      action.rel = "noreferrer";
    }
  } else {
    action.href = "#";
    action.classList.add("is-disabled");
    action.setAttribute("aria-disabled", "true");
    action.setAttribute("tabindex", "-1");
  }

  return action;
}

export function createProjectCard(project) {
  const card = document.createElement("article");
  card.className = "project-card reveal";

  const imageWrap = document.createElement("div");
  imageWrap.className = "project-image-wrap";
  const image = document.createElement("img");
  image.src = project.image;
  image.alt = `${project.title} project preview`;
  image.loading = "lazy";
  imageWrap.appendChild(image);

  const content = document.createElement("div");
  content.className = "project-content";

  const title = document.createElement("h3");
  title.textContent = project.title;

  const description = document.createElement("p");
  description.textContent = project.description;

  const techList = document.createElement("ul");
  techList.className = "tech-list";
  project.techStack.forEach((tech) => {
    const item = document.createElement("li");
    item.textContent = tech;
    techList.appendChild(item);
  });

  const actions = document.createElement("div");
  actions.className = "project-actions";
  actions.appendChild(createAction("GitHub", project.githubUrl, "github"));

  content.append(title, description, techList, actions);
  card.append(imageWrap, content);
  return card;
}
