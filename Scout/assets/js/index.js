//helper functions
capitalize = (words) => {
    wordsArr = words.split(' ');
    for (let i = 0; i < wordsArr.length; i++) {
        wordsArr[i] = wordsArr[i].charAt(0).toUpperCase() + wordsArr[i].slice(1);
    }
    capitalized = wordsArr.join(' ');
    return capitalized;
}

// nav buttons
const navProfileBtn = document.querySelector('#nav-profile');
const navRecipesBtn = document.querySelector('#nav-recipes');
const navFridgeBtn = document.querySelector('#nav-fridge');
const navCartBtn = document.querySelector('#nav-cart');
const navAddBtn = document.querySelector('#nav-add');
//section content
const profileContainer = document.querySelector('#profile');
const recipesContainer = document.querySelector('#recipes');
const fridgeContainer = document.querySelector('#fridge');
const groceryContainer = document.querySelector('#grocery-list');
const addItemContainer = document.querySelector('#add-item');
//general elements
const inputTexts = document.querySelectorAll('input[type=text]');
const inputNumbers = document.querySelectorAll('input[type=number]');
const selectOptions = document.querySelectorAll('select');
const inputDate = document.querySelectorAll('input[type=date]');

//toggle section displays
navProfileBtn.addEventListener('click', () => {
    nav_active(navProfileBtn);
    nav_inactive([navRecipesBtn, navFridgeBtn, navCartBtn, navAddBtn]);
    show([profileContainer]);
    hide([recipesContainer, fridgeContainer, groceryContainer, addItemContainer]);
})
navRecipesBtn.addEventListener('click', () => {
    nav_active(navRecipesBtn);
    nav_inactive([navProfileBtn, navFridgeBtn, navCartBtn, navAddBtn]);
    show([recipesContainer]);
    hide([profileContainer, fridgeContainer, groceryContainer, addItemContainer]);
})
navFridgeBtn.addEventListener('click', () => {
    nav_active(navFridgeBtn);
    nav_inactive([navProfileBtn, navRecipesBtn, navCartBtn, navAddBtn]);
    show([fridgeContainer]);
    hide([profileContainer, recipesContainer, groceryContainer, addItemContainer]);
})
navCartBtn.addEventListener('click', () => {
    nav_active(navCartBtn);
    nav_inactive([navProfileBtn, navRecipesBtn, navFridgeBtn, navAddBtn]);
    show([groceryContainer]);
    hide([profileContainer, recipesContainer, fridgeContainer, addItemContainer]);
})
navAddBtn.addEventListener('click', () => {
    nav_active(navAddBtn);
    nav_inactive([navProfileBtn, navRecipesBtn, navFridgeBtn, navCartBtn]);
    show([addItemContainer]);
    hide([profileContainer, recipesContainer, fridgeContainer, groceryContainer]);
})
nav_active = (element) => {
    element.classList.add('nav-active');
}
nav_inactive = elementsArr => {
    elementsArr.forEach(element => {
        element.classList.remove('nav-active');
    });
}
show = elementsArr => {
    // element.classList.remove('hide');
    elementsArr.forEach(element => {
        element.classList.remove('hide');
    });
}
hide = elementsArr => {
    elementsArr.forEach(element => {
        element.classList.add('hide');
    });
}
location_active = (element) => {
    element.classList.add('location-active');
}
location_inactive = elementsArr => {
    elementsArr.forEach(element => {
        element.classList.remove('location-active');
    });
}
//* PROFILE SECTON 
const about = document.querySelector('#about');
const dashboard = document.querySelector('#dashboard');
const tracker = document.querySelector('#tracker');
const expiry = document.querySelector('#expiry');
const tipsHeader = document.querySelector('#tips-header');

const weeklyTracker = document.querySelector('#weekly-tracker');
const dailyGoals = document.querySelectorAll('.daily-goal');

const allTipsBtn = document.querySelector('#all-tips-btn');
const allTips = document.querySelector('.all-tips');
const allTipsList = document.querySelector('#all-tips-list');
const backBtn = document.querySelector('#back-btn');

const foodWasteTips = [
    {
        title: 'Buy only what you need',
        description: 'Plan your meals. Make a grocery list and stick to it, and avoid impulse buys. Not only will you waste less food, you’ll also save money!'
    },
    {
        title: 'Store food wisely',
        description: 'Move older products to the front of your cupboard or fridge and new ones to the back. Use airtight containers to keep open food fresh in the fridge and ensure packets are closed to stop insects from getting in.'
    },
    {
        title: 'See beyond appearance',
        description: 'Oddly-shaped or bruised fruits and vegetables are often thrown away because they don’t meet arbitrary cosmetic standards. Don’t worry - they taste the same! Use mature fruit for smoothies, juices and desserts.'
    },
    {
        title: 'Love your leftovers',
        description: 'If you don’t eat everything you make, freeze it for later or use the leftovers as an ingredient in another meal.'
    },
    {
        title: 'Consider home composting',
        description: 'Two increasingly popular options are the bokashi system and worm composting. They sound scary but they’re really not. This way you are giving nutrients back to the soil and reducing your carbon footprint. '
    },
    {
        title: 'Sharing is caring',
        description: 'Donate or sell excess food that would otherwise be wasted. Connect with neighbours or local charities so surplus food can be shared, not thrown away.'
    }
]

allTipsBtn.addEventListener('click', () => {
    hide([about, tracker, expiry, tipsHeader]);
    show([allTips]);
    display_tips(foodWasteTips);
})

backBtn.addEventListener('click', () => {
    hide([allTips]);
    show([about, tracker, expiry, tipsHeader])
})

display_tips = tipsArr => {
    allTipsList.innerHTML = '';
    tipsArr.forEach(tip => {
        const div = document.createElement('div');
        div.className = 'tip-container';
        div.innerHTML =
            `<strong class="tip-title">${tip.title}</strong>
        <p class="tip-description">${tip.description}</p>
        `
        allTipsList.appendChild(div);
    })
}

//handles daily goal completion
for (let goal of dailyGoals) {
    goal.addEventListener('click', () => {
        //use index of element as basis for week day number (start at 1, instead of 0)
        const day = [...weeklyTracker.children].indexOf(goal) + 1;
        //add banner icon
        goal.classList.toggle('achieved');
        //add check icon if achieved
        if (goal.classList.contains('achieved')) {
            goal.innerHTML = '<i class="fa fa-check"></i>';
            goal.style.borderColor = 'var(--primaryColor)'
        } else {
            //set 
            goal.innerHTML = day;
            goal.style.borderColor = 'var(--primaryLight)';
        }
    });
}



//* RECIPES SECTION 
const recipesForm = document.querySelector('#recipes-form');
const recipesList = document.querySelector('#recipes-list');
const searchItem = document.querySelector('#recipe-search-box');
const startCookingContainer = document.querySelector('#start-cooking');
const ingredientsModalBg = document.querySelector('.ingredients-modal-bg');
const ingredientsModal = document.querySelector('.ingredients-modal');
const nameModal = document.querySelector('.modal-name');
const ingredientsList = document.querySelector('.ingredients-list');
const closeIngredientsBtn = document.querySelector('.close-ingredients');

class Recipe {
    constructor(title, ingredients) {
        this.title = title;
        this.ingredients = ingredients;
    }
}
class RecipeStore {
    static get_recipes() {
        let recipes;
        if (localStorage.getItem('recipes') === null) {
            recipes = [];
        } else {
            recipes = JSON.parse(localStorage.getItem('recipes'));
        }
        return recipes;
    }
    static add_recipe(recipe) {
        const recipes = RecipeStore.get_recipes();
        recipes.push(recipe);
        localStorage.setItem('recipes', JSON.stringify(recipes));
    }
    static get_ingredients(title) {
        const recipes = RecipeStore.get_recipes();
        for (let i = 0; i < recipes.length; i++) {
            if (recipes[i].title === title) {
                show_ingredients(title, recipes[i].ingredients);
            }
        }
    }
    static clear_recipes() {
        let recipes = RecipeStore.get_recipes();
        recipes = [];
        localStorage.setItem('recipes', JSON.stringify(recipes));
    }
}
//*fetch API 
add_recipe = async (e) => {
    e.preventDefault();
    await fetch(`https://api.edamam.com/search?q=${searchItem.value}&app_id=b007a9df&app_key=ccd005a10207133fc919236fa78ac276&to=25`)
        .then(res => res.json())
        .then(data => {
            display_recipes(data.hits);
        })
        .catch((err) => {
            alert(err);
        })
}
recipesForm.addEventListener('submit', add_recipe)

display_recipes = (data) => {
    RecipeStore.clear_recipes();
    searchItem.value = '';
    //remove start cooking image
    hide([startCookingContainer]);
    let recipesArr = [];
    //store each recipe object inside arr and append to list
    data.forEach(recipeItem => {
        let recipe = {};
        recipe.title = recipeItem.recipe.label;
        recipe.url = recipeItem.recipe.url;
        recipe.photo = recipeItem.recipe.image;
        recipe.ingredients = recipeItem.recipe.ingredientLines;
        recipesArr.push(recipe);
        RecipeStore.add_recipe(recipe);
    })
    recipesList.innerHTML = '';
    recipesArr.forEach(recipe => {
        recipesList.innerHTML +=
            `<div class="recipe-item-container">
                <div class="image-item-container">
                    <img class="recipe-image" src="${recipe.photo}" alt="${recipe.title}">
                </div>
                <div class="recipe-info">
                    <strong class="recipe-name">${recipe.title}</strong>
                    <div class="recipe-buttons">
                        <button onclick="get_ingredients('${recipe.title}')">View Ingredients</button>
                        <button><a href="${recipe.url}" target='_blank'>View Full Recipe</a></button>
                    </div>
                </div>
            </div>`;
    })
    get_ingredients = (title) => {
        RecipeStore.get_ingredients(title);
    }
}
show_ingredients = (name, ingredients) => {
    //clear previous list
    ingredientsList.innerHTML = '';
    show([ingredientsModalBg]);
    //prevent scrolling when modal is open 
    document.body.style.overflow = 'hidden';
    nameModal.innerText = name;
    ingredients.forEach(ingredient => {
        const li = document.createElement('li');
        li.innerText = ingredient;
        ingredientsList.appendChild(li);
    })
}
closeIngredientsBtn.addEventListener('click', () => {
    hide([ingredientsModalBg]);
    //allow scrolling when modal is closed
    document.body.style.overflow = 'auto';
})
if (!recipesList.innerHTML) {
    RecipeStore.clear_recipes();
}
//*FRIDGE SECTION 
const pantryBtn = document.querySelector('#pantry-button');
const fridgeBtn = document.querySelector('#fridge-button');
const freezerBtn = document.querySelector('#freezer-button');

const pantrySearchBarInput = document.querySelector('#pantry-searchbar-input');
const fridgeSearchBarInput = document.querySelector('#fridge-searchbar-input');
const freezerSearchBarInput = document.querySelector('#freezer-searchbar-input');
const locationInput = document.querySelectorAll('.location-input');
const itemLists = document.querySelectorAll('.item-list');

const pantryContent = document.querySelector('#pantry-content');
const fridgeContent = document.querySelector('#fridge-content');
const freezerContent = document.querySelector('#freezer-content');

pantryBtn.addEventListener('click', () => {
    show([pantryContent]);
    hide([fridgeContent, freezerContent]);
    location_active(pantryBtn);
    location_inactive([fridgeBtn, freezerBtn]);
})
fridgeBtn.addEventListener('click', () => {
    show([fridgeContent]);
    hide([pantryContent, freezerContent]);
    location_active(fridgeBtn);
    location_inactive([pantryBtn, freezerBtn]);
})
freezerBtn.addEventListener('click', () => {
    show([freezerContent]);
    hide([pantryContent, fridgeContent]);
    location_active(freezerBtn);
    location_inactive([pantryBtn, fridgeBtn]);
})

//*ADD ITEM SECTION 
class Item {
    constructor(id, name, count, unit, category, expiryDate = '-') {
        this.id = id;
        this.name = capitalize(name);
        this.count = parseFloat(count);
        this.unit = unit;
        this.category = capitalize(category);
        this.expiryDate = expiryDate;
    };
}
//handles local storage for location items
class ItemStore {
    //get items of selected location
    static get_items(location) {
        let storeName = `${location}-items`;
        if (localStorage.getItem(`${location}-items`) === null) {
            storeName = [];
        } else {
            storeName = JSON.parse(localStorage.getItem(`${location}-items`));
        }
        return storeName;
    }
    static add_item(item, location) {
        const items = ItemStore.get_items(location);
        items.push(item);
        localStorage.setItem(`${location}-items`, JSON.stringify(items));
    }
    static delete_item(itemCard, location) {
        const itemName = itemCard.children[0].children[0].innerText;
        const itemExpiry = itemCard.children[1].children[0].children[1].innerText;
        const id = `${itemName}-${itemExpiry}`;
        location = capitalize(location);
        const items = ItemStore.get_items(location);
        items.forEach((item, index) => {
            if (item.id === id) {
                items.splice(index, 1);
            }
        })
        localStorage.setItem(`${location}-items`, JSON.stringify(items));
    }
    static add_or_subtract_item(itemCard, location, status) {
        location = capitalize(location);
        const items = ItemStore.get_items(location);
        //get index of element via html container
        //use spread to turn childNodes HTMLCollection into a true array in order to use indexOf
        const index = [...itemCard.parentElement.childNodes].indexOf(itemCard);
        //update item count in storage
        if (status === 'add') {
            items[index].count += 0.5;
        } else {
            items[index].count -= 0.5;
        }
        //display new count in item card UI
        let newCount = String(items[index].count);
        let itemCardCount = itemCard.children[0].children[1].children[0];
        itemCardCount.innerText = newCount;
        let minusBtn = itemCard.children[1].children[1].children[0];
        if (newCount <= '0') {
            hide([minusBtn]);
        } else {
            show([minusBtn]);
        }
        localStorage.setItem(`${location}-items`, JSON.stringify(items));
    }
}

//handles UI for location items
class ItemUI {
    static get_stocks() {
        const pantryItems = ItemStore.get_items('Pantry');
        const fridgeItems = ItemStore.get_items('Fridge');
        const freezerItems = ItemStore.get_items('Freezer');
        const pantryList = document.querySelector('#pantry-items-list');
        const fridgeList = document.querySelector('#fridge-items-list');
        const freezerList = document.querySelector('#freezer-items-list');
        ItemUI.display_items(pantryItems, pantryList);
        ItemUI.display_items(fridgeItems, fridgeList);
        ItemUI.display_items(freezerItems, freezerList);
    };
    static display_items(items, listLocation) {
        listLocation.innerHTML = '';
        let card;
        items.forEach(item => {
            card = create_item_card(item);
            listLocation.appendChild(card);
        })
        ItemUI.is_empty();
    }
    static add_item(item, location) {
        let exactLocation = document.getElementById(`${location.toLowerCase()}-items-list`);
        let card = create_item_card(item);
        exactLocation.appendChild(card);
        //check expiry only if item has a date
        if (item.expiryDate) {
            Item.check_expiry([item], location);
        }
        ItemUI.is_empty();
    }
    static delete_item_card(card) {
        card.remove();
        ItemUI.is_empty();
    }
    static display_expiry() {
        const pantryItems = ItemStore.get_items('Pantry');
        const fridgeItems = ItemStore.get_items('Fridge');
        const freezerItems = ItemStore.get_items('Freezer');
        Item.check_expiry(pantryItems, 'Pantry');
        Item.check_expiry(fridgeItems, 'Fridge');
        Item.check_expiry(freezerItems, 'Freezer');
    }
    //checks if each location is empty then displays empty message if empty or removes message if not
    static is_empty = () => {
        let listsArr = [...itemLists];
        listsArr.forEach(list => {
            //get location based on list id
            const location = list.id.split('-')[0];
            const items = ItemStore.get_items(`${capitalize(location)}`);
            const locationItemsCount = list.childElementCount;
            if (locationItemsCount === 0 && items.length === 0) {
                list.style.display = 'inline';
                list.innerHTML =
                    `<p class="empty-message">Seems like you currently have no items in your ${location}.
                    <br><br>Click + to add a new item</p>`;
            } else if (locationItemsCount === 2) {
                list.style.display = 'grid';
                //remove message
                if (list.children[0].classList.contains('empty-message')) {
                    list.children[0].remove();
                }
            };
        })
    }
}

//creates card container for new items added to pantry, fridge or freezer
create_item_card = (item) => {
    const card = document.createElement('div');
    card.className = 'item-card';
    card.innerHTML =
        `<div class="item">
            <p class="item-name">${item.name}</p>
            <div class="amount">
                <strong class="item-count">${item.count}</strong>
                <span class="item-unit">${item.unit}</span>
            </div>
        </div>
        <div class="item-actions">
            <p class="item-expiry">
                <i class="fa fa-bell"></i>
                <span>${item.expiryDate}</span>
            </p>
            <div class="item-action-btn">
                <button class="fa fa-minus-circle item-minus"></button>
                <button class="fa fa-plus-circle item-plus"></button>
                <button class="fa fa-times item-delete"></button>
            </div>
        </div>`
    return card;
}

//once DOM loads, display stocks and expiring items
document.addEventListener('DOMContentLoaded', ItemUI.get_stocks);
document.addEventListener('DOMContentLoaded', ItemUI.display_expiry);

const addItemForm = document.querySelector('#add-item-form');
//default date value format: yyyy-mm-dd
const itemExpiryDate = document.querySelector('#item-expiry-date');
const noExpiryDate = document.querySelector('#no-expiry-date');
//clear input date when the 'no date' checkbox is checked to not duplicate dates
noExpiryDate.addEventListener('change', () => {
    if (noExpiryDate.checked) {
        document.querySelector('#item-expiry-date').value = '';
    }
})
//restrict past dates
const today = new Date().toISOString().slice(0, 10);
itemExpiryDate.setAttribute('min', today);

//get form values
addItemForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.querySelector('#item-name').value;
    const count = document.querySelector('#item-count').value;
    const unit = document.querySelector('#item-unit');
    const selectedUnit = unit.options[unit.selectedIndex].innerText;
    const category = document.querySelector('#item-category');
    const selectedCategory = category.options[category.selectedIndex].innerText;
    const location = document.querySelector('#item-location');
    const selectedLocation = location.options[location.selectedIndex].innerText;
    //set expiry date to either date or none (if checkbox selected)
    let expiryDate;
    noExpiryDate.checked ? expiryDate = '' : expiryDate = itemExpiryDate.value;
    let id = `${capitalize(name)}-${expiryDate}`;
    let finalUnit;
    let finalCategory;
    // let finalLocation;
    selectedUnit === 'Select Unit' ? finalUnit = '' : finalUnit = selectedUnit;
    selectedCategory === 'Select Category' ? finalCategory = '' : finalCategory = selectedCategory;
    // selectedLocation === 'Select Location' ? finalLocation = '' : finalLocation = finalLocation;
    Item.create_item(id, name, count, finalUnit, finalCategory, expiryDate, selectedLocation);
})

//instantiate new item, add to storage and display under tab location
Item.create_item = (id, name, count, unit, category, date, location) => {
    let newItem = new Item(id, name, count, unit, category, date, location);
    ItemStore.add_item(newItem, location);
    ItemUI.add_item(newItem, location);
    for (let input of inputTexts) {
        input.value = '';
    }
    for (let input of inputNumbers) {
        input.value = '';
    }
    for (let input of inputDate) {
        input.value = '';
    }
    noExpiryDate.checked = false;
}

//traverse DOM to target each item card, either to delete item or update count
const locationContent = [pantryContent, fridgeContent, freezerContent];
locationContent.forEach(content => {
    content.addEventListener('click', (e) => {
        let targetElement = e.target;
        Item.update_item(targetElement);
    })
})
//catch error: id of null
Item.update_item = (targetElement) => {
    try {
        const targetCard = targetElement.parentElement.parentElement.parentElement;
        //targetLocation returns pantry, fridge, or freezer string
        const targetLocation = targetCard.parentElement.id.split('-')[0];
        //delete item
        if (targetElement.classList.contains('item-delete')) {
            ItemStore.delete_item(targetCard, targetLocation);
            ItemUI.delete_item_card(targetCard);
            //add item count
        } else if (targetElement.classList.contains('item-plus')) {
            ItemStore.add_or_subtract_item(targetCard, targetLocation, 'add');
            //subtract item count
        } else if (targetElement.classList.contains('item-minus')) {
            ItemStore.add_or_subtract_item(targetCard, targetLocation, 'subtract');
        } else {
            return;
        }
        //catch typeError: Cannot read property 'id' of null
    } catch (error) {
        console.log(error);
    }
}
//*location  filtered search 
//get user input when typing and filter through storage
fridgeSearchBarInput.addEventListener('keyup', (e) => {
    const fridgeItems = ItemStore.get_items('Fridge');
    const fridgeList = document.querySelector('#fridge-items-list');
    //turn searchstring and item name to lowercase for accurate comparison
    const searchString = e.target.value.toLowerCase();
    //returns new array of filtered search items based on item name
    const filteredFridgeItems = fridgeItems.filter(item => {
        return item.name.toLowerCase().includes(searchString);
    })
    //display only filetered items
    ItemUI.display_items(filteredFridgeItems, fridgeList);
})
pantrySearchBarInput.addEventListener('keyup', (e) => {
    const pantryItems = ItemStore.get_items('Pantry');
    const pantryList = document.querySelector('#pantry-items-list');
    const searchString = e.target.value.toLowerCase();
    const filteredPantryItems = pantryItems.filter(item => {
        return item.name.toLowerCase().includes(searchString);
    })
    ItemUI.display_items(filteredPantryItems, pantryList);
})
freezerSearchBarInput.addEventListener('keyup', (e) => {
    const freezerItems = ItemStore.get_items('Freezer');
    const freezerList = document.querySelector('#freezer-items-list');
    const searchString = e.target.value.toLowerCase();
    const filteredFreezerItems = freezerItems.filter(item => {
        return item.name.toLowerCase().includes(searchString);
    })
    ItemUI.display_items(filteredFreezerItems, freezerList);
})
//*check expiring items 
//returns number of days left between item expiry date and today's date
calculate_days_left = (dateToday, expiryDate) => {
    const date1 = new Date(dateToday);
    const date2 = new Date(expiryDate);
    // One day in milliseconds
    const oneDay = 1000 * 60 * 60 * 24;
    //get time difference between two dates
    const diffInTime = date2.getTime() - date1.getTime();
    //get the no. of days between two dates
    let diffInDays = Math.round(diffInTime / oneDay);
    return diffInDays;
}

//check expiring items within a week and sort by earliest expiring per location
Item.check_expiry = (items, location) => {
    const today = new Date();
    const nextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 8);
    //get the date 1 week from today with the same format as item date (yyyy-mm-dd)
    const nextWeekFormatted = nextWeek.toISOString().split('T')[0];
    //returns new array of sorted expiring items
    const expiringItems = items
        .filter(item => {
            return item.expiryDate <= nextWeekFormatted && item.expiryDate != "";
        }).sort((a, b) => (a.expiryDate > b.expiryDate) ? 1 : -1);
    show_expiring_items(expiringItems, location);
}

const expiryList = document.querySelector('#expiry-list');

show_expiring_items = (items, location) => {
    const today = new Date();
    const todayFormatted = today.toISOString().split('T')[0];
    items.forEach(item => {
        let daysLeftMessage;
        let daysLeft = calculate_days_left(todayFormatted, item.expiryDate);
        if (Math.sign(daysLeft) === -1) {
            //if days left is a negative number
            daysLeftMessage = 'Expired';
        } else if (daysLeft === 0) {
            daysLeftMessage = 'Expires today';
        } else if (daysLeft === 1) {
            daysLeftMessage = `Expiring in 1 day`;
        } else {
            daysLeftMessage = `Expiring in ${daysLeft} days`;
        }
        //change date format from full date (yyyy-mm-dd) to (mm-dd)
        item.expiryDate = item.expiryDate.split('-')[1] + '-' + item.expiryDate.split('-')[2];
        const card = document.createElement('div');
        card.className = 'alert-item-card';
        card.innerHTML =
            `<i class="fa fa-times alert-delete"></i>
            <div class="alert-item">
                <strong class="alert-item-name">${item.name}</strong>
                <span class="alert-daysleft">${daysLeftMessage}</span>
            </div>
            <div class="alert-info">
                <p class="alert-location">${location}</p>
                <span class="alert-item-date">${item.expiryDate}</span>
            </div>`
        expiryList.appendChild(card);
    })
}
//traverse DOM to remove alert item card (expiring item)
expiryList.addEventListener('click', (e) => {
    if (e.target.classList.contains('alert-delete')) {
        e.target.closest('div').remove();
    }
})

//* grocery list 
const groceryForm = document.querySelector('#grocery-form');
const groceryItemsList = document.querySelector('#grocery-items-list');
const groceryListContainer = document.querySelector('#grocery-item-container');
const groceryItemCountInput = document.querySelector('#grocery-item-count-input');
const groceryItemInput = document.querySelector('#grocery-item-input');
const removeGroceryList = document.querySelector('.grocery-close');

class GroceryItem {
    constructor(name, count = '') {
        this.name = name;
        this.count = count;
    }
}

class GroceryStore {
    static get_grocery_items() {
        let items = 'grocery-list';
        if (localStorage.getItem('grocery-list') === null) {
            items = [];
        } else {
            items = JSON.parse(localStorage.getItem('grocery-list'));
        }
        return items;
    }
    static add_grocery_item(item) {
        const items = GroceryStore.get_grocery_items();
        items.push(item);
        localStorage.setItem('grocery-list', JSON.stringify(items));
    }
    static edit_or_delete_item(itemIndex, type) {
        const items = GroceryStore.get_grocery_items();
        if (type === 'delete') {
            items.splice(itemIndex, 1);
        }
        localStorage.setItem('grocery-list', JSON.stringify(items));
    }
}

class GroceryUI {
    static get_grocery_items() {
        const items = GroceryStore.get_grocery_items();
        GroceryUI.display_grocery_items(items);
    }
    static display_grocery_items(items) {
        if (items != []) {
            show([groceryListContainer]);
            items.forEach(item => {
                GroceryUI.add_grocery_item(item);
            })
        }
        GroceryUI.is_grocerylist_empty();
    }
    static add_grocery_item(item) {
        let newItem = create_grocery_item_container(item);
        groceryListContainer.appendChild(newItem);
        GroceryUI.is_grocerylist_empty();
    }
    static edit_or_delete_item(itemContainer, type) {
        if (type === 'delete') {
            itemContainer.remove();
            GroceryUI.is_grocerylist_empty();
        } else {
            const itemCount = itemContainer.children[0].children[0].innerText;
            const itemName = itemContainer.children[0].children[1].innerText;
            document.querySelector('#grocery-item-count-input').value = itemCount;
            document.querySelector('#grocery-item-input').value = itemName;
            itemContainer.remove();
        }
    }
    static complete_item(itemContainer) {
        itemContainer.classList.toggle('strikethrough');
    }
    static is_grocerylist_empty = () => {
        const groceryItemsCount = groceryListContainer.childElementCount;
        if (groceryItemsCount === 1) {
            groceryListContainer.innerHTML =
                `<div class="empty-cart-container">
                    <strong>Your grocery list is empty</strong>
                    <img src = "./assets/images/empty-cart.svg" alt="empty cart">
                   </img>
                </div>`;
        } else if (groceryItemsCount === 2) {
            //hide empty cart container
            hide([groceryListContainer.children[0]]);
        }
    }
}

create_grocery_item_container = (item) => {
    const div = document.createElement('div');
    div.className = 'grocery-item';
    div.innerHTML =
        `<div>
            <span class="grocery-item-count">${item.count}</span>
            <span class="grocery-item-name">${item.name}</span>
            <button class="fa fa-edit grocery-edit"></button>
        </div>
        <div>
            <button class="fa fa-trash grocery-delete"></button>
        </div>`;
    return div;
}

document.addEventListener('DOMContentLoaded', GroceryUI.get_grocery_items);
//get form values
groceryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const count = groceryItemCountInput.value;
    const name = groceryItemInput.value;
    GroceryItem.create_grocery_item(name, count);
})

//instantiate new grocery item, add to storage and display to list
GroceryItem.create_grocery_item = (itemName, itemCount) => {
    let groceryItem = new GroceryItem(itemName, itemCount);
    GroceryStore.add_grocery_item(groceryItem);
    GroceryUI.add_grocery_item(groceryItem);
    groceryItemCountInput.value = '';
    groceryItemInput.value = '';
}

groceryListContainer.addEventListener('click', (e) => {
    const targetElement = e.target;
    const itemContainer = e.target.parentElement.parentElement;
    const index = [...itemContainer.parentElement.children].indexOf(itemContainer);
    if (targetElement.classList.contains('grocery-delete')) {
        GroceryUI.edit_or_delete_item(itemContainer, 'delete');
        GroceryStore.edit_or_delete_item(index, 'delete');
    } else if (targetElement.classList.contains('grocery-edit')) {
        GroceryUI.edit_or_delete_item(itemContainer, 'edit');
        GroceryStore.edit_or_delete_item(index, 'delete');
    } else if (targetElement.classList.contains('grocery-item')) {
        GroceryUI.complete_item(targetElement);
    }
})


