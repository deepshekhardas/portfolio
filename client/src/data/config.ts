
export const PERSONAL_DETAILS = {
    name: "Deepshekhar Das",
    role: "Full Stack Developer",
    focus: "Backend-Focused",
    phone: "93355215045",
    email: "deepshekhar@example.com", // Placeholder
    location: "Lucknow, India",
    tagline: "Building robust, scalable backend systems and responsive frontends.",
};

export const ABOUT_TEXT = `I'm a disciplined and focused Full Stack Developer with a strong passion for backend engineering. I love building real-world applications that solve actual problems, focusing on authentication, payments, and complex business logic. 

My approach to development is centered around writing clean, maintainable code and designing efficient database schemas. I am constantly improving my skills and staying up-to-date with the latest industry trends.`;

export const SKILLS = {
    frontend: [
        { name: "HTML & CSS", level: "Comfortable" },
        { name: "JavaScript", level: "Comfortable" },
        { name: "React", level: "Comfortable" },
        { name: "TypeScript", level: "Intermediate" },
        { name: "Tailwind CSS", level: "Comfortable" },
    ],
    backend: [
        { name: "Node.js", level: "Intermediate" },
        { name: "Express", level: "Intermediate" },
        { name: "REST APIs", level: "Intermediate" },
        { name: "Authentication", level: "Intermediate" },
        { name: "Payments Integration", level: "Learning" },
    ],
    database: [
        { name: "MongoDB", level: "Comfortable" },
        { name: "PostgreSQL", level: "Learning" },
        { name: "Redis", level: "Basic" },
    ],
    tools: [
        { name: "Git & GitHub", level: "Comfortable" },
        { name: "Postman", level: "Comfortable" },
        { name: "Docker", level: "Basic" },
    ],
};

export const PROJECTS = [
    {
        title: "Fitness & Workout Tracker",
        description: "A full-stack application to track workouts, monitor progress, and set fitness goals.",
        techStack: ["React", "Node.js", "MongoDB", "Express"],
        features: ["User Auth", "Workout Logging", "Progress Charts"],
        links: {
            code: "#",
            demo: "#",
        },
    },
    {
        title: "Secure Auth Service",
        description: "A comprehensive authentication service with JWT, refresh tokens, and email verification.",
        techStack: ["Node.js", "Express", "Redis", "MongoDB"],
        features: ["JWT Auth", "2FA", "Role-based Access"],
        links: {
            code: "#",
            demo: "#",
        },
    },
    {
        title: "E-Commerce Backend",
        description: "A robust backend for an e-commerce platform handling products, cart, and payments.",
        techStack: ["Node.js", "Express", "Stripe API", "PostgreSQL"],
        features: ["Cart Management", "Stripe Checkout", "Order History"],
        links: {
            code: "#",
            demo: "#",
        },
    },
    {
        title: "Expense Tracker API",
        description: "REST API for tracking personal expenses with detailed reporting and categorization.",
        techStack: ["Node.js", "Express", "Mongoose"],
        features: ["CRUD Operations", "Monthly Reports", "Category Filtering"],
        links: {
            code: "#",
            demo: "#",
        },
    },
];

export const SOCIAL_LINKS = {
    github: "https://github.com/",
    linkedin: "https://linkedin.com/",
};
