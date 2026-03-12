const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
const particleCount = 120;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.color = this.getColor();
    }

    getColor() {
        const colors = [
            'rgba(167, 139, 250, ',
            'rgba(240, 171, 252, ',
            'rgba(147, 197, 253, ',
            'rgba(134, 239, 172, ',
            'rgba(253, 224, 71, '
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
        
        ctx.shadowBlur = 20;
        ctx.shadowColor = this.color + '0.8)';
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
                const opacity = (1 - distance / 150) * 0.12;
                ctx.strokeStyle = 'rgba(167, 139, 250, ' + opacity + ')';
                ctx.lineWidth = 1.5;
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

const LANGUAGE_CONFIG = {
    python: { name: 'Python', ext: '.py', hljs: 'python' },
    c: { name: 'C', ext: '.c', hljs: 'c' },
    cpp: { name: 'C++', ext: '.cpp', hljs: 'cpp' },
    java: { name: 'Java', ext: '.java', hljs: 'java' },
    kotlin: { name: 'Kotlin', ext: '.kt', hljs: 'kotlin' },
    rust: { name: 'Rust', ext: '.rs', hljs: 'rust' },
    go: { name: 'Go', ext: '.go', hljs: 'go' },
    iylira: { name: 'Iylira', ext: '.iyr', hljs: 'iylira' }
};

let allProblems = [];
let currentIndex = 0;
let currentProblem = null;
let availableLanguages = [];
let currentLanguage = 'python';
let hljsReady = false;

// Wait for hljs to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if hljs is ready
    function checkHljsReady() {
        if (typeof hljs !== 'undefined' && hljs.highlightElement) {
            hljsReady = true;
            loadProblems();
        } else {
            setTimeout(checkHljsReady, 100);
        }
    }
    checkHljsReady();
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

    currentProblem = allProblems[currentIndex];
    
    if (!currentProblem) {
        document.querySelector('.problem-detail').innerHTML = '<p>Problem not found</p>';
        return;
    }

    document.title = currentProblem.code + ' - ' + currentProblem.name + ' | Sdmist';
    document.getElementById('detailCode').textContent = currentProblem.code;
    document.getElementById('detailTitle').textContent = currentProblem.name;
    document.getElementById('detailRating').textContent = currentProblem.rating;
    
    const hintElement = document.getElementById('detailHint');
    hintElement.textContent = currentProblem.hint;
    
    document.getElementById('timeComplexity').textContent = currentProblem.timeComplexity || 'N/A';
    document.getElementById('spaceComplexity').textContent = currentProblem.spaceComplexity || 'N/A';
    
    const explanationDiv = document.getElementById('detailExplanation');
    explanationDiv.innerHTML = '<p>' + currentProblem.explanation + '</p>';
    
    // Wait for MathJax to be fully loaded before typesetting
    function typesetMath() {
        if (window.MathJax && window.MathJax.typesetPromise) {
            MathJax.typesetPromise([hintElement, explanationDiv]).catch(function(err) {
                console.log('MathJax error:', err);
            });
        } else {
            // MathJax not ready yet, wait and try again
            setTimeout(typesetMath, 100);
        }
    }
    typesetMath();

    detectAvailableLanguages();
    updateNavButtons();
}

function detectAvailableLanguages() {
    availableLanguages = [];
    const solutions = currentProblem.solutions || {};
    
    Object.keys(solutions).forEach(function(lang) {
        if (LANGUAGE_CONFIG[lang] && solutions[lang]) {
            availableLanguages.push(lang);
        }
    });
    
    if (availableLanguages.length === 0) {
        availableLanguages = ['python'];
    }
    
    if (availableLanguages.includes('python')) {
        currentLanguage = 'python';
    } else {
        currentLanguage = availableLanguages[0];
    }
    
    populateLanguageSelector();
    loadCode(currentLanguage);
}

function populateLanguageSelector() {
    const select = document.getElementById('languageSelect');
    select.innerHTML = '';
    
    availableLanguages.forEach(function(lang) {
        const option = document.createElement('option');
        option.value = lang;
        option.textContent = LANGUAGE_CONFIG[lang].name;
        if (lang === currentLanguage) {
            option.selected = true;
        }
        select.appendChild(option);
    });

    select.addEventListener('change', function() {
        currentLanguage = this.value;
        loadCode(currentLanguage);
    });
}

function loadCode(language) {
    const solutions = currentProblem.solutions || {};
    const filePath = solutions[language];
    
    if (!filePath) {
        const codeElement = document.getElementById('detailSolution');
        codeElement.textContent = '// No solution available for this language';
        codeElement.className = '';
        return;
    }

    fetch(filePath)
        .then(function(response) { 
            if (!response.ok) {
                throw new Error('File not found: ' + filePath);
            }
            return response.text(); 
        })
        .then(function(code) {
            const codeElement = document.getElementById('detailSolution');
            codeElement.textContent = code;
            
            if (language === 'iylira') {
                codeElement.className = '';
                highlightIylira(codeElement);
            } else {
                const langClass = LANGUAGE_CONFIG[language].hljs;
                codeElement.className = 'language-' + langClass;
                codeElement.removeAttribute('data-highlighted');
                
                // hljs is guaranteed to be ready now
                if (hljsReady) {
                    try {
                        hljs.highlightElement(codeElement);
                    } catch (e) {
                        console.error('Highlighting error:', e);
                    }
                } else {
                    console.error('hljs not ready - this should not happen');
                }
            }
        })
        .catch(function(error) {
            console.error('Error loading code:', error);
            const codeElement = document.getElementById('detailSolution');
            codeElement.textContent = '// Error loading code: ' + error.message;
            codeElement.className = '';
        });
}

function highlightIylira(codeElement) {
    const code = codeElement.textContent;
    const keywords = [
        'read', 'input', 'scan', 'fetch', 'see',
        'whisper', 'write', 'draw', 'show', 'plot',
        'flow', 'sflow', 'set', 'sset', 'seq', 'matrix',
        'let', 'tlet',
        'while', 'for', 'drift', 'repeat', 'through',
        'in', 'not', 'true', 'false', 'True', 'False',
        'send', 'return', 'make', 'get', 'times'
    ];
    
    let highlighted = code;
    
    highlighted = highlighted.replace(/#invite\s+\w+/g, function(match) {
        return '<span style="color: #c678dd; font-weight: 600;">' + match + '</span>';
    });
    
    highlighted = highlighted.replace(/#def/g, '<span style="color: #c678dd; font-weight: 600;">#def</span>');
    
    keywords.forEach(function(keyword) {
        const regex = new RegExp('\\b' + keyword + '\\b', 'g');
        highlighted = highlighted.replace(regex, '<span style="color: #c678dd; font-weight: 600;">' + keyword + '</span>');
    });
    
    highlighted = highlighted.replace(/(".*?"|'.*?')/g, '<span style="color: #98c379;">$1</span>');
    
    highlighted = highlighted.replace(/\b(\d+)\b/g, '<span style="color: #d19a66;">$1</span>');
    
    highlighted = highlighted.replace(/(#[^\n]*)/g, '<span style="color: #5c6370; font-style: italic;">$1</span>');
    
    codeElement.innerHTML = highlighted;
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
