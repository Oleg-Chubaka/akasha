var body = document.getElementsByTagName('body')[0];
var switcher = document.getElementById('dayNightSwitcher');
var fakeBackMWs = document.querySelectorAll(".fakeBackMW");

var col_bcg = ['#000000', '#909090']
function switchBack() {
  col_bcg = col_bcg.reverse();
  body.style.background = col_bcg[0];
  for (var i = 0; i < fakeBackMWs.length; i++) {
    fakeBackMWs[i].style.background = col_bcg[0];
  }
}

switcher.addEventListener('click', switchBack);