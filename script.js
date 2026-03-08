const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
const particleCount = 100;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2.5 + 1;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.opacity = Math.random() * 0.4 + 0.1;
        this.color = this.getColor();
    }

    getColor() {
        const colors = [
            'rgba(167, 139, 250, ',
            'rgba(240, 171, 252, ',
            'rgba(147, 197, 253, ',
            'rgba(134, 239, 172, '
        ];
        return colors[Math.floor(Math.random() * colors.length)];
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
        ctx.fillStyle = this.color + this.opacity + ')';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color + '0.5)';
        ctx.fill();
        ctx.shadowBlur = 0;
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

            if (distance < 150) {
                const opacity = (1 - distance / 150) * 0.1;
                ctx.strokeStyle = 'rgba(167, 139, 250, ' + opacity + ')';
                ctx.lineWidth = 1;
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
let filteredProblems = [];
let currentPage = 1;
const PROBLEMS_PER_PAGE = 100;

document.addEventListener('DOMContentLoaded', function() {
    loadProblems();
});

function loadProblems() {
    fetch('problems.json')
        .then(function(response) { return response.json(); })
        .then(function(data) {
            allProblems = data;
            filteredProblems = data.slice();
            displayProblems();
            setupEventListeners();
        })
        .catch(function(error) {
            console.error('Error loading problems:', error);
            showNoResults();
        });
}

function setupEventListeners() {
    const searchInput = document.getElementById('searchInput');
    const filterBtn = document.getElementById('filterBtn');
    const resetBtn = document.getElementById('resetBtn');

    searchInput.addEventListener('input', handleSearch);
    filterBtn.addEventListener('click', handleFilter);
    resetBtn.addEventListener('click', handleReset);

    document.getElementById('minRating').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') handleFilter();
    });
    document.getElementById('maxRating').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') handleFilter();
    });

    document.getElementById('prevPage').addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            displayProblems();
        }
    });

    document.getElementById('nextPage').addEventListener('click', function() {
        const totalPages = Math.ceil(filteredProblems.length / PROBLEMS_PER_PAGE);
        if (currentPage < totalPages) {
            currentPage++;
            displayProblems();
        }
    });

    document.getElementById('jumpBtn').addEventListener('click', function() {
        const pageInput = document.getElementById('pageJump');
        const page = parseInt(pageInput.value);
        const totalPages = Math.ceil(filteredProblems.length / PROBLEMS_PER_PAGE);
        
        if (page && page >= 1 && page <= totalPages) {
            currentPage = page;
            displayProblems();
            pageInput.value = '';
        }
    });

    document.getElementById('pageJump').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            document.getElementById('jumpBtn').click();
        }
    });
}

function handleSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
    
    filteredProblems = allProblems.filter(function(problem) {
        const codeMatch = problem.code.toLowerCase().includes(searchTerm);
        const nameMatch = problem.name.toLowerCase().includes(searchTerm);
        return codeMatch || nameMatch;
    });

    const minRating = parseInt(document.getElementById('minRating').value) || 0;
    const maxRating = parseInt(document.getElementById('maxRating').value) || Infinity;
    
    if (minRating > 0 || maxRating < Infinity) {
        filteredProblems = filteredProblems.filter(function(problem) {
            return problem.rating >= minRating && problem.rating <= maxRating;
        });
    }

    currentPage = 1;
    displayProblems();
}

function handleFilter() {
    const minRating = parseInt(document.getElementById('minRating').value) || 0;
    const maxRating = parseInt(document.getElementById('maxRating').value) || Infinity;
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();

    filteredProblems = allProblems.filter(function(problem) {
        const ratingMatch = problem.rating >= minRating && problem.rating <= maxRating;
        
        if (searchTerm) {
            const codeMatch = problem.code.toLowerCase().includes(searchTerm);
            const nameMatch = problem.name.toLowerCase().includes(searchTerm);
            return ratingMatch && (codeMatch || nameMatch);
        }
        
        return ratingMatch;
    });

    currentPage = 1;
    displayProblems();
}

function handleReset() {
    document.getElementById('searchInput').value = '';
    document.getElementById('minRating').value = '';
    document.getElementById('maxRating').value = '';
    filteredProblems = allProblems.slice();
    currentPage = 1;
    displayProblems();
}

function displayProblems() {
    const tbody = document.getElementById('problemsBody');
    const noResults = document.getElementById('noResults');
    const table = document.getElementById('problemsTable');
    const pagination = document.getElementById('pagination');

    if (filteredProblems.length === 0) {
        tbody.innerHTML = '';
        table.style.display = 'none';
        pagination.style.display = 'none';
        noResults.style.display = 'block';
        return;
    }

    table.style.display = 'table';
    noResults.style.display = 'none';
    tbody.innerHTML = '';

    const totalPages = Math.ceil(filteredProblems.length / PROBLEMS_PER_PAGE);
    const startIdx = (currentPage - 1) * PROBLEMS_PER_PAGE;
    const endIdx = Math.min(startIdx + PROBLEMS_PER_PAGE, filteredProblems.length);
    const pageProblems = filteredProblems.slice(startIdx, endIdx);

    pageProblems.forEach(function(problem) {
        const row = document.createElement('tr');
        
        row.innerHTML = '<td>' + problem.code + '</td>' +
            '<td><div class="problem-name-cell">' +
            '<span class="problem-name">' + problem.name + '</span>' +
            '</div></td>' +
            '<td class="problem-rating-cell">' + problem.rating + '</td>' +
            '<td><button class="show-code-btn" data-index="' + allProblems.indexOf(problem) + '">' +
            'Show Code</button></td>';

        tbody.appendChild(row);
    });

    document.querySelectorAll('.show-code-btn').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            const index = parseInt(e.target.dataset.index);
            window.location.href = 'problem.html?id=' + index;
        });
    });

    if (totalPages > 1) {
        pagination.style.display = 'flex';
        updatePagination(totalPages);
    } else {
        pagination.style.display = 'none';
    }
}

function updatePagination(totalPages) {
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');
    const pageNumbers = document.getElementById('pageNumbers');
    const pageJump = document.getElementById('pageJump');

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
    pageJump.max = totalPages;

    pageNumbers.innerHTML = '';

    const maxVisible = 7;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage < maxVisible - 1) {
        startPage = Math.max(1, endPage - maxVisible + 1);
    }

    if (startPage > 1) {
        addPageNumber(1);
        if (startPage > 2) {
            const dots = document.createElement('span');
            dots.textContent = '...';
            dots.style.color = 'var(--text-tertiary)';
            dots.style.padding = '0 0.5rem';
            pageNumbers.appendChild(dots);
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        addPageNumber(i);
    }

    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            const dots = document.createElement('span');
            dots.textContent = '...';
            dots.style.color = 'var(--text-tertiary)';
            dots.style.padding = '0 0.5rem';
            pageNumbers.appendChild(dots);
        }
        addPageNumber(totalPages);
    }
}

function addPageNumber(pageNum) {
    const pageNumbers = document.getElementById('pageNumbers');
    const pageBtn = document.createElement('button');
    pageBtn.className = 'page-num';
    if (pageNum === currentPage) {
        pageBtn.classList.add('active');
    }
    pageBtn.textContent = pageNum;
    pageBtn.addEventListener('click', function() {
        currentPage = pageNum;
        displayProblems();
    });
    pageNumbers.appendChild(pageBtn);
}

function showNoResults() {
    const tbody = document.getElementById('problemsBody');
    const noResults = document.getElementById('noResults');
    const table = document.getElementById('problemsTable');
    const pagination = document.getElementById('pagination');
    
    tbody.innerHTML = '';
    table.style.display = 'none';
    pagination.style.display = 'none';
    noResults.style.display = 'block';
}
