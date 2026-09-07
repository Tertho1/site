export const CV_URL = `${import.meta.env.BASE_URL}Tertho_Ghosh_CV_web.pdf`
export const PHOTO_URL = `${import.meta.env.BASE_URL}photo.png`
export const FILTERS = ['All','Featured','AI/ML','LLM','Python','Backend']
export const NAV_SECTIONS = ['about', 'skills', 'projects', 'experience', 'contact']

export const moreBuilds = [
  { name: 'Chest Disease Detection', tech: 'Image Processing + ML', note: '402 py files — DIP ensemble', github: 'https://github.com/Tertho1' },
  { name: 'CodeAlpha Credit Scoring', tech: 'Python • Scikit-learn', note: 'Good/Standard/Poor classifier', github: 'https://github.com/Tertho1' },
  { name: 'ExpenseMate', tech: 'Laravel (Blade)', note: 'Personal finance manager', github: 'https://github.com/Tertho1' },
  { name: 'Scrapper & Scrapper API', tech: 'FastAPI + BS4', note: 'Scraping API (Vercel)', github: 'https://github.com/Tertho1' },
  { name: 'File & Folder Finder', tech: 'Python CLI', note: 'Wildcard + ext filtering', github: 'https://github.com/Tertho1' },
  { name: 'Text Searcher From Files', tech: 'PDF/DOCX/XLSX/PPTX', note: 'Multi-format content search', github: 'https://github.com/Tertho1' },
  { name: 'PawPalace', tech: 'PHP', note: 'Pet adoption site', github: 'https://github.com/Tertho1' },
  { name: 'Cryptography Lab', tech: 'HTML', note: 'Crypto experiments', github: 'https://github.com/Tertho1' },
]

export const skills = [
  { group: 'Programming & Problem Solving', items: ['C','C++','Java','Python','Competitive Programming','Data Structures','Algorithms'] },
  { group: 'AI / ML & LLMs', items: ['Pandas','NumPy','Scikit-learn','NLP','Torch','XGBoost','BART','SBERT','LoRA','LLaMA-Factory'] },
  { group: 'Web & Backend', items: ['JavaScript','React','Node.js','FastAPI','Docker','Microservices','Laravel','Supabase','PostgreSQL','MySQL','Git'] },
  { group: 'Systems & Security', items: ['Ubuntu','Kali','Linux CLI','TCP/IP','OSI','Subnetting','OSPF/BGP','Cryptography','OSINT','Recon'] },
  { group: 'Testing & QA', items: ['Manual Testing','Automation','Validation','Audit Logs','Control Testing','Evidence'] },
  { group: 'Leadership', items: ['Event Management','Budgeting','Communication','Team Coordination'] },
]

export const education = [
  { degree: 'B.Sc. CSE — Jagannath University', meta: '2026 • CGPA 3.88/4.00 • 8th semester completed', highlight: true },
  { degree: 'HSC — Notre Dame College, Dhaka', meta: '2020 • GPA 5.00', highlight: false },
  // SSC omitted for brevity (2018 • GPA 5.00 • Lalmohan Secondary School, Bhola) — available in CV
]

export const experiences = [
  { role: 'Research Trainee', org: 'ITRRC Cybersecurity Research Lab, Jagannath University', period: 'Jan 2025 — Jul 2025', bullets: ['Founding cohort — 6-month hands-on training', 'Ubuntu/Kali, privilege & access control, OS/network security', 'OSINT, reconnaissance, port sweeping, active/passive attacks'], current: false },
  { role: 'Head — Budget & Finance', org: 'TEDxJnU', period: '2025', bullets: ['Led 6-member finance team for a 500+ person event (50+ organizers)', 'Owned budget estimation, sponsorship & registration allocation', 'Live ops + final financial report'], current: false },
  { role: 'Treasurer', org: 'IEEE Student Branch, Jagannath University', period: 'Jan 2025 — Feb 2026', bullets: ['Treasury & financial coordination', 'Financial record keeping & event finance support'], current: false },
]

export const volunteering = [
  { title: 'Organizer — CSE Day Celebration 2024', desc: 'Project showcases, tech quizzes, guest speaker sessions.' },
  { title: 'Volunteer — Unlocking the Future: Blockchain Workshop', desc: 'Curated content, invited industry expert.' },
  { title: 'Volunteer — Mastering SQA (Manual & Automation)', desc: 'Organized workshop & online competition.' },
  { title: 'Volunteer — JnU AI & IT Fest', desc: 'Supported AI & IT festival operations.' },
  { title: 'Volunteer — Cultural Fest, Notre Dame College', desc: 'Stage scheduling & audience coordination.' },
  { title: 'Volunteer — Science Fair, Notre Dame College', desc: 'Exhibit scheduling, participant & judge coordination.' },
]
