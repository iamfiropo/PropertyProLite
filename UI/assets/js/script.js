/*
  Property modal
 */
const modal = document.querySelector('.modal');
const postBtn = document.querySelector('.post-property-btn');
const closeBtn = document.querySelector('.close');

postBtn.addEventListener('click', e => { modal.style.display = 'block' });
closeBtn.addEventListener('click', e => { modal.style.display = 'none' });

window.addEventListener('click', e => {
  if(event.target == modal){
    modal.style.display = 'none'
  }
});