/* eslint-disable import/extensions */
import GameArea from './modules/gameArea.js';
import Menu from './modules/menu.js';

const myGameArea = new GameArea();
const myMenu = new Menu(myGameArea.getMainNode());
myGameArea.menuBtn.addEventListener('click', (e) => { myMenu.menuHandler(e); });

myMenu.MainMenu.menuList.ListItem.New.DOM.addEventListener('click', () => {
  if (myGameArea.gameArea.isAutoplay) {
    myGameArea.gameArea.isAutoplay = false;
    clearInterval(myGameArea.Autoplay);
  }
  myGameArea.gameArea.isAutoplay = false;
  myGameArea.DrawNewPuzzle(myMenu.Settings.UL_MODE_SEL.value, myMenu.Settings.UL_IMG_IMAGE.src);
  myMenu.setMenuVisible(myMenu.MainMenu);
});

myMenu.MainMenu.menuList.ListItem.Settings.DOM.addEventListener('click', () => {
  myMenu.setMenuVisible(myMenu.MainMenu);
  myMenu.setMenuVisible(myMenu.Settings);
});

myMenu.MainMenu.menuList.ListItem.Autoplay.DOM.addEventListener('click', () => {
  if (myGameArea.PuzzleObj !== undefined) {
    if (myGameArea.gameArea.isAutoplay) {
      myGameArea.gameArea.isAutoplay = false;
      clearInterval(myGameArea.Autoplay);
      myMenu.MainMenu.menuList.ListItem.Autoplay.DOM.textConten = 'Autoplay';
    } else {
      myGameArea.gameArea.isAutoplay = true;
      myGameArea.Autoplay = myGameArea.tryToResolve();
      myMenu.MainMenu.menuList.ListItem.Autoplay.DOM.textConten = 'Autoplay: active';
    }

    myMenu.setMenuVisible(myMenu.MainMenu);
  }
});
myGameArea.puzzleArea.addEventListener('click', (e) => {
  if (myGameArea.PuzzleObj !== undefined) {
    if (myGameArea.PuzzleObj.CanMove) {
      myGameArea.PuzzleObj.CanMove = false;
      const curObjIndex = myGameArea.getPuzzlePieceByCoord(e.layerX, e.layerY);
      const movable = (curObjIndex !== undefined) ? myGameArea.isMovablePiece(curObjIndex) : false;
      if (movable) {
        myGameArea.move(curObjIndex);
      }
      setTimeout(() => {
        myGameArea.PuzzleObj.CanMove = true;
      }, 1200);
    }
  }
});
