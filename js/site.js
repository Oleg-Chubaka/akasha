let hl = document.getElementById('mouseLight');
function moveLight(x, y){
  hl.style.left = x + 'px';
  hl.style.top = y + 'px';
}

document.addEventListener('mousemove', e => { var x = e.clientX, y = e.clientY; moveLight(x, y); });