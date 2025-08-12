// Sample data
let skills = [
    {
        id: 1,
        user: "Sarah Johnson",
        userRating: 4.9,
        skill: "Guitar Lessons",
        category: "music",
        description: "Professional guitar instructor with 8 years experience. I teach acoustic, electric, and classical guitar for all skill levels.",
        wants: "Web design help for my music website",
        location: "Downtown",
        avatar: "SJ"
    },
    {
        id: 2,
        user: "Mike Chen",
        userRating: 4.7,
        skill: "Web Development",
        category: "tech",
        description: "Full-stack developer specializing in React and Node.js. Can help with websites, apps, and technical consulting.",
        wants: "Cooking lessons (Asian cuisine preferred)",
        location: "Tech District",
        avatar: "MC"
    },
    {
        id: 3,
        user: "Emma Davis",
        userRating: 4.8,
        skill: "Personal Training",
        category: "fitness",
        description: "Certified personal trainer and nutritionist. Specializing in strength training and weight loss programs.",
        wants: "Graphic design for my fitness brand",
        location: "Fitness Center",
        avatar: "ED"
    },
    {
        id: 4,
        user: "Carlos Rodriguez",
        userRating: 4.6,
        skill: "Spanish Tutoring",
        category: "language",
        description: "Native Spanish speaker with teaching certification. Conversational Spanish and business Spanish available.",
        wants: "Help with apartment painting",
        location: "Language Center",
        avatar: "CR"
    },
    {
        id: 5,
        user: "Lisa Park",
        userRating: 4.9,
        skill: "Graphic Design",
        category: "art",
        description: "Professional graphic designer with expertise in branding, logos, and digital marketing materials.",
        wants: "Piano lessons for beginners",
        location: "Creative Studio",
        avatar: "LP"
    },
    {
        id: 6,
        user: "David Wilson",
        userRating: 4.5,
        skill: "Home Renovation",
        category: "home",
        description: "Experienced contractor specializing in kitchen and bathroom renovations, painting, and general repairs.",
        wants: "Photography lessons",
        location: "Suburbs",
        avatar: "DW"
    }
];

let userSkills = [
    {
        skill: "JavaScript Programming",
        category: "tech",
        description: "Frontend and backend JavaScript development, React, Node.js",
        wants: "Guitar lessons"
    },
    {
        skill: "Photography",
        category: "art",
        description: "Portrait and event photography, photo editing",
        wants: "Spanish tutoring"
    }
];

let matches = [
    {
        user: "Sarah Johnson",
        userRating: 4.9,
        skill: "Guitar Lessons",
        yourSkill: "JavaScript Programming",
        matchScore: 95,
        avatar: "SJ"
    },
    {
        user: "Carlos Rodriguez",
        userRating: 4.6,
        skill: "Spanish Tutoring",
        yourSkill: "Photography",
        matchScore: 88,
        avatar: "CR"
    }
];

let activeTrades = [
    {
        user: "Sarah Johnson",
        userSkill: "Guitar Lessons",
        yourSkill: "JavaScript Programming",
        status: "In Progress",
        avatar: "SJ",
        nextSession: "Tomorrow 3:00 PM"
    }
];

// DOM elements
const tabs = document.querySelectorAll('.tab-btn');
const contents = document.querySelectorAll('.tab-content');
const skillsGrid = document.getElementById('skillsGrid');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const searchBtn = document.getElementById('searchBtn');
const tradeModal = document.getElementById('tradeModal');
const addSkillModal = document.getElementById('addSkillModal');

// Initialize
renderSkills(skills);
renderMySkills();
renderMatches();
renderActiveTrades();

// Tab switching
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const tabId = tab.id.replace('Tab', '');
        
        tabs.forEach(t => {
            t.classList.remove('bg-purple-600', 'text-white');
            t.classList.add('text-gray-600', 'hover:text-gray-800');
        });
        
        tab.classList.add('bg-purple-600', 'text-white');
        tab.classList.remove('text-gray-600', 'hover:text-gray-800');
        
        contents.forEach(content => content.classList.add('hidden'));
        document.getElementById(tabId + 'Content').classList.remove('hidden');
    });
});

// Search functionality
searchBtn.addEventListener('click', performSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') performSearch();
});

function performSearch() {
    const query = searchInput.value.toLowerCase();
    const category = categoryFilter.value;
    
    let filtered = skills.filter(skill => {
        const matchesQuery = !query || 
            skill.skill.toLowerCase().includes(query) ||
            skill.description.toLowerCase().includes(query) ||
            skill.wants.toLowerCase().includes(query);
        
        const matchesCategory = !category || skill.category === category;
        
        return matchesQuery && matchesCategory;
    });
    
    renderSkills(filtered);
}

function renderSkills(skillsToRender) {
    skillsGrid.innerHTML = skillsToRender.map(skill => `
        <div class="skill-card bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div class="flex items-start justify-between mb-4">
                <div class="flex items-center space-x-3">
                    <div class="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                        <span class="text-white font-semibold">${skill.avatar}</span>
                    </div>
                    <div>
                        <h3 class="font-semibold text-gray-900">${skill.user}</h3>
                        <div class="flex items-center space-x-1">
                            <span class="text-yellow-400">⭐</span>
                            <span class="text-sm text-gray-600">${skill.userRating}</span>
                            <span class="text-sm text-gray-400">• ${skill.location}</span>
                        </div>
                    </div>
                </div>
                <span class="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">
                    ${getCategoryIcon(skill.category)} ${skill.category}
                </span>
            </div>
            
            <h4 class="font-semibold text-lg mb-2">${skill.skill}</h4>
            <p class="text-gray-600 text-sm mb-4">${skill.description}</p>
            
            <div class="bg-gray-50 rounded-lg p-3 mb-4">
                <p class="text-sm text-gray-700"><strong>Looking for:</strong> ${skill.wants}</p>
            </div>
            
            <button onclick="openTradeModal(${skill.id})" class="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium">
                Request Trade
            </button>
        </div>
    `).join('');
}

function renderMySkills() {
    const mySkillsList = document.getElementById('mySkillsList');
    mySkillsList.innerHTML = userSkills.map(skill => `
        <div class="border border-gray-200 rounded-lg p-4">
            <div class="flex justify-between items-start">
                <div class="flex-1">
                    <h4 class="font-semibold">${skill.skill}</h4>
                    <p class="text-sm text-gray-600 mt-1">${skill.description}</p>
                    <p class="text-sm text-purple-600 mt-2"><strong>Looking for:</strong> ${skill.wants}</p>
                </div>
                <span class="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                    ${getCategoryIcon(skill.category)} ${skill.category}
                </span>
            </div>
        </div>
    `).join('');
}

function renderMatches() {
    const matchesList = document.getElementById('matchesList');
    matchesList.innerHTML = matches.map(match => `
        <div class="border border-purple-200 rounded-lg p-4 bg-purple-50 match-pulse">
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                    <div class="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                        <span class="text-white font-semibold">${match.avatar}</span>
                    </div>
                    <div>
                        <h4 class="font-semibold">${match.user}</h4>
                        <p class="text-sm text-gray-600">⭐ ${match.userRating} rating</p>
                    </div>
                </div>
                <div class="text-right">
                    <div class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                        ${match.matchScore}% Match
                    </div>
                </div>
            </div>
            <div class="mt-4 bg-white rounded-lg p-3">
                <p class="text-sm"><strong>They offer:</strong> ${match.skill}</p>
                <p class="text-sm"><strong>You offer:</strong> ${match.yourSkill}</p>
            </div>
            <button onclick="openTradeModal(${getSkillIdByUser(match.user)})" class="w-full mt-3 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
                Send Trade Request
            </button>
        </div>
    `).join('');
}

function renderActiveTrades() {
    const tradesList = document.getElementById('tradesList');
    tradesList.innerHTML = activeTrades.map(trade => `
        <div class="border border-gray-200 rounded-lg p-4">
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                    <div class="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                        <span class="text-white font-semibold">${trade.avatar}</span>
                    </div>
                    <div>
                        <h4 class="font-semibold">${trade.user}</h4>
                        <p class="text-sm text-gray-600">${trade.userSkill} ↔️ ${trade.yourSkill}</p>
                    </div>
                </div>
                <div class="text-right">
                    <span class="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                        ${trade.status}
                    </span>
                    <p class="text-sm text-gray-600 mt-1">Next: ${trade.nextSession}</p>
                </div>
            </div>
            <div class="mt-3 flex space-x-2">
                <button class="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    Message
                </button>
                <button class="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors text-sm">
                    Complete Session
                </button>
            </div>
        </div>
    `).join('');
}

function getCategoryIcon(category) {
    const icons = {
        music: '🎵',
        tech: '💻',
        art: '🎨',
        fitness: '💪',
        cooking: '🍳',
        language: '🗣️',
        home: '🏠'
    };
    return icons[category] || '📚';
}

function getSkillIdByUser(userName) {
    const skill = skills.find(s => s.user === userName);
    return skill ? skill.id : 1;
}

function openTradeModal(skillId) {
    const skill = skills.find(s => s.id === skillId);
    if (!skill) return;

    document.getElementById('tradeDetails').innerHTML = `
        <div class="bg-gray-50 rounded-lg p-3">
            <p class="font-medium">${skill.user} offers: ${skill.skill}</p>
            <p class="text-sm text-gray-600 mt-1">${skill.description}</p>
            <p class="text-sm text-purple-600 mt-2">They want: ${skill.wants}</p>
        </div>
    `;

    const offerSkill = document.getElementById('offerSkill');
    offerSkill.innerHTML = '<option value="">Select a skill...</option>' + 
        userSkills.map(skill => `<option value="${skill.skill}">${skill.skill}</option>`).join('');

    tradeModal.classList.remove('hidden');
    tradeModal.classList.add('flex');
}

// Modal event listeners
document.getElementById('cancelTrade').addEventListener('click', () => {
    tradeModal.classList.add('hidden');
    tradeModal.classList.remove('flex');
});

document.getElementById('sendTradeRequest').addEventListener('click', () => {
    const offerSkill = document.getElementById('offerSkill').value;
    const message = document.getElementById('tradeMessage').value;
    
    if (!offerSkill) {
        alert('Please select a skill to offer!');
        return;
    }
    
    alert('Trade request sent! 🎉\n\nYou\'ll be notified when they respond.');
    tradeModal.classList.add('hidden');
    tradeModal.classList.remove('flex');
});

// Add skill functionality
document.getElementById('addSkillBtn').addEventListener('click', () => {
    addSkillModal.classList.remove('hidden');
    addSkillModal.classList.add('flex');
});

document.getElementById('cancelAddSkill').addEventListener('click', () => {
    addSkillModal.classList.add('hidden');
    addSkillModal.classList.remove('flex');
});

document.getElementById('saveNewSkill').addEventListener('click', () => {
    const name = document.getElementById('newSkillName').value;
    const category = document.getElementById('newSkillCategory').value;
    const description = document.getElementById('newSkillDesc').value;
    const wants = document.getElementById('newSkillWant').value;
    
    if (!name || !description || !wants) {
        alert('Please fill in all required fields!');
        return;
    }
    
    userSkills.push({
        skill: name,
        category: category,
        description: description,
        wants: wants
    });
    
    renderMySkills();
    addSkillModal.classList.add('hidden');
    addSkillModal.classList.remove('flex');
    
    // Clear form
    document.getElementById('newSkillName').value = '';
    document.getElementById('newSkillDesc').value = '';
    document.getElementById('newSkillWant').value = '';
    
    alert('Skill added successfully! 🎉');
});

// Close modals when clicking outside
[tradeModal, addSkillModal].forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }
    });
}); 