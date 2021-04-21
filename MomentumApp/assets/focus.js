//time
setInterval(timeNowCenter, 1000);

function timeNowCenter() {
    const centerTime = document.getElementById('center-time');
    let now = new Date();
    const currentTime = new Intl.DateTimeFormat('default',
        {
            hour12: true,
            hour: 'numeric',
            minute: 'numeric'
        }).format(now);
    centerTime.innerHTML = currentTime;
}


// greeting

function greeting() {
    let dayOrNightValue = document.getElementById('timeOfDay');
    let dayOrNight = centerTime.innerHTML[centerTime.innerHTML.length - 2];
    if (dayOrNight === 'A') {
        dayOrNightValue.innerText = 'morning';
    } else if (centerTime.innerHTML[0] === '1') {
        if (centerTime.innerHTML[1] < 2) {
            dayOrNightValue.innerText = 'evening';
        } else {
            dayOrNightValue.innerText = 'afternoon';
        }
    } else if (centerTime.innerHTML[0] < 6) {
        dayOrNightValue.innerText = 'afternoon'
    } else {
        dayOrNightValue.innerText = 'evening';
    }
}
greeting();

const focusList = document.getElementById('focus-list');
const addFocus = document.getElementById('addFocus');

addFocus.addEventListener('click', createFocusList);

function createFocusList() {
    const focusItem = document.createElement('div');
    const focusInput = document.getElementById('focus-input');
    const focusInputValue = focusInput.value;
    const focusCheckbox = document.createElement('input');
    focusCheckbox.type = 'checkbox';
    focusCheckbox.id = 'main-focus';
    const toFocus = document.createElement('label');
    toFocus.setAttribute('for', 'main-focus');
    toFocus.id = 'main-focus-text';
    focusInput.value = "";
    toFocus.innerHTML = focusInputValue;
    focusItem.appendChild(focusCheckbox);
    focusItem.appendChild(toFocus);
    focusList.appendChild(focusItem);
    focusInput.style.display = "none";
    addFocus.style.display = "none";
    document.querySelector('h2').innerHTML = "TODAY'S FOCUS:"
}

// quote 

let quotes = [
    {
        author: "Bren&eacute; Brown",
        quote: "One day you will tell your story of how you overcame what you went through and it will be someone else's surival guide"
    },
    {
        author: "F.Scott Fitzgerald",
        quote: "The world only exists in your eyes. You can make it as big or as small as you want."
    },
    {
        author: "Ferris Bueller",
        quote: "Life moves pretty fast. If you don't stop and look around once in a while, you could miss it."
    }
]

const shuffleBtn = document.getElementById('shuffleButton');

shuffleBtn.addEventListener('click', getRandQuote);

function getRandQuote() {
    const quote = document.querySelector('#random-quote');
    const author = document.querySelector('#author');
    let index = Math.floor(Math.random() * quotes.length);
    let randQuote = quotes[index].quote;
    let randAuthor = quotes[index].author;
    quote.innerHTML = randQuote;
    author.innerHTML = `- ${randAuthor}`;
};

// quote container
const quoteContainer = document.getElementById("quote-list-container");
const quoteBtn = document.querySelector('.quote');
quoteBtn.addEventListener('click', showQuotesOptions);

function showQuotesOptions() {
    if (quoteContainer.style.display === "none") {
        quoteContainer.style.display = "block";
    } else {
        quoteContainer.style.display = "none";
        addQuoteContainer.style.display = "none";
        showQuoteContainer.style.display = "none";
    }
}

//add quote option
const addQuoteContainer = document.getElementById('add-quote-container')
const addOption = document.querySelector('#add-quote-option');
addOption.addEventListener('click', showAddQuoteContainer);

function showAddQuoteContainer() {
    if (addQuoteContainer.style.display === "none") {
        addQuoteContainer.style.display = "flex";
        showQuoteContainer.style.display = "none";
    } else {
        addQuoteContainer.style.display = "none";
    }
}

//show quotes option

const showQuoteContainer = document.getElementById('show-quote-container')
const quoteList = document.getElementById('quote-list');
const showOption = document.querySelector('#show-quote-option');
showOption.addEventListener('click', showQuotesContainer);

function showQuotesContainer() {
    if (showQuoteContainer.style.display === "none") {
        showQuoteContainer.style.display = "flex";
        addQuoteContainer.style.display = "none";
    } else {
        showQuoteContainer.style.display = "none";
    }
}


//add new quote to array
const newQuoteBtn = document.querySelector('#add-new-quote-button');
newQuoteBtn.addEventListener('click', addToQuotes);
let newQuote = document.getElementById('new-quote-input');
let newAuthor = document.getElementById('new-author-input');

function addToQuotes(event) {
    event.preventDefault();
    const quoteObject = {};
    quoteObject.author = newAuthor.value;
    quoteObject.quote = newQuote.value;
    quotes.push(quoteObject);
    const newQuoteItem = document.createElement('p');
    newQuoteItem.classList.add('quote-item');
    newQuoteItem.innerHTML = (`"${quoteObject.quote}" - ${quoteObject.author}`);
    quoteList.appendChild(newQuoteItem);
    newQuote.value = "";
    newAuthor.value = "";
    showQuotesContainer();
}

//place quotes in container

function displayQuotes() {
    for (let i = 0; i < quotes.length; i++) {
        const quoteItem = document.createElement('p');
        quoteItem.classList.add('quote-item');
        let quoteText = quotes[i].quote;
        let authorText = quotes[i].author;
        quoteItem.innerHTML = (`"${quoteText}" - ${authorText}`);
        quoteList.appendChild(quoteItem);
    };
}
displayQuotes();