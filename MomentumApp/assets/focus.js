/*/toggle display function/*/

function isDisplayed(container) {
    if (container.style.display === "none") {
        container.style.display = "block";
    } else {
        container.style.display = "none";
        container.style.display = "none";
        container.style.display = "none";
    }
}

/*/greet user section/*/

function greeting() {
    //automatically updates time
    setInterval(timeNowCenter, 1000);
    const centerTime = document.getElementById('center-time');

    function timeNowCenter() {
        //gets current time in 12 hour format
        let now = new Date();
        const currentTime = new Intl.DateTimeFormat('default',
            {
                hour12: true,
                hour: 'numeric',
                minute: 'numeric'
            }).format(now);
        //places current time in div to display on web
        centerTime.textContent = currentTime;
        //greets user depending on time of day
        let dayOrNightValue = document.getElementById('timeOfDay');
        let dayOrNight = centerTime.innerHTML[centerTime.innerHTML.length - 2];
        let afternoonOrnight = Number(centerTime.innerHTML[0] + centerTime.innerHTML[1]);
        //if time is AM, good morning
        if (dayOrNight === 'A') {
            dayOrNightValue.innerText = 'morning';
            //if time is 1pm - 5:59pm, good afternoon
        } else if (afternoonOrnight < 6) {
            dayOrNightValue.innerText = 'afternoon';
            //if time is 6pm - 11:59pm, good evening
        } else {
            dayOrNightValue.innerText = 'evening';
        }
    };
}

greeting();

//gets user's name from form

window.addEventListener('load', () => {
    let params = (new URL(document.location)).searchParams;
    const name = params.get('name');
    //display user's name
    document.getElementById('name-input').textContent = name;
})

//creates option to edit user's name
const username = document.getElementById('name-input');
const editNameBtn = document.getElementById('edit-name');
const editIcon = document.getElementById('edit-name-icon');
//makes name editable on edit button click or enter key is pressed
editNameBtn.addEventListener('click', editName);
username.addEventListener('keyup', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        editNameBtn.click();
    }
})

function editName() {
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

}

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
    //creates div to contain checkbox and label
    const focusItem = document.createElement('div');
    focusItem.id = 'focus-item';
    //gets user's focus input value and store in variable
    const focusInputValue = focusInput.value;
    const focusCheckbox = document.createElement('input');
    //creates a checkbox
    focusCheckbox.type = 'checkbox';
    focusCheckbox.id = 'main-focus';
    //creates a label that links to checkbox
    const toFocus = document.createElement('label');
    toFocus.setAttribute('for', 'main-focus');
    toFocus.id = 'main-focus-text';
    //clears text input field when input is submitted
    focusInput.value = "";
    //sets checkbox label to user's focus input (display user's focus)
    toFocus.textContent = focusInputValue;
    //places checkbox and label in the div
    focusItem.appendChild(focusCheckbox);
    focusItem.appendChild(toFocus);
    //places the div in its container
    focusList.appendChild(focusItem);
    //removes text input field and change it to 'today's focus'
    focusInput.style.display = "none";
    addFocus.style.display = "none";
    document.querySelector('h2').innerText = "TODAY'S FOCUS:"
    //creates a remove focus button
    const removeFocusBtn = document.createElement('button');
    removeFocusBtn.id = 'remove-focus';
    removeFocusBtn.innerHTML = '<i class="fa fa-trash"></i>';
    //places remove button in label
    toFocus.appendChild(removeFocusBtn);
    //when remove button is clicked, removes user's focus then displays text input and asks focus question
    removeFocusBtn.addEventListener('click', () => {
        focusItem.remove();
        focusInput.style.display = "block";
        addFocus.style.display = "block";
        document.querySelector('h2').innerText = "What is your main focus for today?"
    });
}

/*/user's todo list section/*/

//displays todo container when todo button is clicked
const toDoBtn = document.getElementById('todoButton');
const toDoContainer = document.getElementById('todoContainer');
toDoBtn.addEventListener('click', showToDoContainer);

function showToDoContainer() {
    isDisplayed(toDoContainer);
};

//generates todo list

//stores user's todos in an array
let TodoList = [];
//dislays todo when add(+) button is clicked or enter key is pressed
const addTodoBtn = document.querySelector('#add-todoButton');
const newTodoInput = document.getElementById('todoInput');
addTodoBtn.addEventListener('click', todo);
const todoList = document.getElementById('todo-list');
newTodoInput.addEventListener('keyup', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        addTodoBtn.click();
    }
})

function todo(newTodo, index) {
    //gets user's input
    newTodo = document.getElementById('todoInput').value;
    let todoItem = document.createElement('div');
    //creates a div to contain checkbox and label
    todoItem.classList.add('todoItem');
    const todoCheckbox = document.createElement('input');
    //creates checkbox
    todoCheckbox.type = 'checkbox';
    todoCheckbox.classList.add('todoCheck');
    //creates label
    let todo = document.createElement('label');
    todo.classList.add('todo-text');
    //clears input field when new todo is created
    todoInput.value = "";
    //sets checkbox label to user's todo input (display new todo)
    todo.textContent = newTodo;
    //adds new todo to array
    TodoList.push(newTodo);
    //links label to checkbox
    index = TodoList.indexOf(newTodo);
    todoCheckbox.setAttribute('id', `check${index}`);
    todo.setAttribute('for', `check${index}`);
    //creates remove button
    const removeBtn = document.createElement('button');
    removeBtn.classList.add('remove-todo');
    removeBtn.innerHTML = '<i class="fa fa-trash"></i>';
    //places remove button in label
    todo.appendChild(removeBtn);
    //places checkbox and label in div
    todoItem.appendChild(todoCheckbox);
    todoItem.appendChild(todo);
    //places div in its container
    todoList.appendChild(todoItem);
    //deletes todo and remove from array
    removeBtn.addEventListener('click', () => {
        todoItem.remove();
        TodoList.splice(TodoList.indexOf(newTodo), 1);
    });
}

/*/user's quotes section/*/

//stores quotes in array
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

//displays a random quote when button is clicked
const shuffleBtn = document.getElementById('shuffleButton');
shuffleBtn.addEventListener('click', getRandQuote);

function getRandQuote() {
    const quote = document.querySelector('#random-quote');
    const author = document.querySelector('#author');
    //generates a random number (from length of array)
    let index = Math.floor(Math.random() * quotes.length);
    //gets a random quote from array
    let randQuote = quotes[index].quote;
    //gets the author of the quote
    let randAuthor = quotes[index].author;
    //displays quote and author
    quote.innerHTML = randQuote;
    author.innerHTML = `- ${randAuthor}`;
};

//displays quote options: add quote or show quotes
const quoteContainer = document.getElementById("quote-list-container");
const quoteBtn = document.querySelector('.quote');
quoteBtn.addEventListener('click', showQuotesOptions);

function showQuotesOptions() {
    isDisplayed(quoteContainer);
}

//displays add new quote container when 'add new quote' button is clicked
const addQuoteContainer = document.getElementById('add-quote-container')
const addOption = document.querySelector('#add-quote-option');
addOption.addEventListener('click', showAddQuoteContainer);

function showAddQuoteContainer() {
    if (addQuoteContainer.style.display === "none") {
        addQuoteContainer.style.display = "flex";
        //hides show quotes container if shown
        showQuoteContainer.style.display = "none";
    } else {
        addQuoteContainer.style.display = "none";
    }
}

//displays show quotes container when 'show all quotes' button is clicked
const showQuoteContainer = document.getElementById('show-quote-container')
const quoteList = document.getElementById('quote-list');
const showOption = document.querySelector('#show-quote-option');
showOption.addEventListener('click', showQuotesContainer);

function showQuotesContainer() {
    if (showQuoteContainer.style.display === "none") {
        showQuoteContainer.style.display = "flex";
        //hides add new quote container if shown
        addQuoteContainer.style.display = "none";
    } else {
        showQuoteContainer.style.display = "none";
    }
}

//adds new quote to array when add(+) button is clicked or enter key is pressed
const newQuoteBtn = document.querySelector('#add-new-quote-button');
newQuoteBtn.addEventListener('click', addToQuotes);
let newQuote = document.getElementById('new-quote-input');
let newAuthor = document.getElementById('new-author-input');

function addToQuotes(event) {
    event.preventDefault();
    const quoteObject = {};
    //stores author and quote input values in object
    quoteObject.author = newAuthor.value;
    quoteObject.quote = newQuote.value;
    //adds new quote and author to end of quote array
    quotes.push(quoteObject);
    //creates a div
    const newQuoteContainer = document.createElement('div');
    newQuoteContainer.classList.add('quote-item-container');
    //creates a paragraph
    const newQuoteItem = document.createElement('p');
    newQuoteItem.classList.add('quote-item');
    //creates a button to add new quotes
    const newQuoteItemBtn = document.createElement('button');
    newQuoteItemBtn.classList.add('remove-quote');
    newQuoteItemBtn.innerHTML = '<i class="fa fa-trash"></i>';
    //places div in quote container
    quoteList.appendChild(newQuoteContainer)
    //places quote and author in paragraph
    newQuoteContainer.appendChild(newQuoteItem);
    newQuoteContainer.appendChild(newQuoteItemBtn);
    //sets how quote and author is displayed
    newQuoteItem.textContent = (`"${quoteObject.quote}" - ${quoteObject.author}`);
    //clears input fields when new quote is added
    newQuote.value = "";
    newAuthor.value = "";
    //removes new quote when remove button is clicked
    newQuoteItemBtn.addEventListener('click', () => {
        newQuoteContainer.remove();
        quotes.splice(quotes.indexOf(newQuoteItem), 1);
    });
    //shows new quote is added to current quotes list
    showQuotesContainer();
}

//displays current quotes list in container 
function displayQuotes() {
    //loops over each quote and author and displays it
    for (let i = 0; i < quotes.length; i++) {
        //creates a div
        const quoteItemContainer = document.createElement('div');
        quoteItemContainer.classList.add('quote-item-container');
        //creates a paragraph
        const quoteItem = document.createElement('p');
        quoteItem.classList.add('quote-item');
        //creates remove quote button
        const quoteItemBtn = document.createElement('button');
        quoteItemBtn.classList.add('remove-quote');
        quoteItemBtn.innerHTML = '<i class="fa fa-trash"></i>';
        //sets how each quote and author is displaued
        let quoteText = quotes[i].quote;
        let authorText = quotes[i].author;
        quoteItem.textContent = (`"${quoteText}" - ${authorText}`);
        quoteList.appendChild(quoteItemContainer);
        quoteItemContainer.appendChild(quoteItem);
        quoteItemContainer.appendChild(quoteItemBtn);
        //removes quote and author
        quoteItemBtn.addEventListener('click', () => {
            //removes from display
            quoteItemContainer.remove();
            //removes in array
            quotes.splice(quotes.indexOf(quoteItem), 1);
        })
    };
}

displayQuotes();

