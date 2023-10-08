const inputValueAmount = document.getElementById('amount');
const replenishmentFormButton = document.querySelector('.replenishment-button');
const categoryInput = document.getElementById('category-input');
const categoryButton = document.querySelector('.category-button');
const categoryArray = JSON.parse(localStorage.getItem('categoryArray')) || [];
const openModalButton = document.querySelector('.add-expenses-button');
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.modal__close');
const btnAddSumExpenses = document.querySelector('.btn-sum-expenses');
const inputAddComment = document.querySelector('.modal__input__comment');
const inputAddExpenses = document.querySelector('.modal__input__expenses');
const expensesArray = JSON.parse(localStorage.getItem('expensesArray')) || [];

function upUserBalance() {
    replenishmentFormButton.addEventListener('click', (e) => {
        const inputValue = parseFloat(inputValueAmount.value);

        if (isNaN(inputValueAmount.value)) {
            alert('Не правильные данные');
            inputValueAmount.value = '';
        } else if (inputValueAmount.value === '') {
            alert('Введите данные');
        } else if (inputValueAmount.value < 0) {
            alert('Введите значение больше чем 0');
            inputValueAmount.value = '';
        } else {
            e.preventDefault();
            console.log(inputValueAmount);

            const currentBalance = parseFloat(localStorage.getItem('amount') || 0);

            localStorage.setItem('amount', (currentBalance + inputValue).toString());

            inputValueAmount.value = '';
            location.reload();
        }
    })
}

function displayBalance(){
    const showUserBalance = document.getElementById('general-balance');
    showUserBalance.innerHTML = parseFloat(localStorage.getItem('amount') || 0);
}

function addCategoryExpenses(){
    const categorySelect = document.getElementById('category-select');
    categorySelect.innerHTML = ''; 

    categoryArray.forEach((category) => {
        const option = document.createElement('option');

        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });

    categoryButton.addEventListener('click', () => {
        const newCategory = categoryInput.value.trim();

        if (newCategory === '') {
            alert('Введите категорию');
        } else if (!categoryArray.includes(newCategory)) {
            categoryArray.push(newCategory);
            localStorage.setItem('categoryArray', JSON.stringify(categoryArray));

            const option = document.createElement('option');
            option.value = newCategory;
            option.textContent = newCategory;
            categorySelect.appendChild(option);

            categoryInput.value = '';
        } else {
            alert('Такая категория уже добавлена!');
            categoryInput.value = '';
        }
    });
}

function openModal(){
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function removeModal(){
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function userExpenses(){
    btnAddSumExpenses.addEventListener('click', (e) => {
        const selectedCategory = document.getElementById('category-select').value;
        const expensesAmount = parseInt(inputAddExpenses.value);

        if (selectedCategory === '') {
            alert('Выберите категорию');
        } else if (isNaN(expensesAmount)) {
            alert('Не правильные данные');
        } else if (inputAddExpenses.value === '' || inputAddComment.value === '') {
            alert('Введите данные');
        } else if (typeof (inputAddComment.value) !== 'string') {
            alert('Значение комментария может быть только строкой');
        } else if (localStorage.getItem('amount') < expensesAmount) {
            alert('На вашем балансе не достаточно средств!');
            inputAddComment.value = '';
            inputAddExpenses.value = '';
        } else {
            e.preventDefault();

            localStorage.setItem('comment', inputAddComment.value);
            expensesArray.push({category: selectedCategory, amount: expensesAmount});
            localStorage.setItem('expensesArray', JSON.stringify(expensesArray));
            localStorage.setItem('amount', (parseFloat(localStorage.getItem('amount')) - expensesAmount).toString());

            inputAddComment.value = '';
            inputAddExpenses.value = '';
            removeModal();
            location.reload();
        }
    });
}

const categories = JSON.parse(localStorage.getItem('categoryArray')) || [];
const expensesData = JSON.parse(localStorage.getItem('expensesArray')) || [];

const categoryLabels = categories.map((category) => category);
const expenseAmounts = categories.map((category) => {
    const categoryExpenses = expensesData.filter((expense) => expense.category === category);
    return categoryExpenses.reduce((sum, expense) => sum + expense.amount, 0);
});

const ctx = document.getElementById('myChart');


let chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: categoryLabels,
      datasets: [{
        label: 'Сумма затрат',
        data: expenseAmounts,
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
    displayBalance();
    userExpenses();
    addCategoryExpenses();

    

    openModalButton.addEventListener('click', () => {
        openModal();
    });
    
    closeModal.addEventListener('click', () => {
        removeModal();
    });
    
});