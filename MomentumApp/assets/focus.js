
//greeting

function greeting() {
    //time
    setInterval(timeNowCenter, 1000);
    const centerTime = document.getElementById('center-time');

    function timeNowCenter() {
        let now = new Date();
        const currentTime = new Intl.DateTimeFormat('default',
            {
                hour12: true,
                hour: 'numeric',
                minute: 'numeric'
            }).format(now);
        centerTime.innerHTML = currentTime;
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
    };
}
greeting();

//name

window.addEventListener('load', () => {
    let params = (new URL(document.location)).searchParams;
    const name = params.get('name');
    document.getElementById('name-input').innerHTML = name;
})

const username = document.getElementById('name-input');
const editNameBtn = document.getElementById('edit-name');
const editIcon = document.getElementById('edit-name-icon');
editNameBtn.addEventListener('click', editName);

function editName() {
    if (username.isContentEditable) {
        username.contentEditable = 'false';
        editIcon.classList.remove('fa-check-square');
        editIcon.classList.add('fa-edit');
    } else {
        username.contentEditable = 'true';
        editIcon.classList.remove('fa-edit');
        editIcon.classList.add('fa-check-square');
    };

}

//focus

const focusList = document.getElementById('focus-list');
const addFocus = document.getElementById('addFocus');

addFocus.addEventListener('click', createFocusList);

function createFocusList() {
    const focusItem = document.createElement('div');
    focusItem.id = 'focus-item';
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
    //remove focus
    const removeFocusBtn = document.createElement('button');
    removeFocusBtn.id = 'remove-focus';
    removeFocusBtn.innerHTML = '<i class="fa fa-trash"></i>';
    toFocus.appendChild(removeFocusBtn);
    removeFocusBtn.addEventListener('click', () => {
        focusItem.remove();
        focusInput.style.display = "block";
        addFocus.style.display = "block";
        document.querySelector('h2').innerHTML = "What is your main focus for today?"
    });
}

//display todo container
const toDoBtn = document.getElementById('todoButton');
const toDoContainer = document.getElementById('todoContainer');
toDoBtn.addEventListener('click', showToDoContainer);

function showToDoContainer() {
    if (toDoContainer.style.display === "none") {
        toDoContainer.style.display = "block";
    } else {
        toDoContainer.style.display = "none";
        toDoContainer.style.display = "none";
        toDoContainer.style.display = "none";
    }
};

//todo list

let TodoList = [];
const addTodoBtn = document.querySelector('#add-todoButton');
addTodoBtn.addEventListener('click', todo);
const todoList = document.getElementById('todo-list')

function todo(newTodo, index) {
    //add new todo
    newTodo = document.getElementById('todoInput').value;
    let todoItem = document.createElement('div');
    todoItem.classList.add('todoItem');
    const todoCheckbox = document.createElement('input');
    todoCheckbox.type = 'checkbox';
    todoCheckbox.classList.add('todoCheck');
    let todo = document.createElement('label');
    todo.classList.add('todo-text');
    todoInput.value = "";
    todo.innerHTML = newTodo;
    //add new todo to array
    TodoList.push(newTodo);
    //item link to checkbox
    index = TodoList.indexOf(newTodo);
    todoCheckbox.setAttribute('id', `check${index}`);
    todo.setAttribute('for', `check${index}`);
    // create remove button
    const removeBtn = document.createElement('button');
    removeBtn.classList.add('remove-todo');
    removeBtn.innerHTML = '<i class="fa fa-trash"></i>';
    todo.appendChild(removeBtn);
    todoItem.appendChild(todoCheckbox);
    todoItem.appendChild(todo);
    todoList.appendChild(todoItem);
    //delete todo and remove from array
    removeBtn.addEventListener('click', () => {
        todoItem.remove();
        TodoList.splice(TodoList.indexOf(newTodo), 1);
    });
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
    const newQuoteContainer = document.createElement('div');
    newQuoteContainer.classList.add('quote-item-container');
    const newQuoteItem = document.createElement('p');
    newQuoteItem.classList.add('quote-item');
    const newQuoteItemBtn = document.createElement('button');
    newQuoteItemBtn.classList.add('remove-quote');
    newQuoteItemBtn.innerHTML = '<i class="fa fa-trash"></i>';
    quoteList.appendChild(newQuoteContainer)
    newQuoteContainer.appendChild(newQuoteItem);
    newQuoteContainer.appendChild(newQuoteItemBtn);
    newQuoteItem.innerHTML = (`"${quoteObject.quote}" - ${quoteObject.author}`);
    newQuote.value = "";
    newAuthor.value = "";
    //remove new quote
    newQuoteItemBtn.addEventListener('click', () => {
        newQuoteContainer.remove();
        quotes.splice(quotes.indexOf(newQuoteItem), 1);
    });
    showQuotesContainer();
}

//place quotes in container

function displayQuotes() {
    for (let i = 0; i < quotes.length; i++) {
        const quoteItemContainer = document.createElement('div');
        quoteItemContainer.classList.add('quote-item-container');
        const quoteItem = document.createElement('p');
        quoteItem.classList.add('quote-item');
        const quoteItemBtn = document.createElement('button');
        quoteItemBtn.classList.add('remove-quote');
        quoteItemBtn.innerHTML = '<i class="fa fa-trash"></i>';
        let quoteText = quotes[i].quote;
        let authorText = quotes[i].author;
        quoteItem.innerHTML = (`"${quoteText}" - ${authorText}`);
        quoteList.appendChild(quoteItemContainer);
        quoteItemContainer.appendChild(quoteItem);
        quoteItemContainer.appendChild(quoteItemBtn);
        //remove quote
        quoteItemBtn.addEventListener('click', () => {
            quoteItemContainer.remove();
            quotes.splice(quotes.indexOf(quoteItem), 1);
        })
    };
}

displayQuotes();

