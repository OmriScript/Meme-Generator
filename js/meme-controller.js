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
}

function renderCanvas() {
  let currMeme = getCurrMeme();
  let imgUrl = getCurrMemeUrl(currMeme);
  let img = new Image();
  img.src = imgUrl;
  img.onload = drawImg(img);
  let txt = getLineTxt();
  document.querySelector('input[name="text-line"]').value = txt;
  let currLineIdx = getSelectedLineIdx();
  onDrawText(currMeme.lines[currLineIdx]);
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
