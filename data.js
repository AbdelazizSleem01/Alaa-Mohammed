// ============================================================
// DATA.JS — Single source of truth for all portfolio content
// Edit via admin panel or directly here
// ============================================================

const PORTFOLIO_DATA = {
  personal: {
    name: "Alaa Mohammed",
    title: "Barista & Branch Manager",
    tagline: "Crafting extraordinary coffee experiences & building high-performance teams since 2020.",
    bio: "A passionate Barista and experienced Team Leader focused on delivering exceptional coffee experiences and building strong team environments. My dedication to quality service and team motivation drives me to create memorable moments for customers and colleagues alike — one perfect cup at a time.",
    phone: "+20 1273506201",
    email: "alaa.muhamed120@icloud.com",
    location: "Benha, Qalyubia, Egypt",
    facebook: "https://facebook.com/alaa.muhamed.1048",
    instagram: "https://www.instagram.com/__3laa2__",
    whatsapp: "https://wa.me/201273506201",
  },

  stats: [
    { num: 6, suffix: "", label: "Years Experience" },
    { num: 30, suffix: "%", label: "Sales Growth" },
    { num: 50, suffix: "%", label: "Referral Increase" },
    { num: 15, suffix: "%", label: "Cost Reduction" },
  ],

  experience: [
    {
      id: 1,
      period: "March 2020 – February 2024",
      title: "Barista",
      company: "TREFL",
      location: "Banha, Qalyubia",
      achievements: [
        "Crafted exceptional coffee beverages, boosting customer satisfaction by 30%",
        "Trained new baristas, enhancing team efficiency and service speed",
        "Managed inventory, reducing waste and saving costs by 15%",
        "Implemented quality control measures, ensuring consistency in every cup",
      ],
    },
    {
      id: 2,
      period: "March 2024 – February 2026",
      title: "Barista & Team Leader",
      company: "Bellissimo",
      location: "Benha, Qalyubia",
      achievements: [
        "Led a high-performing team to exceed sales targets by 30% annually",
        "Implemented innovative strategies that boosted client retention by 25%",
        "Developed training programs that improved team productivity by 20%",
        "Fostered strong client relationships, resulting in a 50% increase in referrals",
      ],
    },
  ],

  skills: [
    { name: "Espresso Preparation", icon: "fa-fire-burner", level: 95 },
    { name: "Latte Art", icon: "fa-paintbrush", level: 90 },
    { name: "Milk Frothing", icon: "fa-droplet", level: 92 },
    { name: "Espresso Extraction", icon: "fa-mug-hot", level: 93 },
    { name: "Customer Service", icon: "fa-heart", level: 95 },
    { name: "Team Management", icon: "fa-people-group", level: 88 },
    { name: "POS Systems", icon: "fa-cash-register", level: 85 },
    { name: "Food Safety", icon: "fa-shield-halved", level: 90 },
    { name: "Multitasking", icon: "fa-list-check", level: 92 },
    { name: "Order Accuracy", icon: "fa-circle-check", level: 94 },
    { name: "Cash Handling", icon: "fa-coins", level: 87 },
    { name: "Inventory Management", icon: "fa-boxes-stacked", level: 85 },
  ],

  certificates: [
    {
      id: 1,
      title: "Certificate of Excellence in Barista",
      subtitle: "Level One — Advanced Barista Techniques",
      date: "March 2026",
      icon: "fa-certificate",
    },
  ],

  education: [
    {
      degree: "Bachelor of Arts (B.A.)",
      faculty: "Faculty of Arts — Benha University",
      location: "Benha, Qalyubia",
      period: "September 2021 – Present",
    },
  ],

  languages: [
    { name: "Arabic", level: "Native", percent: 100 },
    { name: "English", level: "Basic", percent: 35 },
  ],
};

// Merge with localStorage overrides (from admin panel)
(function () {
  const saved = localStorage.getItem("portfolioData");
  if (saved) {
    try {
      const overrides = JSON.parse(saved);
      deepMerge(PORTFOLIO_DATA, overrides);
    } catch (e) {}
  }
})();

function deepMerge(target, source) {
  for (const key in source) {
    if (source[key] && typeof source[key] === "object" && !Array.isArray(source[key])) {
      if (!target[key]) target[key] = {};
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
}
