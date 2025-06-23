const images = [
  'images/1.svg',
  'images/2.svg',
  'images/3.svg'
];
let centerIdx = 1; // start centered on the second image

const carousel = document.querySelector('.hero-preview');
const indicators = document.querySelector('.carousel-indicators');

// Build slides in DOM
function renderSlides() {
  carousel.innerHTML = '';
  images.forEach((src, idx) => {
    const img = document.createElement('img');
    img.src = src;
    img.classList.add('slide');
    img.dataset.index = idx;
    // click to recenter
    img.addEventListener('click', () => scrollToSlide(idx));
    carousel.appendChild(img);
  });
  updateActiveClasses();
  buildIndicators();
}

// Scroll container so that `idx` is centered
function scrollToSlide(idx) {
  const slide = carousel.querySelector(`.slide[data-index="${idx}"]`);
  if (!slide) return;
  slide.scrollIntoView({ behavior: 'smooth', inline: 'center' });
  centerIdx = idx;
  updateActiveClasses();
  updateIndicators();
}

// After scroll ends (or on init), find nearest slide and mark center
let isScrolling;
carousel.addEventListener('scroll', () => {
  window.clearTimeout(isScrolling);
  isScrolling = setTimeout(() => {
    alignToNearest();
  }, 100);
});

// Determine which slide is closest to container center
function alignToNearest() {
  const slides = Array.from(carousel.querySelectorAll('.slide'));
  const containerRect = carousel.getBoundingClientRect();
  const containerCenter = (containerRect.left + containerRect.right) / 2;

  let closest = slides[0], minDist = Infinity;
  slides.forEach(slide => {
    const rect = slide.getBoundingClientRect();
    const slideCenter = (rect.left + rect.right) / 2;
    const dist = Math.abs(containerCenter - slideCenter);
    if (dist < minDist) {
      minDist = dist;
      closest = slide;
    }
  });

  const newIdx = parseInt(closest.dataset.index, 10);
  if (newIdx !== centerIdx) {
    centerIdx = newIdx;
    updateActiveClasses();
    updateIndicators();
  }
}

// Apply/remove .center/.side classes
function updateActiveClasses() {
  carousel.querySelectorAll('.slide').forEach(slide => {
    slide.classList.toggle('center', parseInt(slide.dataset.index,10) === centerIdx);
    slide.classList.toggle('side',   parseInt(slide.dataset.index,10) !== centerIdx);
  });
}

// Build pagination dots (optional on mobile)
function buildIndicators() {
  if (!indicators) return;
  indicators.innerHTML = '';
  images.forEach((_, idx) => {
    const dot = document.createElement('span');
    dot.dataset.index = idx;
    dot.classList.toggle('active', idx === centerIdx);
    dot.addEventListener('click', () => scrollToSlide(idx));
    indicators.appendChild(dot);
  });
}

// SWIPE support (desktop & mobile)
let startX = 0;
carousel.addEventListener('pointerdown', e => {
  startX = e.clientX;
  carousel.setPointerCapture(e.pointerId);
});
carousel.addEventListener('pointerup', e => {
  const diff = e.clientX - startX;
  if (diff > 50)      scrollToSlide((centerIdx - 1 + images.length) % images.length);
  else if (diff < -50) scrollToSlide((centerIdx + 1) % images.length);
});

// INIT
renderSlides();
// center on load
window.addEventListener('load', () => scrollToSlide(centerIdx));
// Dynamic lost‐revenue calculator
function updateLoss() {
  const avg = parseFloat(document.getElementById('avgSale').value) || 0;
  const missed = parseInt(document.getElementById('missedLeads').value) || 0;
  const loss = avg * missed;
  document.getElementById('loss').textContent = 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
      .format(loss);
}

// listen for changes
document.getElementById('avgSale')
  .addEventListener('input', updateLoss);
document.getElementById('missedLeads')
  .addEventListener('input', updateLoss);

// init on page load
updateLoss();

document.addEventListener('DOMContentLoaded', () => {
  const steps = document.querySelectorAll('.process-section .step');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });

  steps.forEach(s => observer.observe(s));
});

document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });

  // observe all fade-up & slide-in elements
  document.querySelectorAll('.fade-up, .slide-in')
    .forEach(el => observer.observe(el));
});
