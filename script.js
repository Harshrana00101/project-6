'use strict';

const $ = (selector, root = document) => root.querySelector(selector);

const grid = $('#post-grid');
const posts = [...grid.querySelectorAll('[data-category]')];
const filterGroup = $('#filters');
const filterButtons = [...filterGroup.querySelectorAll('button')];
const searchInput = $('#search');
const noResults = $('#no-results');

let activeCategory = 'all';

/* ---------- Filter and search posts ---------- */
function updatePosts() {
  const term = searchInput.value.trim().toLowerCase();
  let visible = 0;

  posts.forEach((post) => {
    const matchesCategory = activeCategory === 'all' || post.dataset.category === activeCategory;
    const matchesSearch = !term || post.textContent.toLowerCase().includes(term);
    const show = matchesCategory && matchesSearch;

    post.hidden = !show;
    if (show) visible += 1;
  });

  noResults.hidden = visible > 0;
}

filterGroup.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-filter]');
  if (!button) return;

  activeCategory = button.dataset.filter;
  filterButtons.forEach((btn) => {
    const isActive = btn === button;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-pressed', String(isActive));
  });
  updatePosts();
});

searchInput.addEventListener('input', updatePosts);

/* ---------- Newsletter form ---------- */
const form = $('#newsletter-form');
const email = $('#email');
const status = $('#news-status');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  status.textContent = '';

  if (!email.checkValidity()) {
    email.classList.add('is-invalid');
    email.setAttribute('aria-invalid', 'true');
    email.focus();
    return;
  }

  email.classList.remove('is-invalid');
  email.removeAttribute('aria-invalid');

  // Replace with a real request to your email service
  status.textContent = 'Thanks! Check your inbox to confirm your subscription.';
  form.reset();
});

email.addEventListener('input', () => {
  if (email.classList.contains('is-invalid') && email.checkValidity()) {
    email.classList.remove('is-invalid');
    email.removeAttribute('aria-invalid');
  }
});

/* ---------- Back to top button ---------- */
const toTop = $('#to-top');

window.addEventListener('scroll', () => {
  toTop.hidden = window.scrollY < 600;
}, { passive: true });

toTop.addEventListener('click', () => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
});

/* ---------- Footer year ---------- */
$('#year').textContent = new Date().getFullYear();