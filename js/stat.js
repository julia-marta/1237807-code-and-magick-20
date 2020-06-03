'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var TOP_GAP = CLOUD_Y + 25;
var BOTTOM_GAP = CLOUD_HEIGHT - 25;
var LEFT_GAP = CLOUD_X - 15;
var CENTER_GAP = (CLOUD_WIDTH / 2) - 53;
var FONT_GAP = 17;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;
var BAR_GAP = 50;

var renderCloud = function (ctx, x, y, color) {
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 2;
  ctx.fillStyle = color || '#fff';
  ctx.beginPath();
  ctx.moveTo(x, y);

  var cloudSteps = [
    {x: 125, y: 0},
    {x: 125, y: 20},
    {x: 150, y: 20},
    {x: 150, y: 40},
    {x: 275, y: 40},
    {x: 275, y: 20},
    {x: 300, y: 20},
    {x: 300, y: 0},
    {x: 425, y: 0},
    {x: 425, y: 20},
    {x: 450, y: 20},
    {x: 450, y: 40},
    {x: 475, y: 40},
    {x: 475, y: 60},
    {x: 500, y: 60},
    {x: 500, y: 140},
    {x: 475, y: 140},
    {x: 475, y: 175},
    {x: 450, y: 175},
    {x: 450, y: 195},
    {x: 425, y: 195},
    {x: 425, y: 215},
    {x: 400, y: 215},
    {x: 400, y: 235},
    {x: 375, y: 235},
    {x: 375, y: 255},
    {x: 325, y: 255},
    {x: 325, y: 275},
    {x: 100, y: 275},
    {x: 100, y: 255},
    {x: 50, y: 255},
    {x: 50, y: 235},
    {x: 25, y: 235},
    {x: 25, y: 215},
    {x: 0, y: 215},
    {x: 0, y: 195},
    {x: -25, y: 195},
    {x: -25, y: 175},
    {x: -50, y: 175},
    {x: -50, y: 140},
    {x: -75, y: 140},
    {x: -75, y: 60},
    {x: -50, y: 60},
    {x: -50, y: 40},
    {x: -25, y: 40},
    {x: -25, y: 20},
    {x: 0, y: 20},
    {x: 0, y: 0}
  ];

  for (var i = 0; i < cloudSteps.length; i++) {
    ctx.lineTo(x + cloudSteps[i].x, y + cloudSteps[i].y);
  }

  ctx.closePath();
  ctx.stroke();
  ctx.fill();
};

var renderText = function (ctx, text, x, y, color) {
  ctx.fillStyle = color || '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText(text, x, y);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

var getRandomColor = function () {
  var hue = 240;
  var saturation = Math.round(Math.random() * 100);
  var lightness = 50;
  return 'hsl(' + hue + ', ' + saturation + '%, ' + lightness + '%)';
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  renderText(ctx, 'Ура вы победили!', LEFT_GAP, TOP_GAP);
  renderText(ctx, 'Список результатов:', LEFT_GAP, TOP_GAP + FONT_GAP);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    var barHeight = (BAR_HEIGHT * times[i]) / maxTime;
    var barX = CENTER_GAP + (BAR_WIDTH + BAR_GAP) * i;
    var barY = (BAR_HEIGHT - barHeight) + TOP_GAP;

    renderText(ctx, Math.round(times[i]), barX, barY + FONT_GAP * 2);
    renderText(ctx, players[i], barX, BOTTOM_GAP);

    ctx.fillStyle = (players[i] === 'Вы') ? 'rgba(255, 0, 0, 1)' : getRandomColor();
    ctx.fillRect(barX, barY + FONT_GAP * 3, BAR_WIDTH, barHeight);
  }
};
