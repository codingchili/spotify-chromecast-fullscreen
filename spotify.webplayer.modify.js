var frame = document.getElementById('now-playing');
var logo = document.getElementById('logo');

function install() {
  var exitButton = document.createElement('a');
  exitButton.className = 'logo';
  exitButton.innerHTML = '<h6>close</h6>';
  exitButton.style.cssText = 'top: 0px; height: 32px; left: 49%; width: 32px; font-size: 9px; position: absolute;';
  frame.appendChild(exitButton);
  frame.insertBefore(exitButton, frame.firstChild);

  exitButton.addEventListener('mousedown', function (e) {
    frame.style.width = '190px';
    frame.style.zIndex = 0;
    console.log('exiting chromecast mode..');
  });

  logo.addEventListener('mousedown', function (e) {
    frame.style.width = '100%'; 
    frame.style.zIndex = 1000;
    console.log('entering chromecast mode..');
  });

  console.log('chromecast mode initialized, press spotify logo to enter and ESC to leave.');
}

install();