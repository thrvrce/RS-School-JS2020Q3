export default class GameArea {
  constructor() {
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

  testDrawExt(NumOfPieces = 8) {
    this.PuzzleObj = {};
    this.PuzzleObj.NumOfPieces = NumOfPieces;
    this.PuzzleObj.image = '../images/1.jpg';
    this.image = new Image();
    this.image.onload = () => {
      this.context = this.puzzleArea.getContext('2d');
      this.PuzzleObj.borderWeight = 3;
      this.PuzzleObj.itemSize = this.puzzleArea.width / NumOfPieces;
      this.PuzzleObj.Pieces = [];
      const NumofPiecesOnCanvas = NumOfPieces ** 2;
      const usedPos = [];
      let numIter = 0;
      // for (let i = 0; i < NumofPiecesOnCanvas; i++) {
      while (numIter < NumofPiecesOnCanvas) {
        const i = Math.floor(Math.random() * (NumofPiecesOnCanvas));

        if (usedPos.indexOf(i) === -1) {
          // console.log(`${numIter} ${i}`);

          usedPos.push(i);
          this.PuzzleObj.Pieces[i] = {
            PosSrc: numIter,
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

          if (!this.PuzzleObj.Pieces[i].isFree) {
            this.context.drawImage(this.image,
              this.PuzzleObj.Pieces[i].sx,
              this.PuzzleObj.Pieces[i].sy,
              this.PuzzleObj.Pieces[i].sWidth,
              this.PuzzleObj.Pieces[i].sHeight,
              this.PuzzleObj.Pieces[i].dx,
              this.PuzzleObj.Pieces[i].dy,
              this.PuzzleObj.Pieces[i].dWidth,
              this.PuzzleObj.Pieces[i].dHeight);

            this.context.font = '20px Arial';
            this.context.fillText(numIter + 1,
              this.PuzzleObj.Pieces[i].dx + (this.PuzzleObj.Pieces[i].dWidth) / 2,
              this.PuzzleObj.Pieces[i].dy + this.PuzzleObj.Pieces[i].dHeight / 2);
          } else {
            this.context.fillStyle = 'white';
            this.context.fillRect(
              this.PuzzleObj.Pieces[i].dx,
              this.PuzzleObj.Pieces[i].dy,
              this.PuzzleObj.Pieces[i].dWidth,
              this.PuzzleObj.Pieces[i].dHeight,
            );
          }

          // console.log(this.PuzzleObj);
          numIter += 1;
        }
      }
      // console.log(this.PuzzleObj);
      // console.log(JSON.stringify(this.PuzzleObj));
      // console.log(JSON.parse(JSON.stringify(this.PuzzleObj)));
    };
    this.image.src = this.PuzzleObj.image;
  }

  clear() {
    console.log('111');
    this.context.clearRect(0, 0, 700, 700);
  }

  update(e) {

  }
}
