/*/toggle display function/*/

function isDisplayedFlex(container) {
    if (container.style.display === "none") {
        container.style.display = "flex";
    } else {
        container.style.display = "none";
    }
}

/*/greet user section/*/

(async function greeting() {
    const centerTime = document.getElementById('center-time');
    //automatically updates time
    setInterval(timeNowCenter, 1000);
    function timeNowCenter() {
        //gets current time in 12 hour format
        let now = new Date();
        const currentTime = new Intl.DateTimeFormat('default',
            {
                hour12: true,
                hour: 'numeric',
                minute: 'numeric'
            }).format(now);
        centerTime.textContent = currentTime;
        //greets user depending on time of day
        let dayOrNightValue = document.getElementById('timeOfDay');
        let dayOrNight = centerTime.innerHTML[centerTime.innerHTML.length - 2];
        if (dayOrNight === 'A') {
            dayOrNightValue.innerText = 'Good morning,';
        } else if (centerTime.innerHTML[0] === '1') {
            if (centerTime.innerHTML[1] < 2) {
                dayOrNightValue.innerText = 'Good evening,';
            } else {
                dayOrNightValue.innerText = 'Good afternoon,';
            }
        } else if (centerTime.innerHTML[0] < 6) {
            dayOrNightValue.innerText = 'Good afternoon,'
        } else {
            dayOrNightValue.innerText = 'Good evening,';
        }
    }
}());

//gets user's name from form
setTimeout(getUserName, 1000);
function getUserName() {
    let params = (new URL(document.location)).searchParams;
    const name = params.get('name');
    //display user's name
    const nameInput = document.getElementById('name-input');
    nameInput.textContent = name;
    let editbtn = document.createElement('button');
    editbtn.id = 'edit-name';
    editbtn.innerHTML = '<i id="edit-name-icon" class="fa fa-edit"></i>';
    insertAfter(editbtn, nameInput);
}

function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}
//creates option to edit user's name
const username = document.getElementById('name-input');

//makes name editable on edit button click or enter key is pressed
username.addEventListener('keyup', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        editNameBtn.click();
    }
})

setTimeout(editName, 1000);
function editName() {
    const editIcon = document.getElementById('edit-name-icon');
    const editNameBtn = document.getElementById('edit-name');
    editNameBtn.addEventListener('click', () => {
        //if name is editable, disables it and changes button icon
        if (username.isContentEditable) {
            username.contentEditable = 'false';
            editIcon.classList.toggle('fa-check-square');
            editIcon.classList.toggle('fa-edit');
            //if name is not editable, enables it and changes button icon
        } else {
            username.contentEditable = 'true';
            editIcon.classList.toggle('fa-edit');
            editIcon.classList.toggle('fa-check-square');
        };
    })
}
setTimeout(() => {
    document.getElementById('focus-section').style.display = 'block';
}, 1000);

/*/user's focus section/*/

const focusList = document.getElementById('focus-list');
const addFocus = document.getElementById('addFocus');
const focusInput = document.getElementById('focus-input');
//shows user's focus when add(+) button is clicked or enter key is pressed
addFocus.addEventListener('click', createFocusList);
focusInput.addEventListener('keyup', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        addFocus.click();
    }
})

function createFocusList() {
    //gets user's focus input value and store in variable
    const focusInputValue = focusInput.value;
    //creates div to contain checkbox and label
    const focusItem = document.createElement('div');
    focusItem.id = 'focus-item';
    focusItem.innerHTML =
        `<input type="checkbox" id="main-focus">
    <label for="main-focus" id="main-focus-text">${focusInputValue}
        <button id="remove-focus">
            <i class="fa fa-trash"></i>
        </button>
    </label>`;
    focusInput.value = "";
    focusInput.style.display = "none";
    addFocus.style.display = "none";
    document.querySelector('h2').innerText = "TODAY'S FOCUS:";
    focusList.appendChild(focusItem);
    //remove focus item on trash icon click
    (removeItem => {
        document.getElementById('remove-focus').addEventListener('click', () => {
            focusItem.remove();
            focusInput.style.display = "block";
            addFocus.style.display = "block";
            document.querySelector('h2').innerText = "What is your main focus for today?"
        });
    })();
}


//* todo list section 

//displays todo container when todo button is clicked
const toDoBtn = document.getElementById('todoButton');
const toDoContainer = document.getElementById('todoContainer');
toDoBtn.addEventListener('click', showToDoContainer);

function showToDoContainer() {
    if (toDoContainer.style.display === "none") {
        toDoContainer.style.display = "block";
    } else {
        toDoContainer.style.display = "none";
    }
};

//stores user's todos in an array
//dislays todo when add(+) button is clicked or enter key is pressed
let TodoList = [];
const addTodoBtn = document.querySelector('#add-todoButton');
const newTodoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todo-list');

addTodoBtn.addEventListener('click', addTodo);
newTodoInput.addEventListener('keyup', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        addTodoBtn.click();
    }
})

//create container for each new todo
function addTodo() {
    const todoItem = document.createElement('div');
    todoItem.className = 'todoItem';
    let newTodo = document.getElementById('todoInput');
    todoItem.innerHTML =
        `<input type="checkbox" id="${newTodo.value}" class="todoCheck">
        <label for="${newTodo.value}" class="todo-text">${newTodo.value}</label>
        <button>
                <i class="fa fa-trash remove"></i>
        </button>`;
    newTodo.value = "";
    todoList.appendChild(todoItem);
}

//*quotes section 

let quotesArr = [
    {
        author: "Brene Brown",
        quote: "One day you will tell your story of how you overcame what you went through and it will be someone else's surival guide"
    },
    {
        author: "F.Scott Fitzgerald",
        quote: "The world only exists in your eyes. You can make it as big or as small as you want."
    },
    {
        author: "Ferris Bueller",
        quote: "Life moves pretty fast. If you don't stop and look around once in a while, you could miss it."
    },
    {
        author: "Eleanor Roosevelt",
        quote: "Do one thing everyday that scares you."
    },
    {
        author: "Anonymous",
        quote: "Do something today that your future self will thank you for."
    },
    {
        author: "Oprah",
        quote: "Turn your wounds into wisdom."
    }
]

//displays a random quote when shuffle button is clicked
const shuffleBtn = document.getElementById('shuffleButton');
shuffleBtn.addEventListener('click', getRandQuote);

function getRandQuote() {
    const quote = document.querySelector('#random-quote');
    const author = document.querySelector('#author');
    //generates a random number (from length of array)
    let index = Math.floor(Math.random() * quotesArr.length);
    //gets random quote and author from array and displays it on page
    let randQuote = quotesArr[index].quote;
    let randAuthor = quotesArr[index].author;
    quote.innerHTML = randQuote;
    author.innerHTML = `- ${randAuthor}`;
};

//displays quote options: add quote or show quotes
const quoteContainer = document.getElementById("quote-list-container");
const quoteBtn = document.querySelector('.quote');
quoteBtn.addEventListener('click', () => {
    isDisplayedFlex(quoteContainer);
    addQuoteContainer.style.display = 'none';
    showQuoteContainer.style.display = 'none';
});

//displays add new quote container when 'add new quote' button is clicked
const addQuoteContainer = document.getElementById('add-quote-container')
const addOption = document.querySelector('#add-quote-option');
addOption.addEventListener('click', showAddQuoteContainer);

function showAddQuoteContainer() {
    isDisplayedFlex(addQuoteContainer);
    showQuoteContainer.style.display = 'none';
}

//displays show quotes container when 'show all quotes' button is clicked
const showQuoteContainer = document.getElementById('show-quote-container')
const quoteList = document.getElementById('quote-list');
const showOption = document.querySelector('#show-quote-option');
showOption.addEventListener('click', showQuotesContainer);

function showQuotesContainer() {
    isDisplayedFlex(showQuoteContainer);
    addQuoteContainer.style.display = 'none';
}

//adds new quote to array when add(+) button is clicked or enter key is pressed
const newQuoteBtn = document.querySelector('#add-new-quote-button');
newQuoteBtn.addEventListener('click', addToQuotes);
let newQuote = document.getElementById('new-quote-input');
let newAuthor = document.getElementById('new-author-input');

//adds new quote and author to quote array, display new quote in quotes list
function addToQuotes(e) {
    e.preventDefault();
    const quoteObject = {};
    quoteObject.author = newAuthor.value;
    quoteObject.quote = newQuote.value;
    quotesArr.push(quoteObject);
    const newQuoteContainer = createQuoteItem(newQuote.value, newAuthor.value);
    quoteList.appendChild(newQuoteContainer);
    newQuote.value = "";
    newAuthor.value = "";
    showQuotesContainer();
}

// displays current quotes list in container 
(function displayQuotes() {
    //loops over each quote and author and displays it
    for (let i = 0; i < quotesArr.length; i++) {
        const quoteItemContainer = createQuoteItem(quotesArr[i].quote, quotesArr[i].author);
        quoteList.appendChild(quoteItemContainer);
    };
}())

function createQuoteItem(quote, author) {
    const quoteContainer = document.createElement('div');
    quoteContainer.className = 'quote-item-container';
    quoteContainer.innerHTML =
        `<p class="quote-item">"${quote}" - ${author}</p>
        <button>
            <i class="fa fa-trash remove"></i>
        </button>`;
    return quoteContainer;
}

//remove todo item by traversing the DOM to remove its div container
todoList.addEventListener('click', removeItem);
showQuoteContainer.addEventListener('click', removeItem);

function removeItem(e) {
    if (e.target.classList.contains('remove')) {
        //container returns either todo Container or quotes container
        const listContainer = e.target.closest('div').parentElement;
        const itemContainer = e.target.closest('div');
        //remove quote from quotes array
        if (listContainer === quoteList) {
            const index = [...listContainer.children].indexOf(itemContainer);
            quotesArr.splice(index, 1);
        }
        itemContainer.remove();
    } else {
        return;
    }
}
