let inputValueAmount = document.getElementById('amount');
let replenishmentFormButton = document.querySelector('.replenishment-button');

function upUserBalance(){

    replenishmentFormButton.addEventListener('click', (e) => {

        if(isNaN(inputValueAmount.value)){
            alert('Не правильные данные');
            inputValueAmount.value = '';
        }else if(inputValueAmount.value === ''){
            alert('Введите данные');
        }else if(inputValueAmount.value < 0){
            alert('Введите значение больше чем 0');
            inputValueAmount.value = '';
        }else{
            e.preventDefault();
            console.log(inputValueAmount);
                
            localStorage.setItem('amount', parseInt(localStorage.getItem('amount')) + parseInt(inputValueAmount.value));
    
            inputValueAmount.value = '';
            location.reload();
        }
    })
}


function userBalance(){
    const showUserBalance = document.getElementById('general-balance');
    showUserBalance.innerHTML = localStorage.getItem('amount');
}

const categoryInput = document.getElementById('category-input');
const categoryButton = document.querySelector('.category-button');
const categoryArray = JSON.parse(localStorage.getItem('categoryArray')) || [];


function addCategoryExpenses(){

    categoryButton.addEventListener('click', () => {
        
        if(isNaN(categoryInput.value)){
            if(categoryArray.includes(categoryInput.value)){
                alert('Такая категория уже добавлена!');
                categoryInput.value = '';
            }else{
                categoryArray.push(categoryInput.value);
                localStorage.setItem('categoryArray', JSON.stringify(categoryArray));
                categoryInput.value = '';
            }
        }else if(categoryInput.value === ''){
            alert('Введите данные');
        }else{
            alert('Не правильные данные');
            categoryInput.value = '';
        }
        
        
        
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
const expensesArray = JSON.parse(localStorage.getItem('expensesArray')) || [];

function userExpenses(){

    btnAddSumExpenses.addEventListener('click', (e) => {
        localStorage.setItem('expensesArray', JSON.stringify(expensesArray));

        if(isNaN(inputAddExpenses.value)){
            alert('Не правильные данные');
        }else if(inputAddExpenses.value === '' || inputAddComment.value === ''){
            alert('Введите данные');
        }else if(typeof(inputAddComment.value) !== 'string'){
            alert('Значение может быть только строкой');
        }else if(localStorage.getItem('amount') < parseInt(inputAddExpenses.value)){
            alert('На вашем балансе не достаточно средств!');
            inputAddComment.value = '';
            inputAddExpenses.value = '';
        }else{
            e.preventDefault();
    
            localStorage.setItem('comment', inputAddComment.value);
            expensesArray.push(inputAddExpenses.value);
            localStorage.setItem('expensesArray', JSON.stringify(expensesArray));
            localStorage.setItem('amount', parseInt(localStorage.getItem('amount')) - parseInt(inputAddExpenses.value));
    
            inputAddComment.value = '';
            inputAddExpenses.value = '';
            removeModal();
            location.reload();
        }
    });
}


const ctx = document.getElementById('myChart');


let chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: JSON.parse(localStorage.getItem('categoryArray')),
      datasets: [{
        label: 'Сумма затрат',
        data: JSON.parse(localStorage.getItem('expensesArray')),
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });




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