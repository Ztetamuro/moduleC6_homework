const btn = document.querySelector('.j-btn-test');
const iconDark = document.querySelector('.btn-icon-dark');
const iconWhite = document.querySelector('.btn-icon');

btn.addEventListener('click', ()=>{
    iconDark.classList.toggle('none');
    iconWhite.classList.toggle('none');
})