const logoBtn = document.querySelector('#logo');
const navBtn = document.querySelector('.nav-btn');
const navBar = document.querySelector('#navbar');
const projectsBtn = document.querySelectorAll('.projects-btn');

const homeSection = document.querySelector('#home');
const projectSection = document.querySelector('#projects');
const projectsList = document.querySelector('#projects-list');

for (let btn of projectsBtn) {
    btn.addEventListener('click', () => {
        hide([homeSection]);
        show([projectSection]);
        document.getElementById('header').style.boxShadow = '0px 0px 10px #cecdca';
    })
}

logoBtn.addEventListener('click', () => {
    hide([projectSection, aboutProjectContainer]);
    show([homeSection, projectsList]);
    document.getElementById('header').style.boxShadow = 'none';
})

show = elementsArr => {
    elementsArr.forEach(element => {
        element.classList.remove('hide');
    });
}
hide = elementsArr => {
    elementsArr.forEach(element => {
        element.classList.add('hide');
    });
}

class Project {
    constructor(title, image, code, site, skills = [], about) {
        this.title = title;
        this.image = image;
        this.code = code;
        this.site = site;
        this.skills = skills;
        this.about = about;
    }
}
const tributePage = new Project(
    'Tribute Page',
    './Portfolio/images/tributepage.png',
    'https://github.com/yvettetan/batch8-activities/tree/main/TributePage',
    'https://yvettetan.github.io/batch8-activities/TributePage/index.html',
    ['html5', 'css3'],
    'This page was created as a tribute to Saoirse Ronan. '
)
const SurveyForm = new Project(
    'Survey Form',
    './Portfolio/images/survey.png',
    'https://github.com/yvettetan/batch8-activities/tree/main/SurveyForm',
    'https://yvettetan.github.io/batch8-activities/SurveyForm/index.html',
    ['html5', 'css3']
)
const marineChessboard = new Project(
    'Marine Chessboard - flexbox',
    './Portfolio/images/chessboard-flex.png',
    'https://github.com/yvettetan/batch8-activities/tree/main/Chessboard-flexbox',
    'https://yvettetan.github.io/batch8-activities/Chessboard-flexbox/index.html',
    ['html5', 'css3']
)
const safariChessboard = new Project(
    'Safari Chessboard - grid',
    './Portfolio/images/chessboard-grid.png',
    'https://github.com/yvettetan/batch8-activities/tree/main/Chessboard-grid',
    'https://yvettetan.github.io/batch8-activities/Chessboard-grid/index.html',
    ['html5', 'css3']
)
const landingPage = new Project(
    'Product Landing Page',
    './Portfolio/images/landingpage.png',
    'https://github.com/yvettetan/batch8-activities/tree/main/LandingPage',
    'https://yvettetan.github.io/batch8-activities/LandingPage/index.html',
    ['html5', 'css3']
)
const momentum = new Project(
    'Momentum',
    './Portfolio/images/momentum.png',
    'https://github.com/yvettetan/batch8-activities/tree/main/MomentumApp',
    'https://yvettetan.github.io/batch8-activities/MomentumApp/index.html',
    ['html5', 'css3', 'Javascript']
)
const quizGame = new Project(
    'Quiz Game',
    './Portfolio/images/quizgame.png',
    'https://github.com/yvettetan/batch8-activities/tree/main/QuizGame',
    'https://yvettetan.github.io/batch8-activities/QuizGame/index.html',
)
const tictactoe = new Project(
    'Tic Tac Toe',
    './Portfolio/images/tictactoe.png',
    'https://github.com/yvettetan/batch8-activities/tree/main/TicTacToe',
    'https://yvettetan.github.io/batch8-activities/TicTacToe/index.html',
)
const bankBudget = new Project(
    'Bank & Budget Page',
    './Portfolio/images/bank.png',
    'https://github.com/yvettetan/batch8-activities/tree/main/BankApp',
    'https://yvettetan.github.io/batch8-activities/BankApp/login.html',
)

const scout = new Project(
    'Scout: Food Expiry Tracker',
    './Portfolio/images/scout.png',
    'https://github.com/yvettetan/batch8-activities/tree/main/Scout',
    'https://yvettetan.github.io/batch8-activities/Scout/index.html#',
)
const projectsArr = [tributePage, SurveyForm, marineChessboard, safariChessboard, landingPage, momentum, quizGame, tictactoe, bankBudget, scout];

projectsArr.forEach(project => {
    let projectContainer = document.createElement('div');
    projectContainer.className = 'project-container';
    projectContainer.innerHTML = `
                <h2 class="project-title">${project.title}</h2>
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title} image">
                </div>
                <div class="project-info">
                    <button class="project-info-btn project-details">view details</button>
                    <a class="project-links" href="${project.code}" target="_blank"><ion-icon name="code-slash-outline"></ion-icon>view code</a>
                    <a class="project-links" href="${project.site}" target="_blank"><ion-icon name="open-outline"></ion-icon>visit site</a>
                </div>`;
    projectsList.appendChild(projectContainer);
})
const projectDetailsBtn = document.querySelectorAll('.project-details');
for (let btn of projectDetailsBtn) {
    btn.addEventListener('click', () => {
        hide([projectsList]);
        show([aboutProjectContainer]);
        const projectTitle = btn.parentElement.closest('.project-container').firstElementChild.textContent;
        projectsArr.forEach(project => {
            if (project.title == projectTitle) {
                display_project_info(project);
            }
        })
    })
}
const aboutProjectContainer = document.querySelector('#about-project')
display_project_info = project => {
    aboutProjectContainer.innerHTML =
        `<ion-icon name="arrow-back-outline"></ion-icon>
        ${project.title}`;
}