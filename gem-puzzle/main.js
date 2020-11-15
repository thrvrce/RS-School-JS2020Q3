/* eslint-disable import/extensions */
import GameArea from './modules/gameArea.js';
import Menu from './modules/menu.js';

const myGameArea = new GameArea();
const myMenu = new Menu(myGameArea.getMainNode());

myGameArea.menuBtn.addEventListener('click', (e) => { myMenu.menuHandler(e); });
// myGameArea.testDraw();
myGameArea.testDrawExt();
