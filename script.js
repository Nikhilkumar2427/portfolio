const intro = document.querySelector('#intro');
const shell = document.querySelector('#site-shell');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function revealSite() {
  intro.classList.add('done');
  intro.style.opacity = '0';
  intro.style.visibility = 'hidden';
  shell.classList.add('loaded');
}
setTimeout(revealSite, reduceMotion ? 150 : 4600);

document.querySelector('#year').textContent = new Date().getFullYear();
const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), { threshold: .16 });
document.querySelectorAll('.reveal').forEach((item) => observer.observe(item));

const navLinks = document.querySelectorAll('.nav-links a');
const sections = [...document.querySelectorAll('main section[id]')];
const navObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
}), { rootMargin: '-45% 0px -48% 0px' });
sections.forEach((section) => navObserver.observe(section));

const toggle = document.querySelector('.menu-toggle'); const navList = document.querySelector('.nav-links');
toggle.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') === 'true'; toggle.setAttribute('aria-expanded', String(!open)); toggle.setAttribute('aria-label', open ? 'Open menu' : 'Close menu'); navList.classList.toggle('open', !open); });
navLinks.forEach((link) => link.addEventListener('click', () => { toggle.setAttribute('aria-expanded', 'false'); navList.classList.remove('open'); }));

if (!window.matchMedia('(pointer: coarse)').matches && !reduceMotion) {
  const cursor = document.querySelector('.cursor');
  window.addEventListener('pointermove', (event) => { cursor.style.opacity = '1'; cursor.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`; });
  document.querySelectorAll('a, button, input, textarea').forEach((item) => { item.addEventListener('pointerenter', () => cursor.classList.add('active')); item.addEventListener('pointerleave', () => cursor.classList.remove('active')); });
}

document.querySelector('#contact-form').addEventListener('submit', (event) => {
  event.preventDefault(); const form = event.currentTarget; const note = document.querySelector('#form-note');
  if (!form.checkValidity()) { form.reportValidity(); note.textContent = 'Please complete all fields with a valid email address.'; note.className = 'form-note error'; return; }
  note.textContent = 'Thanks — this form is a front-end preview and is not connected to a sending service yet.'; note.className = 'form-note success';
});
