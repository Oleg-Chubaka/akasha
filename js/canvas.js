(function() {
  var canvas = document.getElementById('hexBack');
  var switcher = document.getElementById('dayNightSwitcher');
  var colors = [['#202020', '#ffffff', '#858585', '#050505', '#101010', '#232323', '#000000', '#ffffff', '#757575', '#202020', '#000000'],
                ['#e5e5e5', '#ffffff', '#101010', '#151515', '#c5c5c5', '#ffffff', '#101010', '#ffffff', '#454545', '#404040', '#909090']];
  
  var theme = 0;

  switcher.addEventListener('click', switchDayNight);
  window.addEventListener('resize', resizeCanvas, false);
  window.addEventListener('resize', redrawCanvas, false);
  
  // Resize and redraw canvases
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    redrawCanvas();
  }
  resizeCanvas();

  function redrawCanvas() {
    ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.restore();
    ctx.save();

    drawBack();
    drawButtons();
    var backImage = canvas.toDataURL();
    $('#hexBackImg').attr("src",backImage);

    $('#windLastRead .fakeBackMW').attr("src",getModalBack('jpeg'));
    $('#windMsgs .fakeBackMW').attr("src",getModalBack('webp'));

    // var modalBack = getModalBack();
    // $('#windLastRead .fakeBackMW').attr("src",modalBack);
    // $('#windMsgs .fakeBackMW').attr("src",modalBack);
  }

  function switchDayNight(){
    if (theme == 0) {
      theme = 1;
    } else {
      theme = 0;
    }
    redrawCanvas();
  }

  function getModalBack(type) {
    var help_canvas = document.createElement('canvas');
    var help_ctx = help_canvas.getContext('2d');

    var desiredWidth = canvas.width;
    var desiredHeight = canvas.height - 90;

    help_canvas.width = desiredWidth;
    help_canvas.height = desiredHeight;

    help_ctx.restore();
    help_ctx.save();
    
    var data = canvas.getContext('2d').getImageData(0, 0, desiredWidth, desiredHeight);

    help_ctx.putImageData(data, 0, 0);

    help_ctx.globalCompositeOperation = "destination-over";

    help_ctx.fillStyle = colors[theme][10];
    help_ctx.fillRect(0, 0, desiredWidth, desiredHeight);

    var imageData = help_canvas.toDataURL("image/" + type, 1.0);

    return imageData;
  }

  // calcHex(центр Х, центр Y, радиус описаной окружности)
  function calcHex(x, y, r) {
    var h = r*0.866;

    var a = [x-r, y],
        b = [x-0.5*r, y-h],
        c = [x+0.5*r, y-h],
        d = [x+r, y],
        e = [x+0.5*r, y+h],
        f = [x-0.5*r, y+h];
    
    return [a, b, c, d, e, f];
  }

  function drawHex(points, r) {
    var ctx = canvas.getContext('2d');
    
    ctx.beginPath();
    ctx.fillStyle = colors[theme][0];
    ctx.moveTo(points[0][0], points[0][1]);
    points.forEach((e) => {
      ctx.lineTo(e[0],e[1]);
    });
    ctx.closePath();
    // ctx.shadowBlur = 0;
    // ctx.shadowOffsetX = 0;
    // ctx.shadowOffsetY = 0;
    ctx.fill();
    
    
    ctx.lineWidth = r/110;
    ctx.beginPath();
    ctx.strokeStyle = colors[theme][1];
    ctx.moveTo(points[0][0], points[0][1]);
    ctx.lineTo(points[1][0], points[1][1]);
    ctx.lineTo(points[2][0], points[2][1]);
    ctx.stroke();

    ctx.lineWidth = r/110;
    ctx.beginPath();
    ctx.strokeStyle = colors[theme][2];
    ctx.moveTo(points[2][0], points[2][1]);
    ctx.lineTo(points[3][0], points[3][1]);
    ctx.moveTo(points[5][0], points[5][1]);
    ctx.lineTo(points[0][0], points[0][1]);
    ctx.stroke();

    ctx.lineWidth = r/20;
    ctx.beginPath();
    ctx.strokeStyle = colors[theme][3];
    ctx.moveTo(points[3][0], points[3][1]);
    ctx.lineTo(points[4][0], points[4][1]);
    ctx.lineTo(points[5][0], points[5][1]);
    ctx.stroke();
  }

  function drawButtonHex(points, r) {
    var ctx = canvas.getContext('2d');

    var gradient = ctx.createLinearGradient(points[1][0], points[1][1], points[4][0], points[4][1]);

    gradient.addColorStop(0, colors[theme][4]);
    gradient.addColorStop(1, colors[theme][5]);

    ctx.beginPath();
    ctx.fillStyle = gradient;
    ctx.moveTo(points[0][0], points[0][1]);
    points.forEach((e) => {
      ctx.lineTo(e[0],e[1]);
    });
    ctx.closePath();
    ctx.shadowColor = colors[theme][6];
    ctx.shadowBlur = r*0.4;
    ctx.shadowOffsetX = -r/40;
    ctx.shadowOffsetY = -r/40;
    ctx.fill();

    ctx.lineWidth = r/60;
    ctx.beginPath();
    ctx.strokeStyle = colors[theme][7];
    ctx.moveTo(points[0][0], points[0][1]);
    ctx.lineTo(points[1][0], points[1][1]);
    ctx.lineTo(points[2][0], points[2][1]);
    ctx.stroke();

    ctx.lineWidth = r/80;
    ctx.beginPath();
    ctx.strokeStyle = colors[theme][8];
    ctx.moveTo(points[2][0], points[2][1]);
    ctx.lineTo(points[3][0], points[3][1]);
    ctx.moveTo(points[5][0], points[5][1]);
    ctx.lineTo(points[0][0], points[0][1]);
    ctx.stroke();

    ctx.lineWidth = r/20;
    ctx.beginPath();
    ctx.strokeStyle = colors[theme][9];
    ctx.moveTo(points[3][0], points[3][1]);
    ctx.lineTo(points[4][0], points[4][1]);
    ctx.lineTo(points[5][0], points[5][1]);
    ctx.stroke();
  }

  function drawBack() {
    var r = 20;
    var h = r*0.866;
    var n = r/25;
    var k = r/4.8;
    var i = 0;
    for(var ix = 0; ix < canvas.width + (r - k)*2; ix += (r - k)*2) {
      var iy = 0;
      if (i % 2 == 1) {
        iy = (h + n)*1;
      }

      for(iy; iy < canvas.height + 100; iy += (h + n)*2) {
        drawHex(calcHex(ix, iy, r), r);
      }
      
      i += 1;
    }

    // drawHex(calcHex(0, (h + n)*0, r));
    // drawHex(calcHex(0, (h + n)*2, r));
    // drawHex(calcHex(0, (h + n)*4, r));
    // drawHex(calcHex(0, (h + n)*6, r));
    // drawHex(calcHex(0, (h + n)*8, r));

    // drawHex(calcHex((r - k)*2, (h + n)*1, r));
    // drawHex(calcHex((r - k)*2, (h + n)*3, r));
    // drawHex(calcHex((r - k)*2, (h + n)*5, r));
    // drawHex(calcHex((r - k)*2, (h + n)*7, r));
    // drawHex(calcHex((r - k)*2, (h + n)*9, r));
    
    // drawHex(calcHex((r - k)*4, (h + n)*0, r));
    // drawHex(calcHex((r - k)*4, (h + n)*2, r));
    // drawHex(calcHex((r - k)*4, (h + n)*4, r));
    // drawHex(calcHex((r - k)*4, (h + n)*6, r));
    // drawHex(calcHex((r - k)*4, (h + n)*8, r));
    
    // drawHex(calcHex((r - k)*6, (h + n)*1, r));
    // drawHex(calcHex((r - k)*6, (h + n)*3, r));
    // drawHex(calcHex((r - k)*6, (h + n)*5, r));
    // drawHex(calcHex((r - k)*6, (h + n)*7, r));
    // drawHex(calcHex((r - k)*6, (h + n)*9, r));
    
    // drawHex(calcHex((r - k)*8, (h + n)*0, r));
    // drawHex(calcHex((r - k)*8, (h + n)*2, r));
    // drawHex(calcHex((r - k)*8, (h + n)*4, r));
    // drawHex(calcHex((r - k)*8, (h + n)*6, r));
    // drawHex(calcHex((r - k)*8, (h + n)*8, r));
  }

  function drawButtons() {
    var cw = canvas.width/2;
    var h = canvas.height - 50;

    // Меню
    drawButtonHex(calcHex(cw, h, 40), 40);

    drawButtonHex(calcHex(cw + 90, h + 6, 28), 27);
    drawButtonHex(calcHex(cw - 90, h + 6, 28), 27);
    drawButtonHex(calcHex(cw + 170, h + 6, 28), 27);
    drawButtonHex(calcHex(cw - 170, h + 6, 28), 27);
    drawButtonHex(calcHex(cw + 250, h + 6, 28), 27);
    drawButtonHex(calcHex(cw - 250, h + 6, 28), 27);
  }

})();