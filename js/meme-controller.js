'use strict';

let gCanvas;
let gCtx;
let gIsDownload = false;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];
let gStartPos;
let gText = {
  pos: getPos(),
  fontSize: getFontSize(),
  isDragging: getIsDragging(),
};

function onInit() {
  gCanvas = document.querySelector('.meme-canvas');
  gCtx = gCanvas.getContext('2d');
  addListeners();
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
  onUpdateGText();
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
  showEditor();
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
  document.body.classList.toggle('menu-open');
}

function showEditor() {
  document.querySelector('.editor-container').style.display = 'flex';
  document.querySelector('.gallery-container').style.display = 'none';
  document.querySelector('.saved-memes-container').style.display = 'none';
}

function showGallery() {
  toggleMenu();
  resetMeme();
  document.querySelector('.editor-container').style.display = 'none';
  document.querySelector('.saved-memes-container').style.display = 'none';

  document.querySelector('.gallery-container').style.display = 'block';
}

function showSavedMemes() {
  toggleMenu();
  document.querySelector('.saved-memes-container').style.display = 'block';
  document.querySelector('.editor-container').style.display = 'none';
  document.querySelector('.gallery-container').style.display = 'none';
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

function drawRect(x, y) {
  gCtx.beginPath();
  let fontSize = getFontSize();
  let lineText = getLineText();
  let lineTextProps = gCtx.measureText(lineText);
  let rectWidth = lineTextProps.actualBoundingBoxRight + 10;
  gCtx.rect(x, y, rectWidth, fontSize + 6);
  gCtx.strokeStyle = 'blue';
  gCtx.stroke();
}

function downloadCanvas(elLink) {
  // download img without line focus
  gIsDownload = true;
  renderCanvas();
  const data = gCanvas.toDataURL();
  elLink.href = data;
  elLink.download = 'myMeme';
  gIsDownload = false;
  renderCanvas();
}

function onSaveMeme() {
  // save img without line focus
  gIsDownload = true;
  renderCanvas();
  let imgCanvas = gCanvas.toDataURL();
  saveMeme(imgCanvas);
  renderSavedMemes();
  showSavedMemes();
  toggleMenu();
  gIsDownload = false;
}

function renderSavedMemes() {
  let savedMemes = getSavedMemes();
  // h1 wont show
  if (!savedMemes) {
    document.querySelector('.saved-memes-container h1 ').innerHTML =
      'You dont have saved memes.';
    return;
  }
  let memesHTML = savedMemes.map((meme) => {
    return `<div class="image-container"><img src=${meme.imgCanvas} alt="image" onclick="onLoadMeme(this)"></div>`;
  });
  document.querySelector('.gallery-saved-memes').innerHTML = memesHTML.join('');
}

// bug with meme.id as the func param (line 34)
function onLoadMeme(el) {
  loadMeme(el);
}

function onUpdateGText() {
  gText = {
    pos: getPos(),
    fontSize: getFontSize(),
    isDragging: getIsDragging(),
  };
}

function addListeners() {
  addMouseListeners();
  addTouchListeners();
  window.addEventListener('resize', () => {
    renderCanvas();
  });
}

function addMouseListeners() {
  gCanvas.addEventListener('mousemove', onMove);
  gCanvas.addEventListener('mousedown', onDown);
  gCanvas.addEventListener('mouseup', onUp);
}

function addTouchListeners() {
  gCanvas.addEventListener('touchmove', onMove);
  gCanvas.addEventListener('touchstart', onDown);
  gCanvas.addEventListener('touchend', onUp);
}

function onDown(ev) {
  const pos = getEvPos(ev);
  if (!isTextClicked(pos)) return;
  gText.isDragging = true;
  gStartPos = pos;
  document.querySelector('canvas').style.cursor = 'grabbing';
}

function onMove(ev) {
  if (gText.isDragging) {
    const pos = getEvPos(ev);
    if (!gStartPos) return;
    const dx = pos.x - gStartPos.x;
    const dy = pos.y - gStartPos.y;
    gText.pos.x += dx;
    gText.pos.y += dy;
    gStartPos = pos;
    renderCanvas();
  }
}

function onUp() {
  gText.isDragging = false;
  document.querySelector('canvas').style.cursor = 'grab';
}

function getEvPos(ev) {
  let pos = {
    x: ev.offsetX,
    y: ev.offsetY,
  };
  if (gTouchEvs.includes(ev.type)) {
    ev.preventDefault();
    ev = ev.changedTouches[0];
    pos = {
      x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
      y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
    };
  }
  return pos;
}

function isTextClicked(clickedPos) {
  const { pos } = gText;
  const distance = Math.sqrt(
    (pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2
  );
  return distance >= gText.fontSize;
}
