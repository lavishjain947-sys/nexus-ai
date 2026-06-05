// ============================================
// 3D LOADING SCENE WITH THREE.JS
// ============================================

let scene, camera, renderer;

function initLoadingScene() {
  const canvas = document.getElementById('loadingCanvas');
  
  // Scene setup
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 3;
  
  renderer = new THREE.WebGLRenderer({ 
    canvas: canvas,
    antialias: true, 
    alpha: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x050505, 1);
  renderer.pixelRatio = window.devicePixelRatio;

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffd60a, 1, 100);
  pointLight.position.set(5, 5, 5);
  scene.add(pointLight);

  // Create Nexus Logo Geometry - Hexagon
  const geometry = createHexagonGeometry();
  const material = new THREE.MeshStandardMaterial({
    color: 0xffd60a,
    metalness: 0.4,
    roughness: 0.1,
    emissive: 0xffd60a,
    emissiveIntensity: 0.2
  });
  const hexagon = new THREE.Mesh(geometry, material);
  scene.add(hexagon);

  // Create orbiting particles
  createOrbitingParticles(scene);

  // Animation loop
  animateLoadingScene(hexagon);

  // Handle window resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

function createHexagonGeometry() {
  const geometry = new THREE.BufferGeometry();
  const vertices = [];
  const indices = [];

  // Create hexagon vertices
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2;
    vertices.push(
      Math.cos(angle) * 1.5,
      Math.sin(angle) * 1.5,
      0
    );
  }

  // Add center vertex
  vertices.push(0, 0, 0);

  // Create triangles from center
  for (let i = 0; i < 6; i++) {
    indices.push(6, i, (i + 1) % 6);
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vertices), 3));
  geometry.setIndex(new THREE.BufferAttribute(new Uint16Array(indices), 1));
  geometry.computeVertexNormals();

  return geometry;
}

function createOrbitingParticles(scene) {
  const particleGeometry = new THREE.BufferGeometry();
  const particleCount = 100;
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 10;
    positions[i + 1] = (Math.random() - 0.5) * 10;
    positions[i + 2] = (Math.random() - 0.5) * 10;
  }

  particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const particleMaterial = new THREE.PointsMaterial({
    color: 0xffd60a,
    size: 0.05,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.3
  });

  const particles = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(particles);
}

function animateLoadingScene(hexagon) {
  let frame = 0;
  const duration = 150; // 2.5 seconds at 60fps

  function animate() {
    frame++;

    // Rotate hexagon
    hexagon.rotation.x += 0.005;
    hexagon.rotation.y += 0.008;
    hexagon.rotation.z += 0.003;

    // Subtle camera movement
    camera.position.x = Math.sin(frame * 0.01) * 0.5;
    camera.position.y = Math.cos(frame * 0.008) * 0.3;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);

    if (frame < duration) {
      requestAnimationFrame(animate);
    }
  }

  animate();
}

// ============================================
// PAGE LOAD & TRANSITIONS
// ============================================

window.addEventListener('load', () => {
  // Initialize 3D scene
  initLoadingScene();

  // Hide loading screen after animation
  setTimeout(() => {
    const loadingScreen = document.getElementById('loadingScreen');
    loadingScreen.classList.add('hidden');
  }, 2500);

  // Initialize hero 3D
  initHero3D();
});

// ============================================
// HERO 3D VISUALIZATION
// ============================================

function initHero3D() {
  const heroCanvas = document.getElementById('heroCanvas');
  
  const heroScene = new THREE.Scene();
  const heroCamera = new THREE.PerspectiveCamera(75, heroCanvas.clientWidth / heroCanvas.clientHeight, 0.1, 1000);
  heroCamera.position.z = 3;

  const heroRenderer = new THREE.WebGLRenderer({ 
    antialias: true,
    alpha: true,
    canvas: document.createElement('canvas')
  });
  
  // Use canvas context to draw instead
  const ctx = heroCanvas.getContext('2d');
  
  function drawHero3D() {
    // Create animated gradient background
    const gradient = ctx.createLinearGradient(0, 0, heroCanvas.clientWidth, heroCanvas.clientHeight);
    gradient.addColorStop(0, 'rgba(255, 214, 10, 0.1)');
    gradient.addColorStop(1, 'rgba(255, 214, 10, 0.05)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, heroCanvas.clientWidth, heroCanvas.clientHeight);

    // Draw animated hexagon
    ctx.save();
    ctx.translate(heroCanvas.clientWidth / 2, heroCanvas.clientHeight / 2);
    ctx.strokeStyle = 'rgba(255, 214, 10, 0.3)';
    ctx.lineWidth = 2;

    const rotation = (Date.now() * 0.0001) % (Math.PI * 2);
    ctx.rotate(rotation);

    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const x = Math.cos(angle) * 100;
      const y = Math.sin(angle) * 100;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();

    ctx.restore();

    // Draw rotating particles
    ctx.fillStyle = 'rgba(255, 214, 10, 0.2)';
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2 + rotation;
      const x = heroCanvas.clientWidth / 2 + Math.cos(angle) * 150;
      const y = heroCanvas.clientHeight / 2 + Math.sin(angle) * 150;
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(drawHero3D);
  }

  drawHero3D();

  // Handle resize
  window.addEventListener('resize', () => {
    heroCanvas.width = heroCanvas.clientWidth;
    heroCanvas.height = heroCanvas.clientHeight;
  });

  // Set initial canvas size
  heroCanvas.width = heroCanvas.clientWidth;
  heroCanvas.height = heroCanvas.clientHeight;
}

// ============================================
// NAVBAR INTERACTIONS
// ============================================

const navbar = document.querySelector('.navbar');
let lastScrollY = 0;

window.addEventListener('scroll', () => {
  lastScrollY = window.scrollY;
  
  if (lastScrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Smooth scroll for navbar links
document.querySelectorAll('.navbar-links a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ============================================
// ANIMATIONS WITH GSAP
// ============================================

gsap.registerPlugin(ScrollTrigger);

// Animate hero content on load
gsap.timeline().from('.hero-title', {
  opacity: 0,
  y: 30,
  duration: 0.8,
  delay: 2.8
}).from('.hero-subtitle', {
  opacity: 0,
  y: 20,
  duration: 0.6
}, '<0.2').from('.hero-buttons', {
  opacity: 0,
  y: 20,
  duration: 0.6
}, '<0.2');

// Scroll animations for sections
document.querySelectorAll('.section-header').forEach((el) => {
  gsap.from(el, {
    scrollTrigger: {
      trigger: el,
      start: 'top 80%',
      once: true
    },
    opacity: 0,
    y: 30,
    duration: 0.8
  });
});

// Bento card animations
document.querySelectorAll('.bento-card').forEach((card, i) => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: 'top 85%',
      once: true
    },
    opacity: 0,
    y: 30,
    duration: 0.6,
    delay: i * 0.1
  });
});

// Feature card hover effect
document.querySelectorAll('.bento-card, .contact-card, .footer-section').forEach((card) => {
  card.addEventListener('mouseenter', () => {
    gsap.to(card, {
      y: -8,
      duration: 0.3,
      overwrite: 'auto'
    });
  });

  card.addEventListener('mouseleave', () => {
    gsap.to(card, {
      y: 0,
      duration: 0.3,
      overwrite: 'auto'
    });
  });
});

// ============================================
// BUTTON INTERACTIONS
// ============================================

document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
  btn.addEventListener('click', (e) => {
    // Ripple effect
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ripple = document.createElement('span');
    ripple.style.position = 'absolute';
    ripple.style.width = '20px';
    ripple.style.height = '20px';
    ripple.style.background = 'rgba(255, 255, 255, 0.5)';
    ripple.style.borderRadius = '50%';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.pointerEvents = 'none';
    ripple.style.animation = 'rippleAnimation 0.6s ease-out';

    btn.style.position = 'relative';
    btn.style.overflow = 'hidden';
    btn.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  });
});

// ============================================
// UTILITIES
// ============================================

// Add ripple animation keyframes
const style = document.createElement('style');
style.innerHTML = `
  @keyframes rippleAnimation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
