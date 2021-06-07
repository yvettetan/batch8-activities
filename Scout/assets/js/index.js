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
//* RECIPES SECTION 
const recipesForm = document.querySelector('#recipes-form');
const recipesList = document.querySelector('#recipes-list');
add_recipe = async (e) => {
    e.preventDefault();
    const searchItem = document.querySelector('#recipe-search-box').value;
    await fetch(`https://api.edamam.com/search?q=${searchItem}&app_id=b007a9df&app_key=ccd005a10207133fc919236fa78ac276`)
        .then(res => {
            return res.json();
        })
        .then(data => {
            display(data.hits);
        })
    searchItem = '';
}
recipesForm.addEventListener('submit', add_recipe)

display = (data) => {
    let recipesArr = [];
    //store each recipe object inside arr and append to list
    data.forEach(recipeItem => {
        let recipe = {};
        recipe.title = recipeItem.recipe.label;
        recipe.url = recipeItem.recipe.url;
        recipe.photo = recipeItem.recipe.image;
        recipe.cuisineType = recipeItem.recipe.cuisineType;
        recipe.healthLabels = recipeItem.recipe.healthLabels;
        recipesArr.push(recipe);
    })
    recipesArr.forEach(recipe => {
        const recipeItemContainer = document.createElement('div');
        let labelsContainer = document.createElement('div');
        recipe.healthLabels.forEach(label => {
            let labelSpan = document.createElement('span');
            labelSpan.innerHTML = `<span>${label}</span>`;
            labelsContainer.appendChild(labelSpan);
        })
        recipeItemContainer.innerHTML =
            `<div class="recipe-item-container">
            <p>${recipe.title}</p>
            <div class="image-link">
                <img class="recipe-image" src="${recipe.photo}" alt="${recipe.title}">
                <p>${recipe.cuisineType}</p>
                <a href="${recipe.url}" target='_blank'> <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M17 8C16.7348 8 16.4804 8.10536 16.2929 8.29289C16.1054 8.48043 16 8.73478 16 9V15C16 15.2652 15.8946 15.5196 15.7071 15.7071C15.5196 15.8946 15.2652 16 15 16H3C2.73478 16 2.48043 15.8946 2.29289 15.7071C2.10536 15.5196 2 15.2652 2 15V3C2 2.73478 2.10536 2.48043 2.29289 2.29289C2.48043 2.10536 2.73478 2 3 2H9C9.26522 2 9.51957 1.89464 9.70711 1.70711C9.89464 1.51957 10 1.26522 10 1C10 0.734784 9.89464 0.48043 9.70711 0.292893C9.51957 0.105357 9.26522 0 9 0H3C2.20435 0 1.44129 0.316071 0.87868 0.87868C0.316071 1.44129 0 2.20435 0 3V15C0 15.7956 0.316071 16.5587 0.87868 17.1213C1.44129 17.6839 2.20435 18 3 18H15C15.7956 18 16.5587 17.6839 17.1213 17.1213C17.6839 16.5587 18 15.7956 18 15V9C18 8.73478 17.8946 8.48043 17.7071 8.29289C17.5196 8.10536 17.2652 8 17 8Z"
                            fill="#3d806d" />
                        <path
                            d="M13 2H14.58L8.29 8.28C8.19627 8.37296 8.12188 8.48356 8.07111 8.60542C8.02034 8.72728 7.9942 8.85799 7.9942 8.99C7.9942 9.12201 8.02034 9.25272 8.07111 9.37458C8.12188 9.49644 8.19627 9.60704 8.29 9.7C8.38296 9.79373 8.49356 9.86812 8.61542 9.91889C8.73728 9.96966 8.86799 9.9958 9 9.9958C9.13201 9.9958 9.26272 9.96966 9.38458 9.91889C9.50644 9.86812 9.61704 9.79373 9.71 9.7L16 3.42V5C16 5.26522 16.1054 5.51957 16.2929 5.70711C16.4804 5.89464 16.7348 6 17 6C17.2652 6 17.5196 5.89464 17.7071 5.70711C17.8946 5.51957 18 5.26522 18 5V1C18 0.734784 17.8946 0.48043 17.7071 0.292893C17.5196 0.105357 17.2652 0 17 0H13C12.7348 0 12.4804 0.105357 12.2929 0.292893C12.1054 0.48043 12 0.734784 12 1C12 1.26522 12.1054 1.51957 12.2929 1.70711C12.4804 1.89464 12.7348 2 13 2Z"
                            fill="#3d806d" />
                    </svg></a>
            </div>
        </div>`;
        console.log(labelsContainer);
        recipesList.appendChild(recipeItemContainer);
    })
}

//*ADD ITEM SECTION 
class item {
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
    static add_item(item, location) {
        const items = ItemStore.get_items(location);
        items.push(item);
        localStorage.setItem(`${location}-items`, JSON.stringify(items));
    }
}
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
//
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

//add item to storage location
function create_item(name, count, unit, category, date, location) {
    let newItem = new item(name, count, unit, category, date, location);
    ItemStore.add_item(newItem, location);
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
const pantryItems = ItemStore.get_items('Pantry-items');
const fridgeItems = ItemStore.get_items('Fridge-items');
const freezerItems = ItemStore.get_items('Freezer-items');




