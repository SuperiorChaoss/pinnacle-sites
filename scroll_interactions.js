
// Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});

document.querySelectorAll('.pillar, .quote-marker, .testimonial').forEach(el => observer.observe(el));

// Scroll background movement effect
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.style.backgroundPosition = `center ${scrollY * 0.03}px`;
  }
});
