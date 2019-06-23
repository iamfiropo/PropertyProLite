/**
 * header harmburger
 */
const container = document.querySelector('.container');
const wrapper = document.querySelector('.wrapper');
const logo = document.querySelector('.logo');
const harmburger = document.querySelector('.harmburger');
const navLinks = document.querySelectorAll('.nav-link');

harmburger.addEventListener('click', e => {
  navLinks.forEach(navlink => {
    navlink.style.display = 'inline-flex';
    harmburger.style.display = 'none';
    logo.style.textAlign = 'center';
  })
})






