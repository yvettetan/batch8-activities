//*USER CLASS 
class User {
    constructor(userName, email, password, balance = 0, expenseItems = [], incomeItems = []) {
        this.username = userName;
        this.email = email;
        this.password = password;
        this.balance = balance;
        this.expenses = expenseItems;
        this.income = incomeItems;
    }
}
//*USERS STORAGE 
class UserStore {
    static getUsers() {
        let users;
        if (localStorage.getItem('users') === null) {
            users = [];
        } else {
            users = JSON.parse(localStorage.getItem('users'));
        }
        return users;
    }
    static createUser(user) {
        const users = UserStore.getUsers();
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    }
}
//redirect to login form when user successfully creates an account
//* CREATE NEW USER 
const signUpForm = document.querySelector('.signup-form');
signUpForm.addEventListener('submit', () => {
    //capitalize first letter of name
    let userName = document.querySelector('#user-name').value;
    let userEmail = document.querySelector('#user-email').value;
    let userPassword = document.querySelector('#user-password').value;

    let existingUser;
    const users = UserStore.getUsers('users');
    users.forEach(user => {
        if (user.email === userEmail) {
            existingUser = true;
        }
    });
    if (existingUser) {
        alert('User already exists!');
        e.preventDefault();
    } else {
        let user = new User(userName, userEmail, userPassword);
        UserStore.createUser(user);
        alert('successfully created an account')
        signUpForm.setAttribute('action', './login.html');
    };
})