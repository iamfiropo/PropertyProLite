/**
 * SignUp and Login Modals
 */
const modal = document.querySelector('.modal');
const modalLogin = document.querySelector('.modal-login');
const closeBtn = document.querySelectorAll('.close');

const signUpLink = document.querySelectorAll('.signup');
const signInLink = document.querySelector('.signin');
const signUpModal = document.querySelectorAll('.signup-modal');
const signInModal = document.querySelectorAll('.signin-modal');

const signInInput = document.querySelectorAll('.signin-input');

signUpLink.forEach(signup =>signup.addEventListener('click', e => {
  modal.style.display = 'block';
  signUpModal.forEach((signup) => signup.style.display = 'block');
  // signInModal.forEach((signin) => signin.style.display = 'none');
}));

signInLink.addEventListener('click', e => {
  modalLogin.style.display = 'block';
  signInModal.forEach((signin) => signin.style.display = 'block');
  // signUpModal.forEach((signup) => signup.style.display = 'none');
})

closeBtn.forEach(close => close.addEventListener('click', e => {
  modal.style.display = 'none';
  modalLogin.style.display = 'none';
  }
));

window.addEventListener('click', e => {
  if(event.target == modal){
    modal.style.display = 'none';
  } else if(event.target == modalLogin){
    modalLogin.style.display = 'none';
  }
});
