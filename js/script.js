let inputValueAmount = document.getElementById('amount');
let replenishmentFormButton = document.querySelector('.replenishment-button');

function upUserBalance(){

    replenishmentFormButton.addEventListener('click', (e) => {

        if(isNaN(inputValueAmount.value)){
            alert('Не правильные данные');
            inputValueAmount.value = '';
        }else if(inputValueAmount.value === ''){
            alert('Введите данные');
        }else{
            e.preventDefault();
            console.log(inputValueAmount);
                
            localStorage.setItem('amount', parseInt(localStorage.getItem('amount')) + parseInt(inputValueAmount.value));
    
            console.log(typeof(localStorage.getItem('amount')));
            inputValueAmount.value = '';
        }
    })
}


function userBalance(){
    const showUserBalance = document.getElementById('general-balance');
    showUserBalance.innerHTML = localStorage.getItem('amount');
}

const categoryInput = document.getElementById('category-input');
const categoryButton = document.querySelector('.category-button');

function addCategoryExpenses(){
    categoryButton.addEventListener('click', () => {
        console.log(categoryInput.value);
        let list = document.querySelector('.category-list');
        let listItem = document.createElement('li');
        listItem.textContent = categoryInput.value;

        list.appendChild(listItem);
    })
    

}

const openModalButton = document.querySelector('.add-expenses-button'),
      modal = document.querySelector('.modal'),
      closeModal = document.querySelector('.modal__close');

function openModal(){
    modal.classList.add('show');
}

function removeModal(){
    modal.classList.remove('show');
}


const btnAddSumExpenses = document.querySelector('.btn-sum-expenses');
const inputAddComment = document.querySelector('.modal__input__comment');
const inputAddExpenses = document.querySelector('.modal__input__expenses');


function userExpenses(){
    btnAddSumExpenses.addEventListener('click', (e) => {
    
        if(isNaN(inputAddExpenses.value)){
            alert('Не правильные данные');
            inputAddExpenses.style.border = '2px solid red';
        }else if(inputAddExpenses.value === '' || inputAddComment.value === ''){
            alert('Введите данные');
        }else if(typeof(inputAddComment.value) !== 'string'){
            alert('Значение может быть только строкой');
        }else if(localStorage.getItem('amount') < inputAddExpenses.value){
            alert('На вашем балансе не достаточно средств!');
            inputAddComment.value = '';
            inputAddExpenses.value = '';
        }else{
            e.preventDefault();
            console.log(typeof(inputAddComment.value));
            console.log(inputAddExpenses.value);
    
            localStorage.setItem('comment', inputAddComment.value);
            localStorage.setItem('amount', parseInt(localStorage.getItem('amount')) - parseInt(inputAddExpenses.value));
    
            inputAddComment.value = '';
            inputAddExpenses.value = '';
            removeModal();
        }
    });
}







document.addEventListener('DOMContentLoaded', () => {
    upUserBalance();
    userBalance();
    userExpenses();
    addCategoryExpenses();

    openModalButton.addEventListener('click', () => {
        openModal();
    });
    
    closeModal.addEventListener('click', () => {
        removeModal();
    });
    
});