console.log('main.js');

require.ensure(['./comingsoon.js'], function(require){

  require('./comingsoon.js');
  console.log('came soon');

});
