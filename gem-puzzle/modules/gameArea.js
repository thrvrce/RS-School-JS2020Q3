// eslint-disable-next-line import/extensions
// import getSolution from './getSolution.js';

export default class GameArea {
  constructor() {
    this.audioVictory = new Audio('./Sound/Victory.mp3');
    this.audioYes = new Audio('./Sound/yes.mp3');
    this.audioNo = new Audio('./Sound/no.mp3');

    this.gameArea = document.createElement('div');
    this.gameArea.classList.add('gameArea');
    document.body.appendChild(this.gameArea);

    this.InfoAndCtrl = document.createElement('div');
    this.InfoAndCtrl.classList.add('gameArea-InfoAndCtrl');
    this.gameArea.appendChild(this.InfoAndCtrl);

    this.menuBtn = document.createElement('button');
    this.menuBtn.classList.add('gameArea-InfoAndCtrl-menuBtn');
    this.menuBtn.textContent = 'Menu';
    this.InfoAndCtrl.appendChild(this.menuBtn);

    this.info = document.createElement('div');
    this.info.classList.add('gameArea-InfoAndCtrl-info');
    this.InfoAndCtrl.appendChild(this.info);

    this.mode = document.createElement('div');
    this.mode.id = 'Mode';
    this.mode.textContent = 'Mode: ';
    this.info.appendChild(this.mode);

    this.score = document.createElement('div');
    this.score.id = 'Score';
    this.score.textContent = 'Score: ';
    this.info.appendChild(this.score);

    this.time = document.createElement('div');
    this.time.id = 'Time';
    this.time.textContent = 'Time: ';
    this.info.appendChild(this.time);

    this.puzzleArea = document.createElement('canvas');
    this.puzzleArea.classList.add('gameArea-puzzle');
    this.gameArea.appendChild(this.puzzleArea);
    this.context = this.puzzleArea.getContext('2d');
    this.puzzleArea.width = 700;
    this.puzzleArea.height = 700;

    this.gameArea.isAutoplay = false;
    this.gameArea.Autoplay = null;

    this.gameArea.timer = null;
  }

  getMainNode() {
    return this.gameArea;
  }

  getMenuButtonRef() {
    return this.menuBtn;
  }

  getGameInfoRef() {
    return { mode: this.mode, score: this.score, time: this.time };
  }

  updateTime() {
    return setInterval(() => {
      this.PuzzleObj.time += (!this.PuzzleObj.isResolved) ? 1 : 0;

      this.time.textContent = `Time: ${this.addZero(Math.floor(this.PuzzleObj.time / 60))}:${this.addZero(this.PuzzleObj.time % 59 || 59)}`;
    }, 1000);
  }

  addZero(strToParse) {
    return ((parseInt(strToParse, 10) < 10) ? '0' : '') + strToParse;
  }

  DrawNewPuzzle(NumOfPieces = 3, image = './images/1.jpg') {
    this.clearCanvas();
    this.clearGameInfo();
    this.mode.textContent = `Mode: ${NumOfPieces}x${NumOfPieces}`;
    this.PuzzleObj = {};
    this.PuzzleObj.NumOfPieces = NumOfPieces;
    this.PuzzleObj.image = image;
    this.PuzzleObj.Score = 0;
    this.score.textContent = `Score: ${this.PuzzleObj.Score}`;
    this.PuzzleObj.time = 0;
    this.time.textContent = `Time: 00:${this.addZero(this.PuzzleObj.time)}`;
    this.PuzzleObj.CanMove = true;
    this.PuzzleObj.isResolved = false;
    this.PuzzleObj.isUseSound = true;
    this.PuzzleObj.isAutoplay = false;
    this.image = new Image();
    this.image.onload = () => {
      this.context = this.puzzleArea.getContext('2d');
      this.PuzzleObj.borderWeight = 3;
      this.PuzzleObj.itemSize = this.puzzleArea.width / NumOfPieces;
      this.PuzzleObj.Pieces = [];
      const NumofPiecesOnCanvas = NumOfPieces ** 2;
      const usedPos = [];
      let numIter = 0;
      while (numIter < NumofPiecesOnCanvas) {
        const i = Math.floor(Math.random() * (NumofPiecesOnCanvas));
        if (usedPos.indexOf(i) === -1) {
          usedPos.push(i);
          this.PuzzleObj.Pieces[i] = {
            PosSrc: numIter,
            PosDst: i,
            sx: (this.image.width / this.PuzzleObj.NumOfPieces) * (numIter % this.PuzzleObj.NumOfPieces),
            sy: (this.image.height / this.PuzzleObj.NumOfPieces) * Math.floor((numIter) / this.PuzzleObj.NumOfPieces),
            sWidth: this.image.width / NumOfPieces,
            sHeight: this.image.height / NumOfPieces,
            dx: this.PuzzleObj.itemSize * (i % this.PuzzleObj.NumOfPieces) + this.PuzzleObj.borderWeight,
            dy: this.PuzzleObj.itemSize * Math.floor((i) / this.PuzzleObj.NumOfPieces) + this.PuzzleObj.borderWeight,
            dWidth: this.PuzzleObj.itemSize - this.PuzzleObj.borderWeight * 2,
            dHeight: this.PuzzleObj.itemSize - this.PuzzleObj.borderWeight * 2,
            isFree: (numIter === (NumofPiecesOnCanvas - 1)),
          };
          this.PuzzleObj.Pieces[i].dxCenter = this.PuzzleObj.Pieces[i].dx + this.PuzzleObj.Pieces[i].dWidth / 2;
          this.PuzzleObj.Pieces[i].dyCenter = this.PuzzleObj.Pieces[i].dy + this.PuzzleObj.Pieces[i].dHeight / 2;
          this.drawPiece(this.PuzzleObj.Pieces[i]);

          numIter += 1;
        }
      }
      // console.log(this.PuzzleObj);
      // console.log(JSON.stringify(this.PuzzleObj));
      // console.log(JSON.parse(JSON.stringify(this.PuzzleObj)));
    };
    this.image.src = this.PuzzleObj.image;
    if (this.gameArea.timer !== null) {
      clearInterval(this.gameArea.timer);
    }
    this.gameArea.timer = this.updateTime();
  }

  clearCanvas() {
    this.context.clearRect(0, 0, 700, 700);
    return true;
  }

  clearGameInfo() {
    this.mode.textContent = 'Mode: ';
    this.score.textContent = 'Score: ';
    this.time.textContent = 'Time: ';
    return true;
  }

  getPuzzlePieceByCoord(x, y) {
    let indx;
    this.PuzzleObj.Pieces.forEach((element, index) => {
      if (x > element.dx
           && x < (element.dx + element.dWidth)
           && y > element.dy
           && y < (element.dy + element.dHeight)) {
        // obj = element;
        indx = index;
      }
    });
    return indx;
  }

  isMovablePiece(index) {
    let isMovable = false;
    const freeRect = this.PuzzleObj.Pieces[this.getFreePieseIndex()];
    const piece = this.PuzzleObj.Pieces[index];
    if (!piece.isFree) {
      const spaceBtweenCenters = Math.sqrt(((freeRect.dxCenter - piece.dxCenter) ** 2) + ((freeRect.dyCenter - piece.dyCenter) ** 2));
      isMovable = (spaceBtweenCenters <= freeRect.sWidth);
    }
    if (isMovable) {
      this.doSound('Yes');
    } else {
      this.doSound('No');
    }
    return isMovable;
  }

  setMoveOption(opt) {
    this.PuzzleObj.CanMove = opt;
  }

  move(index) {
    const freeRect = this.getFreePieseIndex();
    const buffS = {
      PosDst: this.PuzzleObj.Pieces[index].PosDst,
      dx: this.PuzzleObj.Pieces[index].dx,
      dy: this.PuzzleObj.Pieces[index].dy,
      dxCenter: this.PuzzleObj.Pieces[index].dxCenter,
      dyCenter: this.PuzzleObj.Pieces[index].dyCenter,
    };

    this.PuzzleObj.Pieces[index].PosDst = this.PuzzleObj.Pieces[freeRect].PosDst;
    this.PuzzleObj.Pieces[index].dx = this.PuzzleObj.Pieces[freeRect].dx;
    this.PuzzleObj.Pieces[index].dy = this.PuzzleObj.Pieces[freeRect].dy;
    this.PuzzleObj.Pieces[index].dxCenter = this.PuzzleObj.Pieces[freeRect].dxCenter;
    this.PuzzleObj.Pieces[index].dyCenter = this.PuzzleObj.Pieces[freeRect].dyCenter;
    this.drawPiece(this.PuzzleObj.Pieces[index]);

    this.PuzzleObj.Pieces[freeRect].PosDst = buffS.PosDst;
    this.PuzzleObj.Pieces[freeRect].dx = buffS.dx;
    this.PuzzleObj.Pieces[freeRect].dy = buffS.dy;
    this.PuzzleObj.Pieces[freeRect].dxCenter = buffS.dxCenter;
    this.PuzzleObj.Pieces[freeRect].dyCenter = buffS.dyCenter;
    this.drawPiece(this.PuzzleObj.Pieces[freeRect]);

    this.PuzzleObj.Score += 1;
    this.score.textContent = `Score: ${this.PuzzleObj.Score}`;

    if (this.CheckIfPuzzleComplete()) {
      this.doSound('Victory');
      this.PuzzleObj.isResolved = true;
      this.PuzzleObj.CanMove = false;
      const message = `Ура! Вы решили головоломку за ${this.addZero(Math.floor(this.PuzzleObj.time / 60))}:${this.addZero(this.PuzzleObj.time % 59 || 59)} и ${this.PuzzleObj.Score} ходов`;
      setTimeout(() => {
        alert(message);
      }, 1000);
    }
  }

  getFreePieseIndex() {
    let forret;
    this.PuzzleObj.Pieces.forEach((element, index) => {
      if (element.isFree) {
        forret = index;
      }
    });
    return forret;
  }

  getPieseIndexbyPosSrc(PosSrc) {
    let forret;
    this.PuzzleObj.Pieces.forEach((element, index) => {
      if (element.PosSrc === PosSrc) {
        forret = index;
      }
    });
    return forret;
  }

  getPieseIndexbyPosDst(PosDst) { // получить индекс элемента по позиции на холсте
    let forret;
    this.PuzzleObj.Pieces.forEach((element, index) => {
      if (element.PosDst === PosDst) {
        forret = index;
      }
    });
    return forret;
  }

  isPieceResolvedByPosSrc(PosSrc) {
    let forret = false;
    const element = this.PuzzleObj.Pieces[this.getPieseIndexbyPosSrc(PosSrc)];
    if (element.PosSrc === element.PosDst) {
      forret = true;
    }
    return forret;
  }

  drawPiece(piece) {
    if (!piece.isFree) {
      this.context.drawImage(this.image,
        piece.sx,
        piece.sy,
        piece.sWidth,
        piece.sHeight,
        piece.dx,
        piece.dy,
        piece.dWidth,
        piece.dHeight);

      this.context.font = '26px Arial';
      this.context.fillStyle = 'white';
      this.context.fillText(piece.PosSrc,
        piece.dxCenter,
        piece.dyCenter);
    } else {
      this.context.fillStyle = 'white';
      this.context.fillRect(
        piece.dx,
        piece.dy,
        piece.dWidth,
        piece.dHeight,
      );
    }
  }

  CheckIfPuzzleComplete() {
    let isComplete = true;
    this.PuzzleObj.Pieces.forEach((element) => {
      if (element.PosSrc !== element.PosDst) {
        isComplete = false;
      }
    });
    return isComplete;
  }

  doSound(type) {
    if (this.PuzzleObj.isUseSound) {
      switch (type) {
        case 'Yes':
          this.audioYes.play(); break;
        case 'No':
          this.audioNo.play(); break;
        case 'Victory':
          this.audioVictory.play(); break;
        default: break;
      }
    }
  }

  getMinStartPos() {
    let minVal = 0;
    let i = 0;
    while (this.isPieceResolvedByPosSrc(i)) {
      minVal += 1;
      i += 1;
    }
    return minVal;
  }

  // tryToResolve() {//решение перебором, не актуально
  //   if (this.gameArea.isAutoplay) {
  //     return setInterval(() => {
  //       this.PuzzleObj.isUseSound = false;
  //       if (!this.PuzzleObj.isResolved) {
  //         const min = this.getMinStartPos();
  //         const max = (this.PuzzleObj.NumOfPieces ** 2);
  //         const i = Math.floor(Math.random() * (max - min)) + min;
  //         const j = this.getPieseIndexbyPosSrc(i);
  //         if (this.isMovablePiece(j)) {
  //           this.move(j);
  //         }
  //       }
  //       this.PuzzleObj.isUseSound = true;
  //     }, 1);
  //   }
  // }

  // алгоритмическое авторешение
  tryToResolveAlg(Solution) {
    // const Solution = getSolution(this.getCurPuzzleAsArray(), this);
    console.log(Solution);
    if (Solution.lentgth !== 0) {
      let timeout = 0;
      Solution.forEach((value) => {
        const IndexOfMovedPiece = this.getPieseIndexbyPosSrc(value);
        // this.move(IndexOfMovedPiece);
        timeout += 1200;
        setTimeout((v) => { this.move(v); }, timeout, IndexOfMovedPiece);
      });
    }
  }

  getCurPuzzleAsArray() { // преобразование текущего паззла в массив для последующего преобразования в упрощенный объект-узел дерева состояний
    const arrOfItems = [];

    for (let i = 0; i < this.PuzzleObj.NumOfPieces ** 2; i++) {
      arrOfItems.push(this.PuzzleObj.Pieces[this.getPieseIndexbyPosDst(i)].PosSrc);
    }
    return arrOfItems;
  }
}
