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
    this.mode.textContent = 'Mode: ';
    this.info.appendChild(this.mode);

    this.score = document.createElement('div');
    this.score.textContent = 'Score: ';
    this.info.appendChild(this.score);

    this.time = document.createElement('div');
    this.time.textContent = 'Time: ';
    this.info.appendChild(this.time);

    this.puzzleArea = document.createElement('canvas');
    this.puzzleArea.classList.add('gameArea-puzzle');
    this.gameArea.appendChild(this.puzzleArea);
  }

  getMainNode() {
    return this.gameArea;
  }

  getMenuButtonRef() {
    return this.menuBtn;
  }
}
