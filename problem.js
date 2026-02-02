// Particle Animation (same as homepage)
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

let particles = [];
const particleCount = 80;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }

    draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let particle of particles) {
        particle.update();
        particle.draw();
    }

    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {
                const opacity = (1 - distance / 120) * 0.15;
                ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }

    requestAnimationFrame(animateParticles);
}

window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
});

resizeCanvas();
initParticles();
animateParticles();

// Problem Detail Page Logic
let allProblems = [];
let currentIndex = 0;

document.addEventListener('DOMContentLoaded', async () => {
    await loadProblems();
    loadProblemDetail();
    setupNavigation();
});

async function loadProblems() {
    try {
        const response = await fetch('problems.json');
        allProblems = await response.json();
    } catch (error) {
        console.error('Error loading problems:', error);
    }
}

function loadProblemDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    currentIndex = parseInt(urlParams.get('id')) || 0;

    if (currentIndex < 0 || currentIndex >= allProblems.length) {
        currentIndex = 0;
    }

    const problem = allProblems[currentIndex];
    
    if (!problem) {
        document.querySelector('.problem-detail').innerHTML = '<p>Problem not found</p>';
        return;
    }

    // Update page title
    document.title = `${problem.code} - ${problem.name} | Sdmist`;

    // Display problem details
    document.getElementById('problemCode').textContent = problem.code;
    document.getElementById('problemTitle').textContent = problem.name;
    document.getElementById('problemRating').textContent = problem.rating;
    document.getElementById('problemHint').textContent = problem.hint;
    document.getElementById('problemExplanation').textContent = problem.explanation;

    // Load and display code
    loadCode(problem.solutionFile);

    // Update navigation buttons
    updateNavButtons();
}

async function loadCode(filePath) {
    try {
        const response = await fetch(filePath);
        const code = await response.text();
        const codeElement = document.querySelector('#problemCode');
        codeElement.textContent = code;
        hljs.highlightElement(codeElement);
    } catch (error) {
        console.error('Error loading code:', error);
        document.querySelector('#problemCode').textContent = '// Error loading code';
    }
}

function setupNavigation() {
    const backBtn = document.getElementById('backBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const copyBtn = document.getElementById('copyBtn');

    backBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            window.location.href = `problem.html?id=${currentIndex - 1}`;
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < allProblems.length - 1) {
            window.location.href = `problem.html?id=${currentIndex + 1}`;
        }
    });

    copyBtn.addEventListener('click', async () => {
        const code = document.querySelector('#problemCode').textContent;
        try {
            await navigator.clipboard.writeText(code);
            copyBtn.textContent = 'Copied!';
            copyBtn.classList.add('copied');
            
            setTimeout(() => {
                copyBtn.textContent = 'Copy Code';
                copyBtn.classList.remove('copied');
            }, 2000);
        } catch (error) {
            console.error('Error copying code:', error);
            alert('Failed to copy code');
        }
    });
}

function updateNavButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === allProblems.length - 1;
}
