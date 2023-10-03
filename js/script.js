let inputValueAmount = document.getElementById('amount');
let replenishmentFormButton = document.querySelector('.replenishment-button');

// function btnDisable() {
//     replenishmentFormButton.innerHTML = 'Кнопка заблокирована!';
//     replenishmentFormButton.disabled = true;
// }

// function btnEnable() {
//     replenishmentFormButton.innerHTML = 'Пополнить счет';
//     replenishmentFormButton.disabled = false;
// }

    replenishmentFormButton.addEventListener('click', (e) => {
        e.preventDefault();
        console.log(inputValueAmount);
        
        localStorage.setItem('amount', parseInt(localStorage.getItem('amount')) + parseInt(inputValueAmount.value));

        console.log(typeof(localStorage.getItem('amount')));
        inputValueAmount.value = '';
})





function userBalance(){
    const showUserBalance = document.getElementById('general-balance');
    showUserBalance.innerHTML = localStorage.getItem('amount');
}

const openModalButton = document.querySelector('.add-expenses-button'),
      modal = document.querySelector('.modal'),
      closeModal = document.querySelector('.modal__close');

      console.log(modal)

function openModal(){
    modal.classList.add('show');
}

function removeModal(){
    modal.classList.remove('show');
}

openModalButton.addEventListener('click', () => {
    openModal();
});

closeModal.addEventListener('click', () => {
    removeModal();
});




document.addEventListener('DOMContentLoaded', () => {
    userBalance();

    
});