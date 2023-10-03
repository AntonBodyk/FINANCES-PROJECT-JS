let inputValueAmount = document.getElementById('amount');
let replenishmentFormButton = document.querySelector('.replenishment-button');


replenishmentFormButton.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.setItem('amount', parseInt(localStorage.getItem('amount')) + parseInt(inputValueAmount.value));
        console.log(typeof(localStorage.getItem('amount')));
        inputValueAmount.value = '';
        
})



function userBalance(){
    const showUserBalance = document.getElementById('general-balance');
    showUserBalance.innerHTML = localStorage.getItem('amount');
}

const openModalButton = document.querySelector('.add-expenses'),
      modal = document.querySelector('.modal'),
      closeModal = document.querySelector('.modal__close');

      console.log(modal)

function openModal(){
    // modal.classList.add('show');
    // modal.classList.remove('hide');
    // document.body.style.overflow = 'hidden';
    modal.style.display = 'block';
}

function removeModal(){
    // modal.classList.add('hide');
    // modal.classList.remove('show');
    // document.body.style.overflow = '';

    modal.style.display = 'none';
}

openModalButton.addEventListener('click', () => {
    openModal();
    // console.log('click')
});

closeModal.addEventListener('click', () => {
    removeModal();
    console.log('click')
});




document.addEventListener('DOMContentLoaded', () => {
    userBalance();
});