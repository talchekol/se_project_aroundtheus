

var narutoImage = document.querySelector('img');

narutoImage.onclick = function() {
  'use strict';
  var myImages = narutoImage.getAttribute('src');
  if(myImages === 'images/naruto.jpg') {
  narutoImage.setAttribute('src', 'images/naruto.jpg' );
  }
  else {
    narutoImage.setAttribute('src','images/naruto 2.jpg');
  }

}
