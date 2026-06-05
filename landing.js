const getStartedBtn = document.getElementById('getStartedBtn');
const demoBtn = document.getElementById('demoBtn');
const navSignIn = document.getElementById('navSignIn');

getStartedBtn.addEventListener('click', () => {
  window.location.href = 'dashboard.html';
});

navSignIn.addEventListener('click', () => {
  window.location.href = 'dashboard.html';
});

demoBtn.addEventListener('click', () => {
  const examplesSection = document.querySelector('.chat-examples');
  examplesSection.scrollIntoView({ behavior: 'smooth' });
});

// Enhance page with interactive background effects
document.addEventListener('mousemove', (e) => {
  const x = e.clientX;
  const y = e.clientY;
  
  const elements = document.querySelectorAll('.example-card, .feature');
  elements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    const elX = rect.left + rect.width / 2;
    const elY = rect.top + rect.height / 2;
    
    const distance = Math.sqrt(Math.pow(x - elX, 2) + Math.pow(y - elY, 2));
    
    if (distance < 200) {
      el.style.transform = `translateY(-12px) scale(1.05)`;
    }
  });
});

// Intersection Observer for scroll animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.feature, .example-card').forEach((el) => {
  observer.observe(el);
});
