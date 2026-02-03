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
        ctx.fillStyle = 'rgba(255, 255, 255, ' + this.opacity + ')';
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
    
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
    }

    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {
                const opacity = (1 - distance / 120) * 0.15;
                ctx.strokeStyle = 'rgba(255, 255, 255, ' + opacity + ')';
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

window.addEventListener('resize', function() {
    resizeCanvas();
    initParticles();
});

resizeCanvas();
initParticles();
animateParticles();

let allProblems = [];
let currentIndex = 0;

document.addEventListener('DOMContentLoaded', function() {
    loadProblems();
});

function loadProblems() {
    fetch('problems.json')
        .then(function(response) { return response.json(); })
        .then(function(data) {
            allProblems = data;
            loadProblemDetail();
            setupNavigation();
        })
        .catch(function(error) {
            console.error('Error loading problems:', error);
        });
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

    document.title = problem.code + ' - ' + problem.name + ' | Sdmist';
    document.getElementById('detailCode').textContent = problem.code;
    document.getElementById('detailTitle').textContent = problem.name;
    document.getElementById('detailRating').textContent = problem.rating;
    document.getElementById('detailHint').textContent = problem.hint;
    document.getElementById('detailExplanation').textContent = problem.explanation;

    loadCode(problem.solutionFile);
    updateNavButtons();
}

function loadCode(filePath) {
    fetch(filePath)
        .then(function(response) { return response.text(); })
        .then(function(code) {
            const codeElement = document.getElementById('detailSolution');
            codeElement.textContent = code;
            hljs.highlightElement(codeElement);
        })
        .catch(function(error) {
            console.error('Error loading code:', error);
            document.getElementById('detailSolution').textContent = '// Error loading code';
        });
}

function setupNavigation() {
    const backBtn = document.getElementById('backBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const copyBtn = document.getElementById('copyBtn');

    backBtn.addEventListener('click', function() {
        window.location.href = 'index.html';
    });

    prevBtn.addEventListener('click', function() {
        if (currentIndex > 0) {
            window.location.href = 'problem.html?id=' + (currentIndex - 1);
        }
    });

    nextBtn.addEventListener('click', function() {
        if (currentIndex < allProblems.length - 1) {
            window.location.href = 'problem.html?id=' + (currentIndex + 1);
        }
    });

    copyBtn.addEventListener('click', function() {
        const code = document.getElementById('detailSolution').textContent;
        navigator.clipboard.writeText(code).then(function() {
            copyBtn.textContent = 'Copied!';
            copyBtn.classList.add('copied');
            
            setTimeout(function() {
                copyBtn.textContent = 'Copy Code';
                copyBtn.classList.remove('copied');
            }, 2000);
        }).catch(function(error) {
            console.error('Error copying code:', error);
            alert('Failed to copy code');
        });
    });
}

function updateNavButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === allProblems.length - 1;
}
