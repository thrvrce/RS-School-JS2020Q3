/* eslint-disable import/extensions */
import GameArea from './modules/gameArea.js';
import Menu from './modules/menu.js';
import getSolution from './modules/getSolution.js';

const myGameArea = new GameArea();
const myMenu = new Menu(myGameArea.getMainNode());
myGameArea.menuBtn.addEventListener('click', (e) => { myMenu.menuHandler(e); });
myGameArea.DrawNewPuzzle(myMenu.Settings.UL_MODE_SEL.value, myMenu.Settings.UL_IMG_IMAGE.src);
myMenu.MainMenu.menuList.ListItem.New.DOM.addEventListener('click', () => {
  if (myGameArea.gameArea.isAutoplay) {
    myGameArea.gameArea.isAutoplay = false;
    clearInterval(myGameArea.Autoplay);
    myMenu.MainMenu.menuList.ListItem.Autoplay.DOM.innerText = 'Autoplay';
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
      myMenu.MainMenu.menuList.ListItem.Autoplay.DOM.innerText = 'Autoplay';
    } else {
      myGameArea.gameArea.isAutoplay = true;
      //   myGameArea.Autoplay = myGameArea.tryToResolveAlg();

      // }

      myMenu.setMenuVisible(myMenu.MainMenu);

      // console.log(myGameArea.HasSolution());
      // setTimeout(() => { myGameArea.tryToResolveAlg(); }, 300);
      setTimeout(() => {
        myGameArea.Autoplay = getSolution(myGameArea.getCurPuzzleAsArray(), myGameArea);
        if (myGameArea.Autoplay !== null) {
          myMenu.MainMenu.menuList.ListItem.Autoplay.DOM.innerText = 'Autoplay: active';
        }
      // myGameArea.tryToResolveAlg();
      }, 300);
    }
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
