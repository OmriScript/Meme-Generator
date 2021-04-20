'use strict';
let gCanvas;
let gCtx;

function onInit() {
  gCanvas = document.querySelector('.meme-canvas');
  gCtx = gCanvas.getContext('2d');
  renderGallery();
}

function onDrawText(currLine) {
  // gCtx.lineWidth = 1;
  gCtx.fillStyle = `${currLine.color}`;
  // gCtx.strokeStyle = 'white';
  gCtx.font = `${currLine.size}px impact`;
  gCtx.textAlign = `${currLine.align}`;
  gCtx.fillText(`${currLine.txt}`, `${currLine.pos.x}`, `${currLine.pos.y}`);
  gCtx.strokeText(`${currLine.txt}`, `${currLine.pos.x}`, `${currLine.pos.y}`);

  // put border on curr line
  // let currLineIdx = getSelectedLineIdx();

  //
}

function renderCanvas() {
  let currMeme = getCurrMeme();
  let imgUrl = getCurrMemeUrl(currMeme);
  let img = new Image();
  img.src = imgUrl;
  img.onload = drawImg(img);

  let txt = getLineTxt();
  document.querySelector('input[name="text-line"]').value = txt;

  let lines = getLines();
  lines.map((line) => onDrawText(line));
  // onDrawText(currMeme.lines[currLineIdx]);
  // console.log(getLines());
  // onMarkSelectedLine();
}

function onEditTextLine(el) {
  editSelectedLineTxt(el.value);
  renderCanvas();
}

function drawImg(img) {
  gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
}

function renderGallery() {
  let imgs = getImgs();
  let strHTML = imgs.map((img) => {
    return `<div class="image-container"><img src=${img.url} alt="image" onclick="onClickImg(${img.id})"></div>`;
  });

  document.querySelector('.gallery-images').innerHTML = strHTML.join('');
}

function onClickImg(imgId) {
  clickImg(imgId);
  renderCanvas();
}

function onChangeTextSize(fontChange) {
  setFontSize(fontChange);
  renderCanvas();
}

function onTextLocationYChange(yChange) {
  textLocationYChange(yChange);
  renderCanvas();
}

function onTextAlign(alignDirection) {
  switch (alignDirection) {
    case 'left':
      setTextXPos(10);
      break;
    case 'center':
      setTextXPos(gCanvas.width / 2);
      break;
    case 'right':
      setTextXPos(gCanvas.width - 10);
      break;
  }
  textAlign(alignDirection);
  renderCanvas();
}

function onDeleteLine() {
  deleteLine();
  console.log('onDeleteLine activated');
  renderCanvas();
}

function onAddLine() {
  console.log('add');
  addLine();
  renderCanvas();
}

function onGetCanvasWidth() {
  return gCanvas.width;
}

function onGetCanvasHeight() {
  return gCanvas.height;
}

function onChangeLine() {
  changeLine();
  renderCanvas();
}

function onMarkSelectedLine() {
  let currLineIdx = getSelectedLineIdx();
  // console.log(currLineIdx, 'currLineIdx');
}

function toggleMenu() {
  console.log('toggleMenu');
  document.body.classList.toggle('menu-open');
}
