//todo wrong_arguments (e.g. name cannot start with a number)
//todo update table UI for deposit, withdraw, send updates
//todo create alert message for new account & delete account
//todo use helper functions for each form

/*****ELEMENTS*****/
const dashboard = document.querySelector('#dashboard');
const accounts = document.querySelector('#accounts');
const budget = document.querySelector('#budget');
const currentDate = document.querySelector('#date');
const userAccountModal = document.querySelector('.user-account-modal');

//* HEADER  
const dashboardBtn = document.querySelector('#dashboard-btn');
const accountsBtn = document.querySelector('#accounts-btn');
const budgetBtn = document.querySelector('#budget-btn');
const userIcon = document.querySelector('#main-user-icon');

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
userIcon.addEventListener('click', () => {
    userAccountModal.classList.toggle('hide');
})

const today = new Date();
var months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

currentDate.textContent = `${months[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`;

let alertName;
//display user's name on page load
window.addEventListener('load', () => {
    let params = (new URL(document.location)).searchParams;
    const name = params.get('name');
    //display user's name
    document.querySelector('#main-user-name').textContent = name;
    alertMessage.textContent = `Welcome, ${name}`;
    alertName = name;
})

//*DASHBOARD TAB 
const alertBox = document.querySelector('.alert-container');
const alertMessage = document.querySelector('.alert-message');
const removeAlert = document.querySelector('#db-remove-alert');

const dbDeposit = document.querySelector('#db-deposit');
const depositModal = document.querySelector('.deposit-modal-bg');
const dbWithdraw = document.querySelector('#db-withdraw');
const withdrawModal = document.querySelector('.withdraw-modal-bg');
const dbSendMoney = document.querySelector('#db-send-money');
const sendModal = document.querySelector('.send-modal-bg');
const dbAddAccount = document.querySelector('#db-add-account');

removeAlert.addEventListener('click', () => {
    alertMessage.textContent = `Welcome, ${alertName}`;
    alertBox.style.backgroundColor = 'var(--black)';
    removeAlert.style.display = 'none';
})

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
//*ACCOUNTS TAB 
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
active = (element) => {
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
    constructor(accountNumber, name, dateOfBirth, balance) {
        this.accountNumber = accountNumber;
        this.name = name;
        this.dateOfBirth = dateOfBirth;
        this.balance = balance;
    };
}

//* STORAGE 
//local storage stores key value pairs
/*cant store objects in local storage. it has to be a string so need to stringify 
before adding to storage and parse when pulling it out*/
//'static' used to be able to call them directly without having to instantiate the store class
//accounts will be a string version of the entire array of accounts list
class AccountStore {
    static getAccouts() {
        let accounts;
        //check if there is an item called accounts
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

    static deleteAccount(accountNumber) {
        const accounts = AccountStore.getAccouts();
        //loop through the accounts and check if current account iterated matches the index
        accounts.forEach((account, index) => {
            if (account.accountNumber === accountNumber) {
                accounts.splice(index, 1);
            }
        });
        //reset to local storage
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
                <td> ${account.accountNumber.toString().match(/.{1,4}/g).join(' ')}</td>
                <td>${account.name}</td>
                <td>${account.dateOfBirth}</td>
                <td>₱${account.balance.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</td>
                <td><button class="fas fa-trash delete"></button></td>`;
        accountlist.appendChild(row);
    }
    //todo update row balance after deposit
    static deposit(accountNumber, amount) {

    }

    //todo update table row balance after withdraw
    static withdraw(accountNumber, amount) {

    }

    //todo update table row balance after money transfer

    //make sure that target element contains the class of delete then delete the whole account row
    static deleteAccount(target) {
        if (target.classList.contains('delete')) {
            //remove parent of parent element (tr) from the DOM
            target.parentElement.parentElement.remove();
        }
    }
    static clear_inputs() {
        document.querySelector("#firstName").value = '';
        document.querySelector("#lastName").value = '';
        document.querySelector("#middleName").value = '';
        document.querySelector("#dateOfBirth").value = '';
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

//*DISPLAY ALL ACCOUNTS 
//as soon as the DOM loads, display current accounts list
document.addEventListener('DOMContentLoaded', AccountUI.list_users);

//*CREATE NEW ACCOUNT 
const addAccountForm = document.querySelector('#add-account-form');
addAccountForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let randNumber = Math.floor(Math.random() * 900000000000) + 100000000000;
    const firstName = document.querySelector('#firstName').value;
    const lasttName = document.querySelector('#lastName').value;
    const middleName = document.querySelector('#middleName').value;
    const fullName = `${firstName} ${middleName} ${lasttName} `;
    const dateOfBirth = document.querySelector('#dateOfBirth').value;

    let existingAccount;
    const accounts = AccountStore.getAccouts();
    //check if account already exists
    accounts.forEach(account => {
        if (account.name.toLowerCase() === fullName) {
            if (account.dateOfBirth === dateOfBirth) {
                existingAccount = true;
            }
        }
    })
    if (existingAccount) {
        alert('Account already exists!');
    } else {
        create_user(randNumber, fullName, dateOfBirth, 0);
    }
    //todo how to not repeat random account number with exactly 12 numbers
    existingAccount = false;
});

create_user = (accountNumber, name, dateOfBirth, balance) => {
    //instantiate a new account from the Account class
    const account = new Account(accountNumber, name.toUpperCase(), dateOfBirth, balance);
    alert(`New Account: ${accountNumber} - ${name.toUpperCase()} - ${balance} `);
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

Account.get_balance = (accountNumber) => {
    accountNumber = Number(accountNumber);
    let getAccountNumber;
    let balance;
    let name;
    const accounts = AccountStore.getAccouts();
    accounts.forEach(account => {
        if (account.accountNumber === accountNumber) {
            getAccountNumber = accountNumber;
            //display balance with comma
            balance = account.balance.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
            name = account.name;
        };
    });
    if (getAccountNumber) {
        Number.isInteger(balance) ? balanceDisplay.innerText = `₱${balance}.00` : balanceDisplay.innerText = `₱${balance}`;
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
depositAccountInput.addEventListener('input', () => {
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
    depositAccountName = undefined;
})
//event listener on form submit
const depositForm = document.querySelector('#deposit-modal-form');
depositForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let accountNumberValue = document.querySelector('#deposit-account-input').value;
    let depositAmount = document.querySelector('#deposit-amount-input').value;
    Account.deposit(accountNumberValue, depositAmount);
})
Account.deposit = (accountNumber, amount) => {
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
        alertMessage.textContent = `Successfully Deposited ₱${amount} to Account Number: ${depositAccount}`;
        success();
        // alert(`Successfully deposited ₱${amount} to ${depositAccount} `);
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
withdrawAccountInput.addEventListener('input', () => {
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

Account.withdraw = (accountNumber, amount) => {
    accountNumber = Number(accountNumber);
    amount = parseFloat(amount);
    const accounts = AccountStore.getAccouts();
    let withdrawAccount;
    let balance;
    for (let i = 0; i < accounts.length; i++) {
        if (accounts[i].accountNumber === accountNumber) {
            withdrawAccount = accountNumber;
            balance = accounts[i].balance;
        };
    }
    if (withdrawAccount) {
        let isBalanceSufficient = checkBalance(balance, amount);
        if (isBalanceSufficient) {
            withdrawName.innerText = "";
            alertMessage.textContent = `Successfully withdrew ₱${amount} from ${withdrawAccount}`;
            success();
            // alert(`Successfully withdrew ₱${amount} from ${withdrawAccount} `);
            AccountStore.withdraw(accountNumber, amount);
            AccountUI.clear_inputs();
        }
    } else {
        //check if length is just wrong or if account really does not exist
        checkNumberLength(accountNumber);
    }
    //to not override
    withdrawAccount = undefined;
    balance = undefined;
}

//*SEND FORM 
const senderAccountInput = document.querySelector('#sender-input');
const receiverAccountInput = document.querySelector('#receiver-input');
let senderName = document.querySelector('#sender-name');
let receiverName = document.querySelector('#receiver-name');

//event listener on user input: display account name if valid
senderAccountInput.addEventListener('input', () => {
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

receiverAccountInput.addEventListener('input', () => {
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
Account.send = (from_accountNumber, to_accountNumber, amount) => {
    let senderAccount;
    let senderAccountName;
    let senderBalance;
    let receiverAccount;
    let receiverAccountName;

    amount = parseFloat(amount);
    const accounts = AccountStore.getAccouts();
    //check if sender and receiver accounts exist
    for (let i = 0; i < accounts.length; i++) {
        if (accounts[i].accountNumber === Number(from_accountNumber)) {
            senderAccount = Number(from_accountNumber);
            senderAccountName = accounts[i].name;
            senderBalance = accounts[i].balance;
        } else if (accounts[i].accountNumber === Number(to_accountNumber)) {
            receiverAccount = Number(to_accountNumber);
            receiverAccountName = accounts[i].name;
        };
    }
    if (senderAccount && receiverAccount) {
        let isBalanceSufficient = checkBalance(senderBalance, amount);
        if (isBalanceSufficient) {
            senderName.innerText = "";
            receiverName.innerText = "";
            alertMessage.textContent = `Successfully sent ₱${amount} from ${senderAccountName}: ${senderAccount} to ${receiverAccountName}: ${receiverAccount} `;
            success();
            AccountStore.send(senderAccount, receiverAccount, amount);
            AccountUI.clear_inputs();
        }
    } else if (!senderAccount && receiverAccount) {
        alertMessage.textContent = 'INVALID ACCOUNT: Sender does not exist';
        invalid();
        // alert('Sender does not exist');
    } else if (senderAccount && !receiverAccount) {
        alertMessage.textContent = 'INVALID ACCOUNT: Receiver does not exist';
        invalid();

        // alert('Receiver does not exist');
    } else {
        alertMessage.textContent = 'INVALID ACCOUNTS';
        invalid();

        // alert('Invalid Accounts');
    }
    //reset sender and receiver details to prevent override
    senderAccount = undefined;
    receiverAccount = undefined;
}

//*DELETE AN ACCOUNT 
//select the account table and delete via 'event propagation' - target the actual list
document.querySelector('#account-list-data').addEventListener('click', (e) => {
    // traverse the DOM to get the targetAccountNumber
    let targetAccount = e.target.parentElement.parentElement.firstElementChild.textContent;
    //remove spaces between string target account number
    let targetAccountNumber = Number(targetAccount.replace(/\s/g, ''))
    //remove account from storage. 
    AccountStore.deleteAccount(targetAccountNumber);
    //remove account from list
    AccountUI.deleteAccount(e.target);
})

//*HELPER FUNCTIONS

//todo use helper functions for each form
function findAccountNumber(accountNumber) {
    const accounts = AccountStore.getAccouts();
    accounts.forEach(account => {
        if (account.accountNumber === accountNumber) {
            return accountNumber;
        } else {
            return false;
        }
    })
};
function findAccountName(accountNumber) {
    const accounts = AccountStore.getAccouts();
    accounts.forEach(account => {
        if (account.accountNumber === accountNumber) {
            return account.name;
        } else {
            return false;
        }
    })
}
function checkNumberLength(accountNumber) {
    if (String(accountNumber).length != 12) {
        alertMessage.textContent = `INVALID ACCOUNT:
Account number must contain 12 digits. Current input contains ${String(accountNumber).length} digits`;
    } else {
        alertMessage.textContent = `INVALID ACCOUNT: ACCOUNT NOT FOUND`;
    }
    invalid();
}
function checkBalance(currentBalance, amount) {
    if (currentBalance >= amount) {
        return currentBalance;
    } else {
        alertMessage.textContent = `INSUFFICIENT BALANCE: Account only has ₱${currentBalance} balance`;
        invalid();
        return false;
    }
}
function success() {
    removeAlert.style.display = 'block';
    alertBox.style.backgroundColor = 'var(--success)';
}
function invalid() {
    removeAlert.style.display = 'block';
    alertBox.style.backgroundColor = 'var(--invalid)';
}

