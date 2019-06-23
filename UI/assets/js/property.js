/**
 * Post and Update Property Modals
 */
const body = document.querySelector('.body');
const modal = document.querySelector('.modal');
const postBtn = document.querySelector('#post-property-btn');
const updateBtn = document.querySelector('.update-property-btn');
const closeBtn = document.querySelector('.close');

const postModal = document.querySelectorAll('.post-modal');
const updateModal = document.querySelectorAll('.update-modal');
const propertyIdInput = document.querySelector('#id');

postBtn.addEventListener('click', e => { 
  modal.style.display = 'block';
  postModal.forEach(post => post.style.display = 'block');
  propertyIdInput.style.display = 'none';
  updateModal.forEach(update => update.style.display = 'none');
  body.style.overflow = 'hidden';
});

updateBtn.addEventListener('click', e => { 
  modal.style.display = 'block';
  updateModal.forEach(update => update.style.display = 'block');
  propertyIdInput.style.display = 'block';
  postModal.forEach(post => post.style.display = 'none');
  body.style.overflow = 'hidden';
});

closeBtn.addEventListener('click', e => modal.style.display = 'none');

window.addEventListener('click', e => {
  if(event.target == modal){
    modal.style.display = 'none'
  }
});