var $ = require('jquery');

console.log('inside comming soon');
setTimeout( function() {
  //$('.message').addClass('swingdrop');
  console.log('dropping');
  document.getElementsByClassName("message")[0].classList.add('swingdrop');
  setTimeout( function() {
      document.getElementsByClassName("humblebrag1")[0].classList.add('visible');
      setTimeout( function() {
          document.getElementsByClassName("humblebrag2")[0].classList.add('visible');
      }, 1000);

  }, 1000);
},1000);
