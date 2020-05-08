var buttons = document.querySelectorAll("#bottomButtons .btnMW");

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function () {
    openModal(this.getAttribute('data-toggle'));
  }, false);
}

var modalsZindex = 0;
// var openedModals = {}
function openModal(id) {

  var modal = document.getElementById(id);
  var md_display = modal.style.display;
  var md_zindex = modal.style['z-index'];

  if (md_display == '' || md_display == 'none') {
    modal.style.display = 'block';
    
    modalsZindex += 2;
    modal.style['z-index'] = modalsZindex;
    
    drawFakeBack(id);
  } else {
    modal.style.display = 'none';
  }
}

function drawFakeBack(id) {
  var modal = document.getElementById(id);
  var modal_box = modal.getBoundingClientRect();
  
  var fakeBackMW = document.querySelectorAll("#" + id + " .fakeBackMW")[0];

  fakeBackMW.style.left = -modal_box.x + 'px';
  fakeBackMW.style.top = -modal_box.y + 'px';
}




var modals = document.querySelectorAll(".modalWindow");
for (var i = 0; i < modals.length; i++) {
  modals[i].addEventListener("click", function () {
    var md_zindex = this.style['z-index'];
    if (md_zindex < modalsZindex) {
      modalsZindex += 2;
      this.style['z-index'] = modalsZindex;
    }
  }, false);
}

var modalsDrags = document.querySelectorAll(".modalWindow .dragMW");

for (var i = 0; i < modalsDrags.length; i++) {
  modalsDrags[i].addEventListener("mousedown", function (e) {
    var target = e.currentTarget;
    modal = target.parentNode.parentNode;

    modal.ondragstart = function() {
      return false;
    };

    var md_zindex = modal.style['z-index'];
    if (md_zindex < modalsZindex) {
      modalsZindex += 2;
      modal.style['z-index'] = modalsZindex;
    }

    var coords = getCoords(modal);

    var shiftX = e.pageX - coords.left;
    var shiftY = e.pageY - coords.top;
    var half_width = modal.offsetWidth / 2;

    function moveAt(e) {
      var y = e.pageY - shiftY;
      var x = e.pageX - shiftX;
      
      modal.style.left = checkWindPos(modal, x, 'x')  + half_width + 'px';
      modal.style.top = checkWindPos(modal, y, 'y') + 'px';
      drawFakeBack(modal.id);
    }

    document.onmousemove = function(e) {
      moveAt(e);
    };
  
    document.onmouseup = function() {
      document.onmousemove = null;
      document.onmouseup = null;
    };
    

  }, false);
}

function getCoords(elem) {
  var box = elem.getBoundingClientRect();
  return {
    top: box.top,
    left: box.left
  };
}

function checkWindPos(modal, n, c) {
  r = true;
  if (c == 'x') {
    if ( n + modal.offsetWidth >= window.innerWidth) {
      r = window.innerWidth - modal.offsetWidth;
    } else if (n < 0) {
      r = 0;
    } else {
      r = n;
    }
  } else if (c == 'y') {
    if ( n + modal.offsetHeight >= window.innerHeight - 90) {
      r = window.innerHeight - 90 - modal.offsetHeight;
    } else if (n < 0) {
      r = 0;
    } else {
      r = n;
    }
  }
  return r;
}

