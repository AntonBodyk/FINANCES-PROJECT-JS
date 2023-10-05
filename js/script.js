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
const dropMenu = document.querySelector('.dropdown-menu');
const dropButton = document.querySelector('.btn-danger');
const categoryArray = JSON.parse(localStorage.getItem('categoryArray')) || [];


function addCategoryExpenses(){
    categoryButton.addEventListener('click', () => {
        console.log(categoryInput.value);
        
        if(isNaN(categoryInput.value)){
            categoryArray.push(categoryInput.value);
            localStorage.setItem('categoryArray', JSON.stringify(categoryArray));
            
            console.log(categoryArray);
            categoryInput.value = '';
        }else if(categoryInput.value === ''){
            alert('Введите данные');
        }else{
            alert('Не правильные данные');
            categoryInput.value = '';
        }
        
    })
}

function addCategory(){
    const newCategoryArray = JSON.parse(localStorage.getItem('categoryArray'));
    console.log(typeof(newCategoryArray))
    dropButton.addEventListener('click', () => {

        const dropListItem = document.createElement('li');
        dropListItem.classList.add('dropdown-item');

        // for (let i = 0; i < newCategoryArray.length; i++) {
        //     dropListItem.textContent = newCategoryArray[i];
        //     console.log(newCategoryArray[i]);
        // }

        dropListItem.innerHTML = Object.values(newCategoryArray);
        
        dropMenu.appendChild(dropListItem);
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
        }else if(localStorage.getItem('amount') < parseInt(inputAddExpenses.value)){
            alert('На вашем балансе не достаточно средств!');
            inputAddComment.value = '';
            inputAddExpenses.value = '';
        }else{
            e.preventDefault();
    
            localStorage.setItem('comment', inputAddComment.value);
            localStorage.setItem('amount', parseInt(localStorage.getItem('amount')) - parseInt(inputAddExpenses.value));
    
            inputAddComment.value = '';
            inputAddExpenses.value = '';
            removeModal();
        }
    });
}


const ctx = document.getElementById('myChart');


let chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
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
    addCategory();

    openModalButton.addEventListener('click', () => {
        openModal();
    });
    
    closeModal.addEventListener('click', () => {
        removeModal();
    });
    
});