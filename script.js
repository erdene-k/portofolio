// Global variables and initialization
let isScrolling = false;
let currentSection = 'home';
let animationFrameId = null;

// Initialize the portfolio
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeAnimatedBackground();
    initializeHero3D();
    initializeAbout3D();
    initializeSkills3D();
    initializeProjectCanvases();
    initializeContact3D();
    initializeScrollEffects();
    initializeSkillAnimations();
    initializeTimelineAnimations();
    initializeParticleEffects();
    initializeInteractiveElements();
});

// Navigation functionality
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    // Mobile menu toggle
    hamburger?.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
        updateActiveNavLink();
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Animated Background
function initializeAnimatedBackground() {
    const canvas = document.getElementById('bgCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let connections = [];
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Create particles
    function createParticles() {
        particles = [];
        const numParticles = Math.min(80, Math.floor(window.innerWidth / 20));
        
        for (let i = 0; i < numParticles; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2,
                hue: Math.random() * 60 + 180 // Blue to cyan range
            });
        }
    }
    
    createParticles();
    
    function animateBackground() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw particles
        particles.forEach((particle, i) => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = canvas.width;
            if (particle.x > canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = canvas.height;
            if (particle.y > canvas.height) particle.y = 0;
            
            // Draw particle
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${particle.hue}, 70%, 60%, ${particle.opacity})`;
            ctx.fill();
            
            // Draw connections
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[j].x - particle.x;
                const dy = particles[j].y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    const opacity = (120 - distance) / 120 * 0.2;
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `hsla(${particle.hue}, 70%, 60%, ${opacity})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        });
        
        requestAnimationFrame(animateBackground);
    }
    
    animateBackground();
}

// Hero 3D Animation
function initializeHero3D() {
    const canvas = document.getElementById('hero3D');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let time = 0;
    let mouseX = 0;
    let mouseY = 0;
    
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth * window.devicePixelRatio;
        canvas.height = canvas.offsetHeight * window.devicePixelRatio;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Mouse tracking
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = (e.clientX - rect.left) / rect.width;
        mouseY = (e.clientY - rect.top) / rect.height;
    });
    
    function draw3DShapes() {
        ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
        
        const centerX = canvas.offsetWidth / 2;
        const centerY = canvas.offsetHeight / 2;
        
        // Create multiple 3D cubes with different rotations
        for (let i = 0; i < 5; i++) {
            ctx.save();
            
            const offsetX = Math.sin(time + i) * 100;
            const offsetY = Math.cos(time + i * 0.7) * 50;
            const rotation = time + i * 0.5;
            const scale = 0.8 + Math.sin(time + i) * 0.2;
            
            ctx.translate(centerX + offsetX, centerY + offsetY);
            ctx.rotate(rotation);
            ctx.scale(scale, scale);
            
            // Mouse interaction
            const mouseInfluence = 0.1;
            ctx.translate(
                (mouseX - 0.5) * 50 * mouseInfluence,
                (mouseY - 0.5) * 50 * mouseInfluence
            );
            
            // Draw 3D cube faces
            const size = 40 + i * 5;
            
            // Create gradient
            const gradient = ctx.createLinearGradient(-size, -size, size, size);
            gradient.addColorStop(0, `hsla(${180 + i * 20}, 70%, 60%, 0.8)`);
            gradient.addColorStop(0.5, `hsla(${200 + i * 15}, 80%, 70%, 0.6)`);
            gradient.addColorStop(1, `hsla(${220 + i * 10}, 90%, 80%, 0.4)`);
            
            // Front face
            ctx.fillStyle = gradient;
            ctx.fillRect(-size/2, -size/2, size, size);
            
            // Right face (3D effect)
            ctx.fillStyle = `hsla(${180 + i * 20}, 70%, 40%, 0.6)`;
            ctx.beginPath();
            ctx.moveTo(size/2, -size/2);
            ctx.lineTo(size/2 + size/4, -size/2 - size/4);
            ctx.lineTo(size/2 + size/4, size/2 - size/4);
            ctx.lineTo(size/2, size/2);
            ctx.closePath();
            ctx.fill();
            
            // Top face (3D effect)
            ctx.fillStyle = `hsla(${180 + i * 20}, 70%, 50%, 0.7)`;
            ctx.beginPath();
            ctx.moveTo(-size/2, -size/2);
            ctx.lineTo(-size/2 + size/4, -size/2 - size/4);
            ctx.lineTo(size/2 + size/4, -size/2 - size/4);
            ctx.lineTo(size/2, -size/2);
            ctx.closePath();
            ctx.fill();
            
            // Outline
            ctx.strokeStyle = `hsla(${180 + i * 20}, 70%, 80%, 0.8)`;
            ctx.lineWidth = 2;
            ctx.strokeRect(-size/2, -size/2, size, size);
            
            ctx.restore();
        }
        
        time += 0.01;
        requestAnimationFrame(draw3DShapes);
    }
    
    draw3DShapes();
}

// About 3D Animation
function initializeAbout3D() {
    const canvas = document.getElementById('about3D');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let rotation = 0;
    
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth * window.devicePixelRatio;
        canvas.height = canvas.offsetHeight * window.devicePixelRatio;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    function drawAbout3D() {
        ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
        
        const centerX = canvas.offsetWidth / 2;
        const centerY = canvas.offsetHeight / 2;
        
        // Draw multiple rotating geometric shapes
        for (let i = 0; i < 4; i++) {
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(rotation + i * Math.PI / 2);
            
            const distance = 80 + Math.sin(rotation * 2) * 20;
            ctx.translate(distance, 0);
            ctx.rotate(-rotation * 2);
            
            const size = 30 + i * 5;
            const hue = 180 + i * 30;
            
            // Create gradient
            const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size);
            gradient.addColorStop(0, `hsla(${hue}, 70%, 70%, 0.9)`);
            gradient.addColorStop(1, `hsla(${hue}, 70%, 40%, 0.3)`);
            
            if (i % 2 === 0) {
                // Draw diamond
                ctx.beginPath();
                ctx.moveTo(0, -size);
                ctx.lineTo(size, 0);
                ctx.lineTo(0, size);
                ctx.lineTo(-size, 0);
                ctx.closePath();
                ctx.fillStyle = gradient;
                ctx.fill();
                ctx.strokeStyle = `hsla(${hue}, 70%, 80%, 0.8)`;
                ctx.lineWidth = 2;
                ctx.stroke();
            } else {
                // Draw circle
                ctx.beginPath();
                ctx.arc(0, 0, size, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();
                ctx.strokeStyle = `hsla(${hue}, 70%, 80%, 0.8)`;
                ctx.lineWidth = 2;
                ctx.stroke();
            }
            
            ctx.restore();
        }
        
        rotation += 0.02;
        requestAnimationFrame(drawAbout3D);
    }
    
    drawAbout3D();
}

// Skills 3D Animation
function initializeSkills3D() {
    const canvas = document.getElementById('skills3D');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let time = 0;
    const nodes = [];
    
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth * window.devicePixelRatio;
        canvas.height = canvas.offsetHeight * window.devicePixelRatio;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Create skill nodes
    const skills = ['Java', 'Node.js', 'React', 'AWS', 'Angular', 'Flutter', 'Docker', 'MongoDB'];
    skills.forEach((skill, i) => {
        nodes.push({
            x: Math.random() * canvas.offsetWidth,
            y: Math.random() * canvas.offsetHeight,
            z: Math.random() * 100,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            vz: (Math.random() - 0.5) * 0.2,
            radius: 15 + Math.random() * 10,
            hue: 180 + i * 25,
            skill: skill,
            pulse: Math.random() * Math.PI * 2
        });
    });
    
    function drawSkills3D() {
        ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
        
        // Update nodes
        nodes.forEach(node => {
            node.x += node.vx;
            node.y += node.vy;
            node.z += node.vz;
            node.pulse += 0.05;
            
            // Bounce off edges
            if (node.x < 0 || node.x > canvas.offsetWidth) node.vx *= -1;
            if (node.y < 0 || node.y > canvas.offsetHeight) node.vy *= -1;
            if (node.z < 0 || node.z > 100) node.vz *= -1;
            
            // Keep in bounds
            node.x = Math.max(0, Math.min(canvas.offsetWidth, node.x));
            node.y = Math.max(0, Math.min(canvas.offsetHeight, node.y));
            node.z = Math.max(0, Math.min(100, node.z));
        });
        
        // Draw connections
        ctx.strokeStyle = 'rgba(0, 212, 255, 0.2)';
        ctx.lineWidth = 1;
        
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const dz = nodes[i].z - nodes[j].z;
                const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
                
                if (distance < 150) {
                    const opacity = (150 - distance) / 150 * 0.3;
                    ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.stroke();
                }
            }
        }
        
        // Draw nodes
        nodes.forEach(node => {
            const scale = (node.z + 50) / 150; // 3D perspective
            const size = node.radius * scale;
            const pulseSize = Math.sin(node.pulse) * 3;
            
            // Glow effect
            const gradient = ctx.createRadialGradient(
                node.x, node.y, 0,
                node.x, node.y, size + pulseSize + 10
            );
            gradient.addColorStop(0, `hsla(${node.hue}, 70%, 70%, 0.8)`);
            gradient.addColorStop(0.7, `hsla(${node.hue}, 70%, 50%, 0.4)`);
            gradient.addColorStop(1, `hsla(${node.hue}, 70%, 30%, 0)`);
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(node.x, node.y, size + pulseSize + 10, 0, Math.PI * 2);
            ctx.fill();
            
            // Main node
            ctx.fillStyle = `hsla(${node.hue}, 70%, 60%, 0.9)`;
            ctx.beginPath();
            ctx.arc(node.x, node.y, size + pulseSize, 0, Math.PI * 2);
            ctx.fill();
            
            // Border
            ctx.strokeStyle = `hsla(${node.hue}, 70%, 80%, 1)`;
            ctx.lineWidth = 2;
            ctx.stroke();
        });
        
        time += 0.01;
        requestAnimationFrame(drawSkills3D);
    }
    
    drawSkills3D();
}

// Project Canvas Animations
function initializeProjectCanvases() {
    const projectCanvases = document.querySelectorAll('.project-canvas');
    
    projectCanvases.forEach((canvas, index) => {
        const ctx = canvas.getContext('2d');
        const animationType = canvas.getAttribute('data-animation');
        
        function resizeCanvas() {
            canvas.width = canvas.offsetWidth * window.devicePixelRatio;
            canvas.height = canvas.offsetHeight * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        }
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        switch (animationType) {
            case 'mobile':
                animateMobileProject(ctx, canvas);
                break;
            case 'web':
                animateWebProject(ctx, canvas);
                break;
            case 'security':
                animateSecurityProject(ctx, canvas);
                break;
        }
    });
}

function animateMobileProject(ctx, canvas) {
    let time = 0;
    
    function animate() {
        ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
        
        const centerX = canvas.offsetWidth / 2;
        const centerY = canvas.offsetHeight / 2;
        
        // Draw multiple phones with different animations
        for (let i = 0; i < 3; i++) {
            ctx.save();
            
            const offsetX = Math.sin(time + i * 2) * 30;
            const offsetY = Math.cos(time + i * 1.5) * 20;
            const rotation = Math.sin(time + i) * 0.1;
            const scale = 0.8 + Math.sin(time + i) * 0.1;
            
            ctx.translate(centerX + offsetX, centerY + offsetY);
            ctx.rotate(rotation);
            ctx.scale(scale, scale);
            
            // Phone outline
            const phoneWidth = 60;
            const phoneHeight = 100;
            const hue = 180 + i * 30;
            
            // Phone body
            const gradient = ctx.createLinearGradient(-phoneWidth/2, -phoneHeight/2, phoneWidth/2, phoneHeight/2);
            gradient.addColorStop(0, `hsla(${hue}, 70%, 60%, 0.8)`);
            gradient.addColorStop(1, `hsla(${hue}, 70%, 40%, 0.6)`);
            
            ctx.fillStyle = gradient;
            ctx.fillRect(-phoneWidth/2, -phoneHeight/2, phoneWidth, phoneHeight);
            
            // Screen
            ctx.fillStyle = `hsla(${hue}, 70%, 20%, 0.9)`;
            ctx.fillRect(-phoneWidth/2 + 5, -phoneHeight/2 + 10, phoneWidth - 10, phoneHeight - 20);
            
            // Animated screen content
            for (let j = 0; j < 4; j++) {
                const y = -30 + j * 15;
                const width = 30 + Math.sin(time + i + j) * 10;
                ctx.fillStyle = `hsla(${hue + 20}, 70%, 70%, ${0.7 + Math.sin(time + j) * 0.3})`;
                ctx.fillRect(-width/2, y, width, 8);
            }
            
            // Phone border
            ctx.strokeStyle = `hsla(${hue}, 70%, 80%, 0.9)`;
            ctx.lineWidth = 2;
            ctx.strokeRect(-phoneWidth/2, -phoneHeight/2, phoneWidth, phoneHeight);
            
            ctx.restore();
        }
        
        time += 0.03;
        requestAnimationFrame(animate);
    }
    
    animate();
}

function animateWebProject(ctx, canvas) {
    let time = 0;
    
    function animate() {
        ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
        
        const centerX = canvas.offsetWidth / 2;
        const centerY = canvas.offsetHeight / 2;
        
        // Draw browser windows
        for (let i = 0; i < 2; i++) {
            ctx.save();
            
            const offsetX = Math.sin(time + i * 3) * 40;
            const offsetY = Math.cos(time + i * 2) * 25;
            const scale = 0.9 + Math.sin(time + i) * 0.1;
            
            ctx.translate(centerX + offsetX, centerY + offsetY);
            ctx.scale(scale, scale);
            
            const browserWidth = 120;
            const browserHeight = 80;
            const hue = 200 + i * 40;
            
            // Browser window
            const gradient = ctx.createLinearGradient(-browserWidth/2, -browserHeight/2, browserWidth/2, browserHeight/2);
            gradient.addColorStop(0, `hsla(${hue}, 70%, 60%, 0.8)`);
            gradient.addColorStop(1, `hsla(${hue}, 70%, 40%, 0.6)`);
            
            ctx.fillStyle = gradient;
            ctx.fillRect(-browserWidth/2, -browserHeight/2, browserWidth, browserHeight);
            
            // Browser header
            ctx.fillStyle = `hsla(${hue}, 70%, 30%, 0.9)`;
            ctx.fillRect(-browserWidth/2, -browserHeight/2, browserWidth, 15);
            
            // Browser tabs
            for (let j = 0; j < 3; j++) {
                const tabX = -browserWidth/2 + 5 + j * 25;
                ctx.fillStyle = `hsla(${hue + j * 10}, 70%, ${50 + j * 10}%, 0.8)`;
                ctx.fillRect(tabX, -browserHeight/2 + 2, 20, 11);
            }
            
            // Animated content
            for (let j = 0; j < 4; j++) {
                const y = -browserHeight/2 + 25 + j * 12;
                const width = 80 + Math.sin(time + i + j * 0.5) * 20;
                const opacity = 0.5 + Math.sin(time + j) * 0.3;
                ctx.fillStyle = `hsla(${hue + 20}, 70%, 70%, ${opacity})`;
                ctx.fillRect(-width/2, y, width, 6);
            }
            
            // Browser border
            ctx.strokeStyle = `hsla(${hue}, 70%, 80%, 0.9)`;
            ctx.lineWidth = 2;
            ctx.strokeRect(-browserWidth/2, -browserHeight/2, browserWidth, browserHeight);
            
            ctx.restore();
        }
        
        time += 0.025;
        requestAnimationFrame(animate);
    }
    
    animate();
}

function animateSecurityProject(ctx, canvas) {
    let time = 0;
    
    function animate() {
        ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
        
        const centerX = canvas.offsetWidth / 2;
        const centerY = canvas.offsetHeight / 2;
        
        // Draw shield with pulsing effect
        ctx.save();
        ctx.translate(centerX, centerY);
        
        const scale = 1 + Math.sin(time * 2) * 0.1;
        ctx.scale(scale, scale);
        
        // Shield shape
        const shieldSize = 50;
        const hue = 280;
        
        // Glow effect
        for (let i = 0; i < 3; i++) {
            const glowSize = shieldSize + i * 15;
            const opacity = (3 - i) * 0.1;
            
            ctx.fillStyle = `hsla(${hue}, 70%, 60%, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(0, -glowSize);
            ctx.lineTo(-glowSize * 0.7, -glowSize * 0.4);
            ctx.lineTo(-glowSize * 0.7, glowSize * 0.4);
            ctx.lineTo(0, glowSize);
            ctx.lineTo(glowSize * 0.7, glowSize * 0.4);
            ctx.lineTo(glowSize * 0.7, -glowSize * 0.4);
            ctx.closePath();
            ctx.fill();
        }
        
        // Main shield
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, shieldSize);
        gradient.addColorStop(0, `hsla(${hue}, 70%, 70%, 0.9)`);
        gradient.addColorStop(1, `hsla(${hue}, 70%, 40%, 0.7)`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(0, -shieldSize);
        ctx.lineTo(-shieldSize * 0.7, -shieldSize * 0.4);
        ctx.lineTo(-shieldSize * 0.7, shieldSize * 0.4);
        ctx.lineTo(0, shieldSize);
        ctx.lineTo(shieldSize * 0.7, shieldSize * 0.4);
        ctx.lineTo(shieldSize * 0.7, -shieldSize * 0.4);
        ctx.closePath();
        ctx.fill();
        
        // Lock icon
        const lockSize = 15 + Math.sin(time * 3) * 2;
        ctx.fillStyle = `hsla(${hue + 40}, 70%, 80%, 0.9)`;
        ctx.fillRect(-lockSize/2, -lockSize/2, lockSize, lockSize);
        
        // Lock details
        ctx.strokeStyle = `hsla(${hue}, 70%, 30%, 0.9)`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, -lockSize/4, lockSize/3, Math.PI, 0);
        ctx.stroke();
        
        // Shield border
        ctx.strokeStyle = `hsla(${hue}, 70%, 80%, 0.9)`;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(0, -shieldSize);
        ctx.lineTo(-shieldSize * 0.7, -shieldSize * 0.4);
        ctx.lineTo(-shieldSize * 0.7, shieldSize * 0.4);
        ctx.lineTo(0, shieldSize);
        ctx.lineTo(shieldSize * 0.7, shieldSize * 0.4);
        ctx.lineTo(shieldSize * 0.7, -shieldSize * 0.4);
        ctx.closePath();
        ctx.stroke();
        
        // Pulsing rings
        for (let i = 0; i < 2; i++) {
            const ringRadius = 70 + i * 20 + Math.sin(time * 2 + i) * 10;
            const opacity = 0.3 - i * 0.1 + Math.sin(time * 2) * 0.1;
            
            ctx.strokeStyle = `hsla(${hue}, 70%, 70%, ${opacity})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(0, 0, ringRadius, 0, Math.PI * 2);
            ctx.stroke();
        }
        
        ctx.restore();
        
        time += 0.04;
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Contact 3D Animation
function initializeContact3D() {
    const canvas = document.getElementById('contact3D');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let time = 0;
    const particles = [];
    
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth * window.devicePixelRatio;
        canvas.height = canvas.offsetHeight * window.devicePixelRatio;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Create particles
    for (let i = 0; i < 30; i++) {
        particles.push({
            x: Math.random() * canvas.offsetWidth,
            y: Math.random() * canvas.offsetHeight,
            z: Math.random() * 100,
            vx: (Math.random() - 0.5) * 1,
            vy: (Math.random() - 0.5) * 1,
            vz: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 3 + 1,
            hue: 180 + Math.random() * 60,
            opacity: Math.random() * 0.5 + 0.3
        });
    }
    
    function animateContact() {
        ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
        
        // Update particles
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.z += particle.vz;
            
            // Bounce off edges
            if (particle.x < 0 || particle.x > canvas.offsetWidth) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.offsetHeight) particle.vy *= -1;
            if (particle.z < 0 || particle.z > 100) particle.vz *= -1;
            
            // Keep in bounds
            particle.x = Math.max(0, Math.min(canvas.offsetWidth, particle.x));
            particle.y = Math.max(0, Math.min(canvas.offsetHeight, particle.y));
            particle.z = Math.max(0, Math.min(100, particle.z));
        });
        
        // Draw connections
        ctx.strokeStyle = 'rgba(0, 212, 255, 0.2)';
        ctx.lineWidth = 1;
        
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dz = particles[i].z - particles[j].z;
                const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
                
                if (distance < 100) {
                    const opacity = (100 - distance) / 100 * 0.3;
                    ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        
        // Draw particles
        particles.forEach(particle => {
            const scale = (particle.z + 50) / 150;
            const size = particle.size * scale;
            
            // Glow effect
            const gradient = ctx.createRadialGradient(
                particle.x, particle.y, 0,
                particle.x, particle.y, size * 3
            );
            gradient.addColorStop(0, `hsla(${particle.hue}, 70%, 70%, ${particle.opacity})`);
            gradient.addColorStop(1, `hsla(${particle.hue}, 70%, 40%, 0)`);
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, size * 3, 0, Math.PI * 2);
            ctx.fill();
            
            // Main particle
            ctx.fillStyle = `hsla(${particle.hue}, 70%, 60%, ${particle.opacity})`;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
            ctx.fill();
        });
        
        time += 0.01;
        requestAnimationFrame(animateContact);
    }
    
    animateContact();
}

// Scroll Effects and Animations
function initializeScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.skill-category, .timeline-item, .project-card, .award-card, .about-card, .education-card'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Skill Animations
function initializeSkillAnimations() {
    const skillBars = document.querySelectorAll('.skill-progress');
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = width + '%';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Timeline Animations
function initializeTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const observerOptions = {
        threshold: 0.3
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

// Particle Effects
function initializeParticleEffects() {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach((element, index) => {
        const speed = parseFloat(element.getAttribute('data-speed')) || 1;
        
        function animateFloat() {
            const time = Date.now() * 0.001 * speed;
            const x = Math.sin(time) * 20;
            const y = Math.cos(time * 0.7) * 15;
            
            element.style.transform = `translate(${x}px, ${y}px)`;
            requestAnimationFrame(animateFloat);
        }
        
        // Stagger the start times
        setTimeout(animateFloat, index * 200);
    });
}

// Interactive Elements
function initializeInteractiveElements() {
    // Project card hover effects
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Skill category hover effects
    document.querySelectorAll('.skill-category').forEach(category => {
        category.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        category.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Button hover effects
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            const glow = this.querySelector('.btn-glow');
            if (glow) {
                glow.style.opacity = '0.3';
            }
        });
        
        btn.addEventListener('mouseleave', function() {
            const glow = this.querySelector('.btn-glow');
            if (glow) {
                glow.style.opacity = '0';
            }
        });
    });
}

// Performance optimization
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // Reinitialize canvas animations on resize
        initializeHero3D();
        initializeAbout3D();
        initializeSkills3D();
        initializeProjectCanvases();
        initializeContact3D();
    }, 250);
});

// Loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Trigger initial animations with staggered delays
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero-content > *');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }, 500);
});

// Optimize scroll events
let scrollTimeout;
window.addEventListener('scroll', function() {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    
    scrollTimeout = setTimeout(function() {
        updateActiveNavLink();
    }, 10);
}, { passive: true });