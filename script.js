// Store resources in localStorage
let resources = JSON.parse(localStorage.getItem('resources')) || [];
let isLoggedIn = false;

// DOM Elements
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const addResourceBtn = document.getElementById('addResourceBtn');
const authModal = document.getElementById('auth-modal');
const resourceModal = document.getElementById('resource-modal');
const resourceGrid = document.getElementById('resourceGrid');
const authForm = document.getElementById('authForm');
const resourceForm = document.getElementById('resourceForm');

// Event Listeners
loginBtn.addEventListener('click', () => showModal(authModal, 'Login'));
signupBtn.addEventListener('click', () => showModal(authModal, 'Sign Up'));
addResourceBtn.addEventListener('click', () => {
    if (isLoggedIn) {
        showModal(resourceModal);
    } else {
        alert('Please login to add resources');
    }
});

document.querySelectorAll('.close').forEach(btn => {
    btn.addEventListener('click', () => {
        authModal.classList.remove('show');
        resourceModal.classList.remove('show');
    });
});

authForm.addEventListener('submit', handleAuth);
resourceForm.addEventListener('submit', handleResourceSubmit);

// Functions
function showModal(modal, title = '') {
    if (title) {
        document.getElementById('authTitle').textContent = title;
    }
    modal.classList.add('show');
}

function handleAuth(e) {
    e.preventDefault();
    isLoggedIn = true;
    loginBtn.textContent = 'Logout';
    signupBtn.style.display = 'none';
    authModal.classList.remove('show');
    alert('Successfully logged in!');
}

function handleResourceSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const resource = {
        id: Date.now(),
        title: e.target[0].value,
        link: e.target[1].value,
        type: e.target[2].value,
        description: e.target[3].value,
        date: new Date().toLocaleDateString()
    };

    resources.push(resource);
    localStorage.setItem('resources', JSON.stringify(resources));
    renderResources();
    resourceModal.classList.remove('show');
    e.target.reset();
}

function renderResources() {
    resourceGrid.innerHTML = resources.map(resource => `
        <div class="resource-card">
            <span class="resource-type">${resource.type}</span>
            <h3>${resource.title}</h3>
            <p>${resource.description}</p>
            <a href="${resource.link}" target="_blank">View Resource</a>
            <p class="date">Shared on: ${resource.date}</p>
        </div>
    `).join('');
}

// Initial render
renderResources();