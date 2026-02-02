// Particle Animation
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

    // Draw connections
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

// Problems Data Management
let allProblems = [];
let filteredProblems = [];

document.addEventListener('DOMContentLoaded', async () => {
    await loadProblems();
    setupEventListeners();
});

async function loadProblems() {
    try {
        const response = await fetch('problems.json');
        allProblems = await response.json();
        filteredProblems = [...allProblems];
        displayProblems(filteredProblems);
    } catch (error) {
        console.error('Error loading problems:', error);
        showNoResults();
    }
}

function setupEventListeners() {
    const searchInput = document.getElementById('searchInput');
    const filterBtn = document.getElementById('filterBtn');
    const resetBtn = document.getElementById('resetBtn');

    searchInput.addEventListener('input', handleSearch);
    filterBtn.addEventListener('click', handleFilter);
    resetBtn.addEventListener('click', handleReset);

    document.getElementById('minRating').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleFilter();
    });
    document.getElementById('maxRating').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleFilter();
    });
}

function handleSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
    
    filteredProblems = allProblems.filter(problem => {
        const codeMatch = problem.code.toLowerCase().includes(searchTerm);
        const nameMatch = problem.name.toLowerCase().includes(searchTerm);
        return codeMatch || nameMatch;
    });

    const minRating = parseInt(document.getElementById('minRating').value) || 0;
    const maxRating = parseInt(document.getElementById('maxRating').value) || Infinity;
    
    if (minRating > 0 || maxRating < Infinity) {
        filteredProblems = filteredProblems.filter(problem => 
            problem.rating >= minRating && problem.rating <= maxRating
        );
    }

    displayProblems(filteredProblems);
}

function handleFilter() {
    const minRating = parseInt(document.getElementById('minRating').value) || 0;
    const maxRating = parseInt(document.getElementById('maxRating').value) || Infinity;
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();

    filteredProblems = allProblems.filter(problem => {
        const ratingMatch = problem.rating >= minRating && problem.rating <= maxRating;
        
        if (searchTerm) {
            const codeMatch = problem.code.toLowerCase().includes(searchTerm);
            const nameMatch = problem.name.toLowerCase().includes(searchTerm);
            return ratingMatch && (codeMatch || nameMatch);
        }
        
        return ratingMatch;
    });

    displayProblems(filteredProblems);
}

function handleReset() {
    document.getElementById('searchInput').value = '';
    document.getElementById('minRating').value = '';
    document.getElementById('maxRating').value = '';
    filteredProblems = [...allProblems];
    displayProblems(filteredProblems);
}

function displayProblems(problems) {
    const tbody = document.getElementById('problemsBody');
    const noResults = document.getElementById('noResults');
    const table = document.getElementById('problemsTable');

    if (problems.length === 0) {
        tbody.innerHTML = '';
        table.style.display = 'none';
        noResults.style.display = 'block';
        return;
    }

    table.style.display = 'table';
    noResults.style.display = 'none';
    tbody.innerHTML = '';

    problems.forEach((problem, index) => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${problem.code}</td>
            <td>
                <div class="problem-name-cell">
                    <span class="problem-name">${problem.name}</span>
                    <span class="problem-hint-preview">(Hint)</span>
                </div>
            </td>
            <td class="problem-rating-cell">${problem.rating}</td>
            <td>
                <button class="show-code-btn" data-index="${allProblems.indexOf(problem)}">
                    Show Code
                </button>
            </td>
        `;

        tbody.appendChild(row);
    });

    // Add click handlers to show code buttons
    document.querySelectorAll('.show-code-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            window.location.href = `problem.html?id=${index}`;
        });
    });
}

function showNoResults() {
    const tbody = document.getElementById('problemsBody');
    const noResults = document.getElementById('noResults');
    const table = document.getElementById('problemsTable');
    
    tbody.innerHTML = '';
    table.style.display = 'none';
    noResults.style.display = 'block';
}
