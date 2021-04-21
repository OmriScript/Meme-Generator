'use strict';

let gSavedMemes = [];
let gKeywords = { crazy: 1, human: 1, animal: 1, happy: 1 };
let gImgs = [
  { id: 1, url: 'img/1.jpg', keywords: ['crazy', 'human'] },
  { id: 2, url: 'img/2.jpg', keywords: ['animal', 'happy', 'love'] },
  { id: 3, url: 'img/3.jpg', keywords: ['animal', 'human', 'sleep', 'baby'] },
  { id: 4, url: 'img/4.jpg', keywords: ['animal', 'happy', 'sleep'] },
  { id: 5, url: 'img/5.jpg', keywords: ['human', 'baby', 'funny'] },
  { id: 6, url: 'img/6.jpg', keywords: ['human'] },
  { id: 7, url: 'img/7.jpg', keywords: ['human', 'baby'] },
  { id: 8, url: 'img/8.jpg', keywords: ['human', 'smiling'] },
  { id: 9, url: 'img/9.jpg', keywords: ['human', 'baby'] },
  { id: 10, url: 'img/10.jpg', keywords: ['human', 'happy'] },
  { id: 11, url: 'img/11.jpg', keywords: ['human', 'gay'] },
  { id: 12, url: 'img/12.jpg', keywords: ['human'] },
  { id: 13, url: 'img/13.jpg', keywords: ['human', 'toast'] },
  { id: 14, url: 'img/14.jpg', keywords: ['human'] },
  { id: 15, url: 'img/15.jpg', keywords: ['human'] },
  { id: 16, url: 'img/16.jpg', keywords: ['human'] },
  { id: 17, url: 'img/17.jpg', keywords: ['human', 'suit'] },
  { id: 18, url: 'img/18.jpg', keywords: ['toy', 'movie'] },
];

let gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [
    {
      txt: 'Enter Text Here 1',
      size: 40,
      align: 'left',
      color: '#ffffff',
      font: 'Impact',
      pos: { x: 10, y: 50 },
    },
    {
      txt: 'Enter Text Here 2',
      size: 40,
      align: 'left',
      color: '#ffffff',
      font: 'Impact',
      pos: { x: 10, y: 480 },
    },
  ],
};

function getCanvasImgId() {
  return gMeme.selectedImgId;
}

function getLineTxt() {
  if (!gMeme.lines.length) {
    return '';
  }
  let lineIdx = gMeme.selectedLineIdx;
  return gMeme.lines[lineIdx].txt;
}

function getSelectedLineIdx() {
  return gMeme.selectedLineIdx;
}

function getSelectedLine() {
  return gMeme.lines[gMeme.selectedLineIdx];
}

function editSelectedLineTxt(text) {
  let lineIdx = gMeme.selectedLineIdx;
  gMeme.lines[lineIdx].txt = text;
}

function getCurrMeme() {
  return gMeme;
}

function getLines() {
  return gMeme.lines;
}

function getImgById(imgId) {
  return gImgs.find((img) => img.id === imgId);
}

function getCurrMemeUrl(meme) {
  let img = getImgById(meme.selectedImgId);
  return img.url;
}

function getImgs() {
  return gImgs;
}

function clickImg(imgId) {
  gMeme.selectedImgId = imgId;
}

function setFontSize(sizeChange) {
  let fontSize = gMeme.lines[gMeme.selectedLineIdx].size;
  // limit font size between 25 and 60
  if (
    (fontSize >= 60 && sizeChange > 0) ||
    (fontSize <= 25 && sizeChange < 0)
  ) {
    return;
  }
  gMeme.lines[gMeme.selectedLineIdx].size += sizeChange;
}

function textLocationYChange(yChange) {
  gMeme.lines[gMeme.selectedLineIdx].pos.y += yChange;
}

function setTextXPos(xPos) {
  gMeme.lines[gMeme.selectedLineIdx].pos.x = xPos;
}

function textAlign(alignDirection) {
  gMeme.lines[gMeme.selectedLineIdx].align = alignDirection;
}

function deleteLine() {
  // if (!gMeme.lines) return;
  let lineIdx = gMeme.selectedLineIdx;
  // console.log('lineIdx', lineIdx);
  gMeme.lines.splice(lineIdx, 1);
  if (!gMeme.lines[gMeme.selectedLineIdx + 1]) gMeme.selectedLineIdx = 0;
}

function addLine() {
  let newLine = _createLine();
  gMeme.lines.push(newLine);
  gMeme.selectedLineIdx = gMeme.lines.length - 1;
}

function _createLine() {
  return {
    txt: 'Enter New Text Here',
    size: 40,
    align: 'left',
    color: '#ffffff',
    font: 'Impact',
    pos: { x: 10, y: onGetCanvasHeight() / 2 },
  };
}

function changeLine() {
  // console.log(gMeme.lines[1]);
  // if(gMeme.selectedLineIdx)
  if (gMeme.lines[gMeme.selectedLineIdx + 1]) {
    gMeme.selectedLineIdx++;
  } else {
    gMeme.selectedLineIdx = 0;
  }
}

function changeTextColor(color) {
  gMeme.lines[gMeme.selectedLineIdx].color = color;
}

function getTextColor() {
  return gMeme.lines[gMeme.selectedLineIdx].color;
}

function changeStrokeColor(newStrokeColor) {
  let strokeColor = newStrokeColor;
  gMeme.lines[gMeme.selectedLineIdx].strokeColor = strokeColor;
}

function getStrokeColor() {
  return gMeme.lines[gMeme.selectedLineIdx].strokeColor;
}

function fontChange(newFont) {
  gMeme.lines[gMeme.selectedLineIdx].font = newFont;
}

function getDefaultFont() {
  return gMeme.lines[gMeme.selectedLineIdx].font;
}

function getPos() {
  return gMeme.lines[gMeme.selectedLineIdx].pos;
}

function getFontSize() {
  return gMeme.lines[gMeme.selectedLineIdx].size;
}
function getLineText() {
  return gMeme.lines[gMeme.selectedLineIdx].txt;
}

function resetMeme() {
  gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
      {
        txt: 'Enter Text Here 1',
        size: 40,
        align: 'left',
        color: '#ffffff',
        font: 'Impact',
        pos: { x: 10, y: 50 },
      },
      {
        txt: 'Enter Text Here 2',
        size: 40,
        align: 'left',
        color: '#ffffff',
        font: 'Impact',
        pos: { x: 10, y: 480 },
      },
    ],
  };
}

function saveMeme() {
  gSavedMemes.push(gMeme);
  // console.log(gSavedMemes);
  // console.log(gMeme);
}
