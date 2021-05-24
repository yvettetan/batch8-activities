/*****ELEMENTS*****/
const dashboard = document.querySelector('#dashboard');
const accounts = document.querySelector('#accounts');
const budget = document.querySelector('#budget');
const currentDate = document.querySelector('#date');
const userAccountModal = document.querySelector('.user-account-modal');
const inputNumbers = document.querySelectorAll('input[type=number]');
const inputTexts = document.querySelectorAll('input[type=text]');
const displayNames = document.querySelectorAll('.display-name-text');

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

//date display
const today = new Date();
var months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
currentDate.textContent = `${months[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`;

let alertName;
//display user's name on page load
window.addEventListener('load', () => {
    let params = (new URL(document.location)).searchParams;
    //capitalize name
    const name = params.get('name').toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    //display user's name
    document.querySelector('#main-user-name').textContent = name;
    alertMessage.textContent = `Welcome, ${name}`;
    alertName = name;
})

//*DASHBOARD TAB 
const dbDeposit = document.querySelector('#db-deposit');
const depositModal = document.querySelector('.deposit-modal-bg');
const dbWithdraw = document.querySelector('#db-withdraw');
const withdrawModal = document.querySelector('.withdraw-modal-bg');
const dbSendMoney = document.querySelector('#db-send-money');
const sendModal = document.querySelector('.send-modal-bg');
const dbAddAccount = document.querySelector('#db-add-account');
const alertBox = document.querySelector('.alert-container');
const alertMessage = document.querySelector('.alert-message');
const removeAlert = document.querySelector('#db-remove-alert');

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
const accAlertMessage = document.querySelector('.acc-alert-message');
const accRemoveAlert = document.querySelector('#acc-remove-alert');
const accountList = document.querySelector('#account-list');
const addAccountContainer = document.querySelector('#add-account-container');

accListAccounts.addEventListener('click', () => {
    show(accountList);
    hide([addAccountContainer]);
    accListAccounts.classList.add('acc-active');
});

accAddAccount.addEventListener('click', () => {
    show(addAccountContainer);
    hide([accountList]);
    accListAccounts.classList.remove('acc-active');
})

accRemoveAlert.addEventListener('click', () => {
    accAlertMessage.innerText = '';
    accRemoveAlert.style.display = 'none';

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
//*HELPER FUNCTIONS 
//look for account number is in storage, return number or balance or name
function findAccount(accountNumber, type) {
    const accounts = AccountStore.getAccouts();
    for (let i = 0; i < accounts.length; i++) {
        if (accounts[i].accountNumber === accountNumber) {
            if (type === 'number') {
                return accounts[i].accountNumber;
            } else if (type === 'balance') {
                return accounts[i].balance;
            } else {
                return accounts[i].name;
            };
        };
    };
}
//check if account number is valid
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
function displayToCard(newBalance) {
    newBalance.indexOf('.') ? balanceDisplay.innerText = `₱${newBalance}` : balanceDisplay.innerText = `₱${newBalance}.00`;
}
//for alert box
function success() {
    removeAlert.style.display = 'block';
    alertBox.style.backgroundColor = 'var(--success)';
}
function invalid() {
    removeAlert.style.display = 'block';
    alertBox.style.backgroundColor = 'var(--invalid)';
}

//*USER CLASS 
class Account {
    constructor(accountNumber, name, balance) {
        this.accountNumber = accountNumber;
        this.name = name;
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
        //create unique id for balance to access when acount table UI
        row.innerHTML = `
                <td>${account.accountNumber.toString().match(/.{1,4}/g).join(' ')}</td>
                <td>${account.name}</td>
                <td id="b-${String(account.accountNumber)}">₱${account.balance.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</td>
                <td>Delete Account <button class="fas fa-trash delete"></button></td>`;
        accountlist.appendChild(row);
    }

    // AccountUI.deposit(accountNumber, amount, previousBalance, newBalance);
    static depositOrWithdraw(accountNumber, amount, newBalance, action) {
        //turn amount to string and add commas
        amount = amount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        newBalance = newBalance.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        let toOrFrom;
        if (action === 'Deposited') {
            toOrFrom = 'to'
        } else {
            toOrFrom = 'from';
        }
        document.getElementById(`b-${String(accountNumber)}`).innerHTML = `₱${newBalance}`
        alertMessage.textContent = `Successfully ${action} ₱${amount} ${toOrFrom} Account Number: ${accountNumber}. New Balance: ₱${newBalance}`;
        success();
        //display new balance in balance card
        if (displayAccountInput.value != '') {
            displayToCard(newBalance);
        }
    }

    static send(senderAccountName, senderAccountNumber, newSenderBalance, receiverAccountName, receiverAccountNumber, newReceiverBalance, amount) {
        amount = amount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        newSenderBalance = newSenderBalance.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        newReceiverBalance = newReceiverBalance.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

        document.getElementById(`b-${String(senderAccountNumber)}`).innerHTML = `₱${newSenderBalance}`;
        document.getElementById(`b-${String(receiverAccountNumber)}`).innerHTML = `₱${newReceiverBalance}`;

        alertMessage.textContent = `Successfully Sent ₱${amount} from ${senderAccountNumber} to ${receiverAccountNumber}
                    New Balance: ${senderAccountName} = ₱${newSenderBalance}; ${receiverAccountName} = ₱${newReceiverBalance}`;
        success();
        displayToCard(newSenderBalance);
    }

    //make sure that target element contains the class of delete then delete the whole account row
    static deleteAccount(target, targetAccountNumber) {
        accAlertMessage.textContent = `Are you sure you want to delete account ${targetAccountNumber}?`;
        accAlertMessage.style.color = 'var(--invalid)';
        document.querySelector('.confirm-delete').style.display = 'inline';

        document.querySelector('#yes-delete').addEventListener('click', () => {
            //remove parent of parent element (tr) from the DOM
            target.parentElement.parentElement.remove();
            //remove account from storage. 
            AccountStore.deleteAccount(targetAccountNumber);
            accAlertMessage.innerText = `Successfully deleted account ${targetAccountNumber}`;
            accAlertMessage.style.color = 'var(--success)';
            accRemoveAlert.style.display = 'inline';
            document.querySelector('.confirm-delete').style.display = 'none';
        });
        document.querySelector('#no-delete').addEventListener('click', () => {
            accAlertMessage.innerText = '';
            document.querySelector('.confirm-delete').style.display = 'none';
        })
    }
    static clear_inputs() {
        for (let input of inputNumbers) {
            input.value = '';
        }
        for (let input of inputTexts) {
            input.value = '';
        }
        for (let name of displayNames) {
            name.innerText = '';
        }
    }
}

//*DISPLAY ALL ACCOUNTS 
//display current accounts list as soon as the DOM loads
document.addEventListener('DOMContentLoaded', AccountUI.list_users);

//*CREATE NEW ACCOUNT 
const addAccountForm = document.querySelector('#add-account-form');
addAccountForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let randNumber = Math.floor(Math.random() * 900000000000) + 100000000000;
    const firstName = document.querySelector('#firstName').value;
    const middleName = document.querySelector('#middleName').value;
    const lasttName = document.querySelector('#lastName').value;
    const fullName = `${firstName} ${middleName} ${lasttName} `;
    const initialDeposit = Number(document.querySelector('#initialDeposit').value);

    let existingAccount;
    const accounts = AccountStore.getAccouts();
    //check if account already exists
    accounts.forEach(account => {
        if (account.name.toLowerCase() === fullName.toLowerCase()) {
            existingAccount = true;
        }
    })
    if (existingAccount) {
        accRemoveAlert.style.display = 'block';
        accAlertMessage.innerText = 'INVALID: Account Already Exists!';
        accAlertMessage.style.color = 'var(--invalid)';
    } else {
        create_user(randNumber, fullName, initialDeposit);
    }
    existingAccount = false;
});

create_user = (accountNumber, name, initialDeposit) => {
    //instantiate a new account from the Account class
    const account = new Account(accountNumber, name.toUpperCase(), initialDeposit);
    accRemoveAlert.style.display = 'block';
    accAlertMessage.innerText = `NEW ACCOUNT: ${accountNumber} NAME: ${name.toUpperCase()} BALANCE: ₱${initialDeposit}`;
    accAlertMessage.style.color = 'var(--success)';
    //display new account in list
    AccountUI.addAccount(account);
    //add new account to storage
    AccountStore.addAccount(account);
    //clear input fields
    AccountUI.clear_inputs();
}

//*FORM ELEMENTS 
//get balance
const balanceDisplay = document.querySelector('#account-balance');
const nameDisplay = document.querySelector('#account-name');
const displayAccountInput = document.querySelector('#account-number-input');

const clearInput = document.querySelector('.clear-input');
//deposit form elements
const depositForm = document.querySelector('#deposit-modal-form');
const depositAccountInput = document.querySelector('#deposit-account-input');
const depositName = document.querySelector('#deposit-name');
//withdraw form elements
const withdrawAccountInput = document.querySelector('#withdraw-account-input');
const withdrawName = document.querySelector('#withdraw-name');
//send form elements
const senderAccountInput = document.querySelector('#sender-input');
const receiverAccountInput = document.querySelector('#receiver-input');
const senderName = document.querySelector('#sender-name');
const receiverName = document.querySelector('#receiver-name');

//* GET BALANCE 
//clear button
clearInput.addEventListener('click', () => {
    AccountUI.clear_inputs();
    if (!displayAccountInput.value) {
        balanceDisplay.innerText = '₱0.00';
        nameDisplay.innerText = '';
    }
})
//event listener on user input
displayAccountInput.addEventListener('input', () => {
    if (!displayAccountInput.value) {
        balanceDisplay.innerText = '₱0.00';
        nameDisplay.innerText = '';
    }
})
//event listener on form submit
const displayBalanceForm = document.querySelector('#display-balance-form');
displayBalanceForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let accountNumberValue = displayAccountInput.value;
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
            balance = account.balance;
            //display balance with comma
            balance = account.balance.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
            name = account.name;
        };
    })
    if (getAccountNumber) {
        //check if balance is an integer or not
        balance.indexOf('.') ? balanceDisplay.innerText = `₱${balance}` : balanceDisplay.innerText = `₱${balance}.00`;
        nameDisplay.innerText = name;
        depositName.innerText = name;
        withdrawName.innerText = name;
        senderName.innerText = name;
    } else {
        //check if length is just wrong or if account really does not exist
        checkNumberLength(accountNumber);
        balanceDisplay.innerText = '₱0.00';
        nameDisplay.innerText = 'Account not Found';
        depositName.innerText = 'Account not Found';
        withdrawName.innerText = 'Account not Found';
        senderName.innerText = 'Account not Found';
    }
    //auto input account number to deposit form and withdraw form
    depositAccountInput.value = getAccountNumber;
    withdrawAccountInput.value = getAccountNumber;
    senderAccountInput.value = getAccountNumber;
    receiverAccountInput.value = '';
    receiverName.innerText = '';

    //to not override
    depositAccount = undefined;
}

//*DEPOSIT FORM 
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
//event listener on deposit form submit
depositForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let accountNumberValue = document.querySelector('#deposit-account-input').value;
    let depositAmount = document.querySelector('#deposit-amount-input').value;
    Account.deposit(accountNumberValue, depositAmount);
})
Account.deposit = (accountNumber, amount) => {
    accountNumber = Number(accountNumber);
    amount = parseFloat(amount);
    let depositAccount = findAccount(accountNumber, 'number');
    let previousBalance = findAccount(accountNumber, 'balance');
    let newBalance = previousBalance + amount;
    if (depositAccount) {
        // update account balance in local storage
        AccountStore.deposit(accountNumber, amount);
        AccountUI.depositOrWithdraw(accountNumber, amount, newBalance, 'Deposited');
        document.querySelector('#deposit-amount-input').value = '';
    } else {
        //check if length is just wrong or if account really does not exist
        checkNumberLength(accountNumber);
    }
    //to not override
    depositAccount = undefined;
}

//*WITHDRAW FORM 
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
    // const accounts = AccountStore.getAccouts();
    let withdrawAccount = findAccount(accountNumber, 'number');
    let previousBalance = findAccount(accountNumber, 'balance');
    let newBalance = previousBalance - amount;
    if (withdrawAccount) {
        let isBalanceSufficient = checkBalance(previousBalance, amount);
        if (isBalanceSufficient) {
            withdrawAmount = '';
            AccountStore.withdraw(accountNumber, amount);
            AccountUI.depositOrWithdraw(accountNumber, amount, newBalance, 'Withdrew');
            document.querySelector('#withdraw-amount-input').value = '';
        }
    } else {
        //check if length is just wrong or if account really does not exist
        checkNumberLength(accountNumber);
    }
    //to not override
    withdrawAccount = undefined;
}

//*SEND FORM 
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
    from_accountNumber = Number(from_accountNumber);
    to_accountNumber = Number(to_accountNumber);
    amount = parseFloat(amount);
    //sender
    let senderAccount = findAccount(from_accountNumber, 'number');
    let senderAccountName = findAccount(from_accountNumber, 'name');
    let previousSenderBalance = findAccount(from_accountNumber, 'balance');
    //receiver
    let receiverAccount = findAccount(to_accountNumber, 'number');
    let receiverAccountName = findAccount(to_accountNumber, 'name');
    let previousReceiverBalance = findAccount(to_accountNumber, 'balance');
    //new balance after transaction
    let newSenderBalance = previousSenderBalance - amount;
    let newReceiverBalance = previousReceiverBalance + amount;
    if (senderAccount === receiverAccount) {
        alertMessage.textContent = 'INVALID ACTION: Cannot Send to the Same Account';
        invalid();
    } else if (senderAccount && receiverAccount) {
        let isBalanceSufficient = checkBalance(previousSenderBalance, amount);
        if (isBalanceSufficient) {
            AccountStore.send(senderAccount, receiverAccount, amount);
            AccountUI.send(senderAccountName, senderAccount, newSenderBalance, receiverAccountName, receiverAccount, newReceiverBalance, amount);
            document.querySelector('#send-amount-input').value = '';
        }
    } else if (!senderAccount && receiverAccount) {
        alertMessage.textContent = 'INVALID ACCOUNT: Sender Does Not Exist';
        invalid();
    } else if (senderAccount && !receiverAccount) {
        alertMessage.textContent = 'INVALID ACCOUNT: Receiver Does Not Exist';
        invalid();
    } else {
        alertMessage.textContent = 'INVALID ACCOUNTS';
        invalid();
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
    let targetAccountNumber = Number(targetAccount.replace(/\s/g, ''));
    //remove account from list
    if (e.target.classList.contains('delete')) {
        AccountUI.deleteAccount(e.target, targetAccountNumber);
    }
})