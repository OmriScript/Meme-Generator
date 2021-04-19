'use strict';

let gKeywords = { crazy: 1, human: 1, animal: 1, happy: 1 };
let gImgs = [
  { id: 1, url: 'img/1.jpg', keywords: ['crazy', 'human'] },
  { id: 2, url: 'img/2.jpg', keywords: ['animal', 'happy'] },
];

let gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [
    {
      txt: 'Enter Text Here 1',
      size: 40,
      align: 'left',
      color: 'white',
      pos: { x: 10, y: 50 },
    },
    {
      txt: 'Enter Text Here 2',
      size: 40,
      align: 'left',
      color: 'white',
      pos: { x: 10, y: 480 },
    },
  ],
};

function getCanvasImgId() {
  return gMeme.selectedImgId;
}

function getLineTxt() {
  let lineIdx = gMeme.selectedLineIdx;
  return gMeme.lines[lineIdx].txt;
}

function getSelectedLineIdx() {
  return gMeme.selectedLineIdx;
}

function editSelectedLineTxt(text) {
  let lineIdx = gMeme.selectedLineIdx;
  gMeme.lines[lineIdx].txt = text;
}

function getCurrMeme() {
  return gMeme;
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
  // DOTO: fix font size wont change after limit
  if (fontSize >= 60 || fontSize <= 25) {
    return;
  }
  gMeme.lines[gMeme.selectedLineIdx].size += sizeChange;
  console.log(gMeme.lines[gMeme.selectedLineIdx].size);
}
