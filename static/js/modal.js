let modal = document.getElementById('modalId');
let openModal = document.getElementById('btnRules');
let close = document.getElementById('closeId');

openModal.addEventListener('click', e => {
    modal.style.display = 'block';
});

close.addEventListener('click', e => {
    modal.style.display = 'none';
});