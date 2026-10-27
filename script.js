// Nav: bordo allo scroll, menu mobile, link attivo
const nav = document.getElementById('nav');
const toggle = document.getElementById('navToggle');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  });
});

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
  });
}, { rootMargin: '-45% 0px -50% 0px' });
sections.forEach(s => sectionObserver.observe(s));

// Animazioni di comparsa
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

document.getElementById('year').textContent = new Date().getFullYear();

// Logo animato: intro, poi stato di riposo; click per riprodurre
const brand = document.getElementById('brand');
const playBrand = () => {
  brand.classList.remove('idle', 'play');
  void brand.offsetWidth;
  brand.classList.add('play');
};
brand.querySelector('.brand-name').addEventListener('animationend', () => {
  brand.classList.replace('play', 'idle');
});
brand.addEventListener('click', playBrand);
playBrand();

// Lingua: IT (testo nell'HTML) / EN (dizionario)
const en = {
  'nav.about': 'About',
  'nav.exp': 'Experience',
  'nav.projects': 'Projects',
  'nav.work': 'Work',
  'nav.skills': 'Skills',
  'nav.contact': 'Contact',
  'hero.sub': 'Software Engineer · Cybersecurity Specialist<br>Technical Officer, University of Salerno',
  'hero.cta': 'Explore projects',
  'hero.contact': 'Get in touch',
  'about.title': 'Reliable software.<br>Secure systems.',
  'about.lead': 'Software engineer specialising in cybersecurity, with experience in microservice backend development and in testing distributed and blockchain systems. I currently manage technical infrastructure and teach cybersecurity at the University of Salerno.',
  'about.today': 'Current role',
  'about.unisa': 'University of Salerno',
  'about.unisaShort': 'University of Salerno',
  'about.role': 'Technical Officer',
  'about.edu': 'Education',
  'about.degree': 'MSc cum laude in Software Engineering and IT Management.',
  'about.certs': 'Google Certifications',
  'about.focus': 'Specialisation',
  'about.focusText': 'Penetration testing, ethical hacking and vulnerability assessment. Lecturer in a university cybersecurity academy.',
  'about.passion': 'Interests',
  'about.passionText': 'Co-founder of NodeOf Cosmonauts, a validator in the Cosmos ecosystem.',
  'cert.progress': 'In progress',
  'cert.earned': 'Earned',
  'cert.earnedOn': 'Earned July 2026',
  'cert.view': 'View certificate ↗',
  'projects.title': 'Selected projects.',
  'projects.lead': 'A selection of personal and academic projects in cybersecurity, software engineering and blockchain.',
  'projects.others': 'More projects.',
  'projects.othersLead': 'Web applications, compilers, penetration testing and dApps.',
  'projects.more': 'All repositories on GitHub',
  'p.spinoff': 'Proof of Concept for the redesign of the University of Salerno spin-off page, with search by sector and incubation status.',
  'fz.eyebrow': 'Featured · Cybersecurity',
  'fz.text': 'Educational web app that collects, catalogues and compares firmware and repositories for Flipper Zero, with a feature matrix, installation guides and hands-on labs.',
  'fz.cta': 'Open the hub ↗',
  'fz.hint': 'Click to open ↗',
  'p.cargo': 'Web app supporting the Port of Valencia. Built for the Software Engineering and Software Project Management courses.',
  'p.newlangTag': 'Compilers · Java',
  'p.newlang': 'Compiler for the NewLang language: syntax and semantic analysis, scoping and translation to C.',
  'p.n7': 'Ethical penetration test of the vulnerable Web Machine (N7): from reconnaissance and port scanning to vulnerability mapping, exploitation and post-exploitation, with a final report.',
  'p.avatar': 'Decentralised application for buying Cosmos-themed NFT avatars, with Solidity smart contracts, Truffle, Ganache and MetaMask.',
  'p.caz': 'Data modelling and querying on a NoSQL database.',
  'work.title': 'Collaborations.',
  'w.tap': 'Landing page for selling NFC products for Google reviews.',
  'w.repo': 'View project',
  'w.site': 'Visit website',
  'w.thermex': 'Corporate website.',
  'w.noc': 'Co-founder. Validator in the Cosmos ecosystem, with a BitCanna archive and a Comdex faucet.',
  'w.cate': 'Showcase website for a wedding & event planner.',
  'skills.certTitle': 'Certifications.',
  'cert.done': 'Completed:',
  'cert.other': 'Other certifications:',
  'skills.ops': 'DevOps &amp; Systems',
  'skills.se': 'Software Engineering',
  'skills.compilers': 'Compilers',
  'skills.data': 'AI, Data &amp; Blockchain',
  'skills.nosql': 'NoSQL Databases',
  'contact.title': 'Let’s work <span class="gradient-text">together.</span>',
  'contact.lead': 'Available for projects, collaborations and consulting in software and cybersecurity.',
  'contact.hello': 'Hi!',
  'exp.title': 'Career.',
  'exp.now': 'Current',
  'exp.edu': 'Education',
  'edu.eyebrow': 'My studies',
  'eb.about': 'My story',
  'eb.exp': 'My career',
  'eb.projects': 'What I’ve built',
  'eb.work': 'Who I’ve worked with',
  'eb.skills': 'What I do',
  'eb.contact': 'Write to me',
  'edu.title': 'Education.',
  'edu.thesis': 'Thesis:',
  'edu.t1': 'testing methodologies for detecting vulnerabilities in blockchain systems, in collaboration with NTT DATA.',
  'edu.t2': 'a neural network recognising authorised routes in a port area, in collaboration with Ericsson.',
  'exp.d1': 'Sep 2025 — present',
  'exp.t1': 'Management of the IT and robotics infrastructure of the MIVIA AIIR lab and technical support for teaching and research: simulation environments, compute servers and penetration-testing labs.',
  'exp.tag.lab': 'Lab management',
  'exp.d2': 'Apr 2026 — Jul 2026',
  'exp.r2': 'Cybersecurity Subject Matter Expert',
  'exp.t2': 'Adjunct lecturer in the Cybersecurity Academy of the Computer Engineering degree programme. Designed and delivered a hands-on course on penetration testing, ethical hacking and vulnerability assessment.',
  'exp.tag.teach': 'Teaching',
  'exp.d3': 'Oct 2024 — Aug 2025',
  'exp.t3': 'Backend development of Java/Spring Boot microservices for insurance-sector clients. Multi-environment CI/CD, quality gates with SonarQube and NexusIQ, JUnit and Mockito tests with over 85% coverage.',
  'exp.tag.micro': 'Microservices',
  'exp.d4': 'Apr 2024 — Oct 2024',
  'exp.t4': 'Master’s thesis on testing methodologies for detecting vulnerabilities in blockchain systems. Development of automated test suites integrated into CI/CD pipelines.',
  'exp.d5': 'Jan 2022 — Dec 2024',
  'exp.t5': 'Operation of validator nodes in the Cosmos ecosystem: setup, hardening and monitoring on Linux, in the cloud and on-premise. Responsible for the project’s website and communication.',
  'exp.d6': 'Sep 2021 — Dec 2021',
  'exp.r6': 'Internship',
  'exp.t6': 'Bachelor’s thesis: a Python neural network recognising authorised routes in a port area from geospatial data, using DBSCAN and K-Means clustering.',
  'edu.lm': 'Master’s Degree cum laude',
  'edu.lt': 'Bachelor’s Degree',
  'edu.ltName': 'Computer Science',
  'edu.dip': 'High School Diploma',
  'edu.dipName': 'Computer Science',
  'footer.rights': 'All rights reserved.',
  'footer.top': 'Back to top ↑',
};

const i18nNodes = document.querySelectorAll('[data-i18n]');
i18nNodes.forEach(el => { el.dataset.it = el.innerHTML; });
const metaDesc = document.querySelector('meta[name="description"]');
const metaIt = metaDesc.content;
const fzDevice = document.querySelector('.fz-device');
const pixelImg = document.querySelector('.show-device img');
const pixelAltIt = pixelImg.alt;
const metaEn = 'Vincenzo Esposito — Software Engineer and Cybersecurity Specialist. Technical Officer at the University of Salerno.';

const setLang = lang => {
  document.documentElement.lang = lang;
  i18nNodes.forEach(el => {
    el.innerHTML = lang === 'en' ? (en[el.dataset.i18n] ?? el.dataset.it) : el.dataset.it;
  });
  metaDesc.content = lang === 'en' ? metaEn : metaIt;
  fzDevice.setAttribute('aria-label', lang === 'en' ? 'Open Flipper Zero Firmware Hub' : 'Apri Flipper Zero Firmware Hub');
  pixelImg.alt = lang === 'en' ? 'Pixel-art Vincenzo Esposito with a waving robot' : pixelAltIt;
  toggle.setAttribute('aria-label', lang === 'en' ? 'Open menu' : 'Apri menu');
  document.querySelectorAll('.lang-switch button').forEach(b => {
    b.setAttribute('aria-pressed', b.dataset.lang === lang);
  });
  try { localStorage.setItem('lang', lang); } catch (e) {}
};

document.querySelectorAll('.lang-switch button').forEach(b => {
  b.addEventListener('click', () => setLang(b.dataset.lang));
});

let initialLang = new URLSearchParams(location.search).get('lang');
if (!initialLang) {
  try { initialLang = localStorage.getItem('lang'); } catch (e) {}
}
if (!initialLang) initialLang = navigator.language.startsWith('it') ? 'it' : 'en';
setLang(initialLang === 'en' ? 'en' : 'it');

// Tema chiaro / scuro
const themeToggle = document.getElementById('themeToggle');
const themeColor = document.getElementById('themeColor');
const applyTheme = theme => {
  document.documentElement.dataset.theme = theme;
  themeColor.content = theme === 'dark' ? '#000000' : '#fbfbfd';
  const en = document.documentElement.lang === 'en';
  themeToggle.setAttribute('aria-label', theme === 'dark'
    ? (en ? 'Switch to light theme' : 'Passa al tema chiaro')
    : (en ? 'Switch to dark theme' : 'Passa al tema scuro'));
};
themeToggle.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  try { localStorage.setItem('theme', next); } catch (e) {}
});
applyTheme(document.documentElement.dataset.theme);
document.querySelectorAll('.lang-switch button').forEach(b => {
  b.addEventListener('click', () => applyTheme(document.documentElement.dataset.theme));
});

// Timeline: la linea si riempie con lo scroll e i nodi si accendono
const timeline = document.getElementById('timeline');
const tlFill = document.getElementById('tlFill');
const tlItems = timeline.querySelectorAll('.tl-item');
let tlTicking = false;
const updateTimeline = () => {
  tlTicking = false;
  const box = timeline.getBoundingClientRect();
  const focus = innerHeight * 0.6;
  const progress = Math.min(1, Math.max(0, (focus - box.top) / box.height));
  tlFill.style.height = (progress * 100) + '%';
  tlItems.forEach(item => {
    const node = item.querySelector('.tl-node').getBoundingClientRect();
    item.classList.toggle('is-active', node.top < focus);
  });
};
window.addEventListener('scroll', () => {
  if (!tlTicking) { tlTicking = true; requestAnimationFrame(updateTimeline); }
}, { passive: true });
window.addEventListener('resize', updateTimeline);
updateTimeline();

// Liquid glass: il riflesso segue il puntatore
const glassSelector = '.tile, .card, .client, .job, .edu-card, .cert, .skill-group, .btn-primary';
document.addEventListener('pointermove', e => {
  const el = e.target.closest(glassSelector);
  if (!el) return;
  const r = el.getBoundingClientRect();
  el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
  el.style.setProperty('--my', (e.clientY - r.top) + 'px');
}, { passive: true });

// Contatti: presentazione guidata dallo scroll
const showTrack = document.getElementById('showTrack');
const showStage = showTrack.querySelector('.show-stage');
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
const span = (p, a, b) => Math.min(1, Math.max(0, (p - a) / (b - a)));
const ease = t => 1 - Math.pow(1 - t, 3);
let showTicking = false;
const updateShow = () => {
  showTicking = false;
  if (reduceMotion.matches) {
    ['--p0', '--p1', '--p2', '--p3'].forEach(v => showStage.style.setProperty(v, 1));
    showStage.classList.add('is-live', 'is-split');
    return;
  }
  const box = showTrack.getBoundingClientRect();
  if (box.top > innerHeight * 1.5 || box.bottom < -innerHeight * 0.5) return;
  const raw = -box.top / (box.height - innerHeight);
  const p = Math.min(1, Math.max(0, raw));
  const p0 = ease(span(raw, -0.3, 0.08));
  const p1 = ease(span(p, 0, 0.4));
  const p2 = span(p, 0.38, 0.56);
  const p3 = ease(span(p, 0.56, 0.86));
  showStage.style.setProperty('--p0', p0.toFixed(4));
  showStage.style.setProperty('--p1', p1.toFixed(4));
  showStage.style.setProperty('--p2', p2.toFixed(4));
  showStage.style.setProperty('--p3', p3.toFixed(4));
  showStage.classList.toggle('is-live', p1 > 0.97);
  showStage.classList.toggle('is-split', p3 > 0.5);
};
window.addEventListener('scroll', () => {
  if (!showTicking) { showTicking = true; requestAnimationFrame(updateShow); }
}, { passive: true });
window.addEventListener('resize', updateShow);
updateShow();

// Progetti: Flipper Zero che entra in scena con lo scroll
const fzTrack = document.getElementById('fzTrack');
const fzStage = fzTrack.querySelector('.fz-stage');
const fzTyped = fzTrack.querySelector('.fz-typed');
const fzText = fzTyped.dataset.text;
let fzTicking = false;
const updateFlipper = () => {
  fzTicking = false;
  if (reduceMotion.matches) {
    ['--p0', '--p1', '--p2', '--p3'].forEach(v => fzStage.style.setProperty(v, 1));
    fzTyped.textContent = fzText;
    fzStage.classList.add('is-live', 'is-split');
    return;
  }
  const box = fzTrack.getBoundingClientRect();
  if (box.top > innerHeight * 1.5 || box.bottom < -innerHeight * 0.5) return;
  const raw = -box.top / (box.height - innerHeight);
  const p = Math.min(1, Math.max(0, raw));
  const p0 = span(raw, -0.25, 0.2);
  const p1 = ease(span(p, 0, 0.42));
  const p2 = span(p, 0.4, 0.58);
  const p3 = ease(span(p, 0.58, 0.86));
  fzStage.style.setProperty('--p0', p0.toFixed(4));
  fzStage.style.setProperty('--p1', p1.toFixed(4));
  fzStage.style.setProperty('--p2', p2.toFixed(4));
  fzStage.style.setProperty('--p3', p3.toFixed(4));
  fzTyped.textContent = fzText.slice(0, Math.round(p0 * fzText.length));
  fzStage.classList.toggle('is-live', p1 > 0.97);
  fzStage.classList.toggle('is-split', p3 > 0.5);
};
window.addEventListener('scroll', () => {
  if (!fzTicking) { fzTicking = true; requestAnimationFrame(updateFlipper); }
}, { passive: true });
window.addEventListener('resize', updateFlipper);
updateFlipper();
