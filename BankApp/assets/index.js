//todo wrong_arguments (e.g. amount cannot be negative, name cannot start with a number)
//todo user_already_exists ('Den' == 'den')
//? user_does_not_exists ('Den' == 'den')

//todo update table UI when storage updates
//todo show transaction history with date

//todo sender not enought balance

//display user's name on page load
window.addEventListener('load', () => {
    let params = (new URL(document.location)).searchParams;
    const name = params.get('name');
    //display user's name
    document.querySelector('#main-user-name').textContent = name;
})

/*****ELEMENTS*****/
const dashboard = document.querySelector('#dashboard');
const accounts = document.querySelector('#accounts');
const budget = document.querySelector('#budget');

//* header 
const dashboardBtn = document.querySelector('#dashboard-btn');
const accountsBtn = document.querySelector('#accounts-btn');
const budgetBtn = document.querySelector('#budget-btn');

dashboardBtn.addEventListener('click', () => {
    active(dashboardBtn);
    inactive([accountsBtn, budgetBtn]);
    show(dashboard);
    hide([accounts, budget]);
})
accountsBtn.addEventListener('click', () => {
    active(accountsBtn);
    inactive([dashboardBtn, budgetBtn]);
    show(accounts);
    hide([dashboard, budget]);
})
budgetBtn.addEventListener('click', () => {
    active(budgetBtn);
    inactive([dashboardBtn, accountsBtn]);
    show(budget);
    hide([dashboard, accounts]);
})

//*dashboard 
const dbDeposit = document.querySelector('#db-deposit');
const depositModal = document.querySelector('.deposit-modal-bg');
const dbWithdraw = document.querySelector('#db-withdraw');
const withdrawModal = document.querySelector('.withdraw-modal-bg');
const dbSendMoney = document.querySelector('#db-send-money');
const sendModal = document.querySelector('.send-modal-bg');
const dbAddAccount = document.querySelector('#db-add-account');
const alertBox = document.querySelector('.alert-container');

dbDeposit.addEventListener('click', () => {
    showModal(depositModal);
    hideModal([withdrawModal, sendModal]);
})

dbWithdraw.addEventListener('click', () => {
    showModal(withdrawModal);
    hideModal([depositModal, sendModal]);
})

dbSendMoney.addEventListener('click', () => {
    showModal(sendModal);
    hideModal([depositModal, withdrawModal]);
})

dbAddAccount.addEventListener('click', () => {
    active(accountsBtn);
    inactive([dashboardBtn, budgetBtn]);
    show(accounts);
    show(addAccountContainer);
    hide([dashboard, accountList]);
    hideModal([sendModal]);
})
//*accounts 
const accListAccounts = document.querySelector('#acc-list-accounts');
const accAddAccount = document.querySelector('#acc-add-account');

const accountList = document.querySelector('#account-list');
const addAccountContainer = document.querySelector('#add-account-container');

accListAccounts.addEventListener('click', () => {
    show(accountList);
    hide([addAccountContainer]);
});

accAddAccount.addEventListener('click', () => {
    show(addAccountContainer);
    hide([accountList]);
})

//* TOGGLE DISPLAYS 
active = element => {
    element.classList.add('active');
}
inactive = elementsArr => {
    elementsArr.forEach(element => {
        element.classList.remove('active');
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
showModal = element => {
    element.style.display = 'flex';
}
hideModal = elementsArr => {
    elementsArr.forEach(element => {
        element.style.display = 'none';
    });
}

//*USER CLASS 
class Account {
    constructor(accountNumber, name, balance, transactions) {
        this.accountNumber = accountNumber;
        this.name = name;
        this.balance = balance;
        this.transactions = transactions;
    };
}

//* STORAGE 
class AccountStore {
    static getAccouts() {
        let accounts;
        //check if there is an item called accounts, set it to null:
        if (localStorage.getItem('accounts') === null) {
            accounts = [];
        } else {
            //need to run through JSON.parse method to use data as array of objects
            accounts = JSON.parse(localStorage.getItem('accounts'));
        }
        return accounts;
    }

    static addAccount(account) {
        const accounts = AccountStore.getAccouts();
        accounts.push(account);
        //reset to local storage
        localStorage.setItem('accounts', JSON.stringify(accounts));
    }

    static deposit(accountNumber, amount) {
        const accounts = AccountStore.getAccouts();
        accounts.some((account) => {
            if (account.accountNumber === accountNumber) {
                account.balance += amount;
            }
        })
        localStorage.setItem('accounts', JSON.stringify(accounts));
    }
    static withdraw(accountNumber, amount) {
        const accounts = AccountStore.getAccouts();
        accounts.some((account) => {
            if (account.accountNumber === accountNumber) {
                account.balance -= amount;
            }
        })
        localStorage.setItem('accounts', JSON.stringify(accounts));
    }
    static send(from_accountNumber, to_accountNumber, amount) {
        const accounts = AccountStore.getAccouts();
        accounts.some((account) => {
            if (account.accountNumber === from_accountNumber) {
                account.balance -= amount;
            }
        })
        accounts.some((account) => {
            if (account.accountNumber === to_accountNumber) {
                account.balance += amount;
            }
        })
        localStorage.setItem('accounts', JSON.stringify(accounts));
    }
}

//* ACCOUNT UI 
class AccountUI {
    static list_users() {
        const accounts = AccountStore.getAccouts();
        //loop through all accounts in storage array and display accounts in table
        accounts.forEach(account => {
            AccountUI.addAccount(account);
        })
        localStorage.setItem('accounts', JSON.stringify(accounts));
    }
    static addAccount(account) {
        const accountlist = document.querySelector('#account-list-data');
        //create trow to insert to tbody
        const row = document.createElement('tr');
        row.innerHTML = `
                <td>${account.accountNumber}</td>
                <td>${account.name}</td>
                <td>${account.balance}</td>
                <td><a href="#">View Transactions</a></td>`;
        accountlist.appendChild(row);
    }
    //todo update row balance after deposit
    static deposit(accountNumber, amount) {

    }

    //todo update table row balance after withdraw
    static withdraw(accountNumber, amount) {

    }

    //todo update table row balance after money transfer

    static clear_inputs() {
        document.querySelector("#firstName").value = '';
        document.querySelector("#lastName").value = '';
        document.querySelector('#account-number-input').value = '';
        document.querySelector('#deposit-account-input').value = '';
        document.querySelector('#deposit-amount-input').value = '';
        document.querySelector('#withdraw-account-input').value = '';
        document.querySelector('#withdraw-amount-input').value = '';
        document.querySelector('#sender-input').value = '';
        document.querySelector('#receiver-input').value = '';
        document.querySelector('#send-amount-input').value = '';
    }
}

//*EVENT: Display all Accounts 
//as soon as the DOM loads, display current accounts list
document.addEventListener('DOMContentLoaded', AccountUI.list_users);

//*EVENT: create a new account 
const addAccountForm = document.querySelector('#add-account-form');
addAccountForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let randNumber = Math.floor(Math.random() * 900000000000) + 100000000000;
    const firstName = document.querySelector('#firstName').value;
    const lasttName = document.querySelector('#lastName').value;
    const fullName = `${firstName} ${lasttName}`;
    create_user(randNumber, fullName, 0);
    //todo error handling user already exists
    //todo how to not repeat random account number with exactly 12 numbers

});

create_user = (accountNumber, name, balance) => {
    //todo check if user already exists
    //instantiate a new account from the Account class
    const account = new Account(accountNumber, name, balance);
    alert(`New Account: ${accountNumber} - ${name} - ${balance} `);
    //display new account in list
    AccountUI.addAccount(account);
    //add new account to storage
    AccountStore.addAccount(account);
    //clear input fields
    AccountUI.clear_inputs();
}

//* GET BALANCE 
//event listener on user input
const balanceDisplay = document.querySelector('#account-balance');
const nameDisplay = document.querySelector('#account-name');
const displayAccountInput = document.querySelector('#account-number-input');
displayAccountInput.addEventListener('input', () => {
    if (!displayAccountInput.value) {
        balanceDisplay.innerText = '₱0.00';
        nameDisplay.innerText = '';
    }
})

//event listener on form submit
const displayBalanceForm = document.querySelector('#display-balance-form');
displayBalanceForm.addEventListener('submit', (e) => {
    let accountNumberValue = displayAccountInput.value;
    e.preventDefault();
    Account.get_balance(accountNumberValue);
})

Account.get_balance = function (accountNumber) {
    accountNumber = Number(accountNumber);
    let getAccountNumber;
    let balance;
    let name;
    const accounts = AccountStore.getAccouts();
    accounts.forEach(account => {
        if (account.accountNumber === accountNumber) {
            getAccountNumber = accountNumber;
            balance = account.balance;
            name = account.name;
        };
    })
    if (getAccountNumber) {
        balanceDisplay.innerText = `₱${balance}`;
        nameDisplay.innerText = name;
    } else {
        //check if length is just wrong or if account really does not exist
        checkNumberLength(accountNumber);
        balanceDisplay.innerText = '₱0.00';
        nameDisplay.innerText = 'Account not Found';
    }
    //to not override
    depositAccount = undefined;
}

//*DEPOSIT FORM 
const depositAccountInput = document.querySelector('#deposit-account-input');
const depositName = document.querySelector('#deposit-name');
//event listener on user input: display account name if valid
depositAccountInput.addEventListener('input', (e) => {
    let depositAccountName;
    //if input has no value
    if (!depositAccountInput.value) {
        depositName.innerText = "";
    } else {
        const accounts = AccountStore.getAccouts();
        for (let i = 0; i < accounts.length; i++) {
            if (accounts[i].accountNumber === Number(depositAccountInput.value)) {
                depositAccountName = accounts[i].name;
            }
        }
        if (depositAccountName) {
            depositName.innerText = depositAccountName;
        } else {
            depositName.innerText = 'Account Not Found';
        };
    }
})
//event listener on form submit
const depositForm = document.querySelector('#deposit-modal-form');
depositForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let accountNumberValue = document.querySelector('#deposit-account-input').value;
    let depositAmount = document.querySelector('#deposit-amount-input').value;
    Account.deposit(accountNumberValue, depositAmount);
})
Account.deposit = function (accountNumber, amount) {
    accountNumber = Number(accountNumber);
    amount = parseFloat(amount);
    let depositAccount;
    const accounts = AccountStore.getAccouts();
    for (let i = 0; i < accounts.length; i++) {
        if (accounts[i].accountNumber === accountNumber) {
            depositAccount = accountNumber;
        };
    }
    if (depositAccount) {
        depositName.innerText = "";
        alert(`Successfully deposited ₱${amount} to ${depositAccount}`);
        // update account balance in local storage
        AccountStore.deposit(accountNumber, amount);
        AccountUI.clear_inputs();
    } else {
        //check if length is just wrong or if account really does not exist
        checkNumberLength(accountNumber);
    }
    //to not override
    depositAccount = undefined;
}

//*WITHDRAW FORM 
const withdrawAccountInput = document.querySelector('#withdraw-account-input');
const withdrawName = document.querySelector('#withdraw-name');
//event listener on user input: display account name if valid
withdrawAccountInput.addEventListener('input', (e) => {
    let withdrawAccountName;
    //if input has no value
    if (!withdrawAccountInput.value) {
        withdrawName.innerText = "";
    } else {
        const accounts = AccountStore.getAccouts();
        for (let i = 0; i < accounts.length; i++) {
            if (accounts[i].accountNumber === Number(withdrawAccountInput.value)) {
                withdrawAccountName = accounts[i].name;
            };
        }
        if (withdrawAccountName) {
            withdrawName.innerText = withdrawAccountName;
        } else {
            withdrawName.innerText = 'Account Not Found';
        };
    }
})
//event listener on form submit
const withdrawForm = document.querySelector('#withdraw-modal-form');
withdrawForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let accountNumberValue = document.querySelector('#withdraw-account-input').value;
    let withdrawAmount = document.querySelector('#withdraw-amount-input').value;
    Account.withdraw(accountNumberValue, withdrawAmount);
})

Account.withdraw = function (accountNumber, amount) {
    accountNumber = Number(accountNumber);
    amount = parseFloat(amount);
    const accounts = AccountStore.getAccouts();
    let withdrawAccount;
    for (let i = 0; i < accounts.length; i++) {
        if (accounts[i].accountNumber === accountNumber) {
            withdrawAccount = accountNumber;
        };
    }
    if (withdrawAccount) {
        withdrawName.innerText = "";
        alert(`Successfully withdrew ₱${amount} from ${withdrawAccount}`);
        // update account balance in local storage
        AccountStore.withdraw(accountNumber, amount);
        AccountUI.clear_inputs();
    } else {
        //check if length is just wrong or if account really does not exist
        checkNumberLength(accountNumber);
    }
    //to not override
    withdrawAccount = undefined;
}

//*SEND FORM 
const senderAccountInput = document.querySelector('#sender-input');
const receiverAccountInput = document.querySelector('#receiver-input');
const senderName = document.querySelector('#sender-name');
const receiverName = document.querySelector('#receiver-name');

//event listener on user input: display account name if valid
senderAccountInput.addEventListener('input', (e) => {
    let senderAccountName;
    //if input has no value
    if (!senderAccountInput.value) {
        senderName.innerText = "";
    } else {
        const accounts = AccountStore.getAccouts();
        for (let i = 0; i < accounts.length; i++) {
            if (accounts[i].accountNumber === Number(senderAccountInput.value)) {
                senderAccountName = accounts[i].name;
            };
        }
        if (senderAccountName) {
            senderName.innerText = senderAccountName;
        } else {
            senderName.innerText = 'Account Not Found';
        };
    }
})

receiverAccountInput.addEventListener('input', (e) => {
    let receiverAccountName;
    //if input has no value
    if (!receiverAccountInput.value) {
        receiverName.innerText = "";
    } else {
        const accounts = AccountStore.getAccouts();
        for (let i = 0; i < accounts.length; i++) {
            if (accounts[i].accountNumber === Number(receiverAccountInput.value)) {
                receiverAccountName = accounts[i].name;
            };
        }
        if (receiverAccountName) {
            receiverName.innerText = receiverAccountName;
        } else {
            receiverName.innerText = 'Account Not Found';
        };
    }
})

//event listener on form submit
const sendForm = document.querySelector('#send-modal-form');
sendForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let senderAccountNumberValue = document.querySelector('#sender-input').value;
    let receiverAccountNumberValue = document.querySelector('#receiver-input').value;
    let sendAmount = document.querySelector('#send-amount-input').value;
    Account.send(senderAccountNumberValue, receiverAccountNumberValue, sendAmount);
})
Account.send = function (from_accountNumber, to_accountNumber, amount) {
    let senderAccount;
    let receiverAccount;
    let senderAccountName;
    let receiverAccountName;
    amount = parseFloat(amount);
    const accounts = AccountStore.getAccouts();
    //check if sender and receiver accounts exist
    for (let i = 0; i < accounts.length; i++) {
        if (accounts[i].accountNumber === Number(from_accountNumber)) {
            senderAccount = Number(from_accountNumber);
            senderAccountName = accounts[i].name;
        } else if (accounts[i].accountNumber === Number(to_accountNumber)) {
            receiverAccount = Number(to_accountNumber);
            receiverAccountName = accounts[i].name;
        };
    }
    if (senderAccount && receiverAccount) {
        senderName.innerText = "";
        receiverName.innerText = "";
        alert(`Successfully sent ₱${amount} from ${senderAccountName}: ${senderAccount} to ${receiverAccountName}: ${receiverAccount}`);
        //update local storage
        AccountStore.send(senderAccount, receiverAccount, amount);
        //todo update UI
        AccountUI.clear_inputs();
    } else if (!senderAccount && receiverAccount) {
        alert('Sender does not exist');
    } else if (senderAccount && !receiverAccount) {
        alert('Receiver does not exist');
    } else {
        alert('Invalid Accounts');
    }
    //reset sender and receiver details to prevent override
    senderAccount = undefined;
    receiverAccount = undefined;
    senderName = undefined;
    receiverName = undefined;
}
//clears local storage
document.getElementById('clear-storage').addEventListener('click', () => {
    localStorage.clear();
})
//checks if account number is 12 digits
function checkNumberLength(accountNumber) {
    const accounts = AccountStore.getAccouts();
    if (String(accountNumber).length != 12) {
        alert(`INVALID ACCOUNT:
Account number must contain 12 digits. Current input contains ${String(accountNumber).length} digits`);
    } else {
        alert('ACCOUNT NOT FOUND');
    }
}