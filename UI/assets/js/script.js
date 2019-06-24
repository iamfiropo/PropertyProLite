/**
 * header harmburger
 */
const harmburger = document.querySelector('.harmburger');
const navLinks = document.querySelectorAll('.navlink');

harmburger.addEventListener('click', event => {
  navLinks.forEach(navlink => {
    if(navlink.style.display === 'flex') {
      navlink.style.display = 'none'
    }else{ navlink.style.display = 'flex' }
  }
)});
