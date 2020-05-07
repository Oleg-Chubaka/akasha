let hl = document.getElementById('mouseLight');
function moveLight(x, y){
  hl.style.left = x + 'px';
  hl.style.top = y + 'px';
}

document.addEventListener('mousemove', e => { var x = e.clientX, y = e.clientY; moveLight(x, y); });

var body = document.getElementsByTagName('body')[0];
var switcher = document.getElementById('dayNightSwitcher');

var col_bcg = ['#000000', '#909090']
function switchBack() {
  col_bcg = col_bcg.reverse();
  body.style.background = col_bcg[0];
}

switcher.addEventListener('click', switchBack);

