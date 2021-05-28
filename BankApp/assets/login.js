//* LOGIN VALIDATION

const loginForm = document.querySelector('.login-form');
loginForm.addEventListener('submit', (e) => {
    console.log('form submitted');
    let email = document.querySelector('#login-user-email').value;
    let password = document.querySelector('#login-user-password').value;
    let users = JSON.parse(localStorage.getItem('users'));

    let existingEmail
    let passwordMatch;
    users.some(user => {
        if (user.email === email) {
            existingEmail = true;
            if (user.password === password) {
                passwordMatch = true;
            }
        }
    })
    if (!existingEmail) {
        alert('Account does not exist. Please create an account');
        e.preventDefault();
    } else if (existingEmail && !passwordMatch) {
        alert('Incorrect Password');
        e.preventDefault();
    } else {
        loginForm.setAttribute('action', './index.html');
    }
})