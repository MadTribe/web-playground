var $ = require('jquery');

console.log('inside comming soon');
setTimeout( function() {
  //$('.message').addClass('swingdrop');
  console.log('dropping');
  document.getElementsByClassName("message")[0].classList.add('swingdrop');
},1000);
