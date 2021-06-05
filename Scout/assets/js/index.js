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