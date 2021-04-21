'use strict';
let gCanvas;
let gCtx;
let gIsDownload = false;

function onInit() {
  gCanvas = document.querySelector('.meme-canvas');
  gCtx = gCanvas.getContext('2d');
  renderGallery();
}

function onDrawText(currLine) {
  if (currLine.strokeColor) {
    gCtx.strokeStyle = currLine.strokeColor;
  } else {
    gCtx.strokeStyle = '#000000';
  }
  gCtx.fillStyle = `${currLine.color}`;
  gCtx.font = `${currLine.size}px ${currLine.font}`;
  gCtx.textAlign = `${currLine.align}`;
  gCtx.fillText(`${currLine.txt}`, `${currLine.pos.x}`, `${currLine.pos.y}`);
  gCtx.strokeText(`${currLine.txt}`, `${currLine.pos.x}`, `${currLine.pos.y}`);
  // gCtx.strokeRect(100, 100, 200, 200);

  // put border on curr line
  // let currLineIdx = getSelectedLineIdx();
  // let strokeColor = getStrokeColor();
  // console.log(strokeColor, 'strokeColor');
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
  if (!gIsDownload) {
    markSelectedLine();
  }

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
  showEditorHideGallery();
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
  addLine();
  resetFontOption();
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

function toggleMenu() {
  console.log('toggleMenu');
  document.body.classList.toggle('menu-open');
}

function showEditorHideGallery() {
  document.querySelector('.editor-container').style.display = 'flex';
  document.querySelector('.gallery-container').style.display = 'none';
}

function showGalleryHideEditor() {
  resetMeme();
  document.querySelector('.editor-container').style.display = 'none';
  document.querySelector('.gallery-container').style.display = 'block';
}

function onChangeTextColor(el) {
  let color = el.value;
  changeTextColor(color);
  renderCanvas();
}

function onGetTextColor() {
  let color = getTextColor();
  document.querySelector('input[id="text-color-picker"]').value = color;
}

function onChangeStrokeColor(el) {
  let strokeColor = el.value;
  changeStrokeColor(strokeColor);
  renderCanvas();
}

function onGetStrokeColor() {
  let strokeColor = getStrokeColor();
  document.querySelector('input[id="stroke-color-picker"]').value = strokeColor;
}

function onFontChange(el) {
  let font = el.value;
  fontChange(font);
  renderCanvas();
}

function resetFontOption() {
  let defaultFont = getDefaultFont();
  document.querySelector('select[name="font-select"]').value = defaultFont;
}

function markSelectedLine() {
  let posX = getPos().x;
  let posY = getPos().y;
  let fontSize = getFontSize();
  drawRect(posX - 6, posY - fontSize);
}

// TODO: fix blue outline

function drawRect(x, y) {
  gCtx.beginPath();
  let fontSize = getFontSize();
  let lineText = getLineText();
  let lineTextProps = gCtx.measureText(lineText);
  let rectWidth = lineTextProps.actualBoundingBoxRight + 10;
  // console.log(lineTextProps);
  // console.log(lineTextProps.actualBoundingBoxAscent);
  gCtx.rect(x, y, rectWidth, fontSize + 6);
  gCtx.strokeStyle = 'blue';
  gCtx.stroke();
}

function downloadCanvas(elLink) {
  gIsDownload = true;
  renderCanvas();
  const data = gCanvas.toDataURL();
  elLink.href = data;
  elLink.download = 'myMeme';
  gIsDownload = false;
  renderCanvas();
}

function onSaveMeme() {
  saveMeme();
}
