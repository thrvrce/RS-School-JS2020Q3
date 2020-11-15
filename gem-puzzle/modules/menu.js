export default class Menu {
  constructor(parentNode) {
    this.parentNode = parentNode;
    this.menuItems = ['Continue', 'New', 'Load', 'Save', 'Score'];
    this.isVisible = true;

    this.menu = document.createElement('div');
    this.menu.classList.add('gameArea-menu');
    this.parentNode.appendChild(this.menu);

    this.menuList = document.createElement('li');
    this.menu.appendChild(this.menuList);
    this.menuListItem = {};
    this.menuItems.forEach((element) => {
      this.menuListItem[element] = {
        name: element,
        isActive: false,
        Dom_Element: document.createElement('ul'),
      };
      this.menuListItem[element].Dom_Element.textContent = element;
      this.menuList.appendChild(this.menuListItem[element].Dom_Element);
    });
  }

  menuHandler(e) {
    console.log(e.target.innerText);
    switch (e.target.innerText) {
      case 'Menu':
        this.setMenuVisible();
        break;
      case 'New': break;
      default: break;
    }
  }

  setMenuVisible() {
    if (this.isVisible) {
      this.menu.classList.add('gameArea-menu_invisible');
      this.menu.classList.remove('gameArea-menu_visible');
      this.isVisible = false;
    } else {
      this.menu.classList.add('gameArea-menu_visible');
      this.menu.classList.remove('gameArea-menu_invisible');
      this.isVisible = true;
    }
  }
}
