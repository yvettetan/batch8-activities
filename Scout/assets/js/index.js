//todo localStorage update data
//todo profile page
//todo grocery list page
//todo display expiring items
//helper functions
capitalize = (words) => {
    wordsArr = words.split(' ');
    for (let i = 0; i < wordsArr.length; i++) {
        wordsArr[i] = wordsArr[i].charAt(0).toUpperCase() + wordsArr[i].slice(1);
    }
    capitalized = wordsArr.join(' ');
    return capitalized;
}
create_row = (item) => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${item.name}</td>
        <td>${item.count}</td>
        <td><button class="fa fa-edit edit"></button><button class="fa fa-trash delete"></button></td>`;
    return row;
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
const shoppingContainer = document.querySelector('#shopping-list');
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
    show(profileContainer);
    hide([recipesContainer, fridgeContainer, shoppingContainer, addItemContainer]);
})
navRecipesBtn.addEventListener('click', () => {
    nav_active(navRecipesBtn);
    nav_inactive([navProfileBtn, navFridgeBtn, navCartBtn, navAddBtn]);
    show(recipesContainer);
    hide([profileContainer, fridgeContainer, shoppingContainer, addItemContainer]);
})
navFridgeBtn.addEventListener('click', () => {
    nav_active(navFridgeBtn);
    nav_inactive([navProfileBtn, navRecipesBtn, navCartBtn, navAddBtn]);
    show(fridgeContainer);
    hide([profileContainer, recipesContainer, shoppingContainer, addItemContainer]);
})
navCartBtn.addEventListener('click', () => {
    nav_active(navCartBtn);
    nav_inactive([navProfileBtn, navRecipesBtn, navFridgeBtn, navAddBtn]);
    show(shoppingContainer);
    hide([profileContainer, recipesContainer, fridgeContainer, addItemContainer]);
})
navAddBtn.addEventListener('click', () => {
    nav_active(navAddBtn);
    nav_inactive([navProfileBtn, navRecipesBtn, navFridgeBtn, navCartBtn]);
    show(addItemContainer);
    hide([profileContainer, recipesContainer, fridgeContainer, shoppingContainer]);
})
nav_active = (element) => {
    element.classList.add('nav-active');
}
nav_inactive = elementsArr => {
    elementsArr.forEach(element => {
        element.classList.remove('nav-active');
    });
}
show = element => {
    element.classList.remove('hide');
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


//* RECIPES SECTION 
const recipesForm = document.querySelector('#recipes-form');
const recipesList = document.querySelector('#recipes-list');
const searchItem = document.querySelector('#recipe-search-box');
const startCookingContainer = document.querySelector('#start-cooking');

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
    searchItem.value = '';
    hide([startCookingContainer]);
    let recipesArr = [];
    //store each recipe object inside arr and append to list
    data.forEach(recipeItem => {
        let recipe = {};
        recipe.title = recipeItem.recipe.label;
        recipe.url = recipeItem.recipe.url;
        recipe.photo = recipeItem.recipe.image;
        recipe.cuisineType = recipeItem.recipe.cuisineType;
        recipe.ingredients = recipeItem.recipe.ingredientLines;
        recipesArr.push(recipe);
    })
    recipesList.innerHTML = '';
    recipesArr.forEach(recipe => {
        recipesList.innerHTML +=
            `<div class="recipe-item-container">
                <strong>${recipe.title}</strong>
                <div class="image-item-container">
                    <img class="recipe-image" src="${recipe.photo}" alt="${recipe.title}">
                </div>
                <div class="recipe-info">
                    <button>View Ingredients</button>
                    <a href="${recipe.url}" target='_blank'><button>View Full Recipe</button></a>
                </div>
            </div>`;
    })
}
//*FRIDGE SECTION 
const pantryBtn = document.querySelector('#pantry-button');
const fridgeBtn = document.querySelector('#fridge-button');
const freezerBtn = document.querySelector('#freezer-button');
const pantryContent = document.querySelector('#pantry-content');
const fridgeContent = document.querySelector('#fridge-content');
const freezerContent = document.querySelector('#freezer-content');

pantryBtn.addEventListener('click', () => {
    show(pantryContent);
    hide([fridgeContent, freezerContent]);
    location_active(pantryBtn);
    location_inactive([fridgeBtn, freezerBtn]);
})
fridgeBtn.addEventListener('click', () => {
    show(fridgeContent);
    hide([pantryContent, freezerContent]);
    location_active(fridgeBtn);
    location_inactive([pantryBtn, freezerBtn]);
})
freezerBtn.addEventListener('click', () => {
    show(freezerContent);
    hide([pantryContent, fridgeContent]);
    location_active(freezerBtn);
    location_inactive([pantryBtn, fridgeBtn]);
})


//*ADD ITEM SECTION 
class Item {
    constructor(name, count, unit, category, expiryDate) {
        this.name = capitalize(name);
        this.count = parseFloat(count);
        this.unit = unit;
        this.category = capitalize(category);
        this.expiryDate = expiryDate;
    };
}
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
    //add item to storage location
    static add_item(item, location) {
        const items = ItemStore.get_items(location);
        items.push(item);
        localStorage.setItem(`${location}-items`, JSON.stringify(items));
    }
}

const pantryItems = ItemStore.get_items('Pantry');
const fridgeItems = ItemStore.get_items('Fridge');
const freezerItems = ItemStore.get_items('Freezer');
class ItemUI {
    static get_stocks() {
        const pantryList = document.querySelector('#pantry-items-list');
        const fridgeList = document.querySelector('#fridge-items-list');
        const freezerList = document.querySelector('#freezer-items-list');
        ItemUI.display_items(pantryItems, pantryList);
        ItemUI.display_items(fridgeItems, fridgeList);
        ItemUI.display_items(freezerItems, freezerList);
    };
    static display_items(items, listlocation) {
        let row;
        items.forEach(item => {
            row = create_row(item);
            listlocation.appendChild(row);
        })
    }
    static add_item(item, location) {
        let exactLocation = document.getElementById(`${location.toLowerCase()}-items-list`);
        let row = create_row(item);
        exactLocation.appendChild(row);
    }

}

document.addEventListener('DOMContentLoaded', ItemUI.get_stocks);

const addItemForm = document.querySelector('#add-item-form');
//default date value format: yyyy-mm-dd
const itemExpiryDate = document.querySelector('#item-expiry-date');
const noExpiryDate = document.querySelector('#no-expiry-date');
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
    noExpiryDate.checked = !noExpiryDate.checked;
    //set expiry date to either date or none (if checkbox selected)
    let expiryDate;
    noExpiryDate.checked && !itemExpiryDate.value ? expiryDate = 'none' : expiryDate = itemExpiryDate.value;
    create_item(name, count, selectedUnit, selectedCategory, expiryDate, selectedLocation);
})

//instantiate new item, add to storage and display in table location
function create_item(name, count, unit, category, date, location) {
    let newItem = new Item(name, count, unit, category, date, location);
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