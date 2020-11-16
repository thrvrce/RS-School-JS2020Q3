export default class Menu {
  constructor(parentNode) {
    this.parentNode = parentNode;
    // main menu
    this.MainMenu = {};
    this.MainMenu.DOM = document.createElement('div');
    this.MainMenu.DOM.classList.add('gameArea-menu');
    this.parentNode.appendChild(this.MainMenu.DOM);

    this.MainMenu.Items = ['New', 'Autoplay', 'Settings'];
    this.MainMenu.isVisible = true;
    this.MainMenu.menuList = {};
    this.MainMenu.menuList.DOM = document.createElement('li');
    this.MainMenu.DOM.appendChild(this.MainMenu.menuList.DOM);
    this.MainMenu.menuList.ListItem = {};

    this.MainMenu.Items.forEach((element) => {
      this.MainMenu.menuList.ListItem[element] = {
        name: element,
        isActive: false,
        DOM: document.createElement('ul'),
      };
      this.MainMenu.menuList.ListItem[element].DOM.textContent = element;
      this.MainMenu.menuList.DOM.appendChild(this.MainMenu.menuList.ListItem[element].DOM);
      this.MainMenu.menuList.ListItem[element].DOM.classList.add('gameArea-menu-item');
    });
    this.setMenuVisible(this.MainMenu);
    // NG menu
    this.Settings = {};
    this.Settings.DOM = document.createElement('div');
    this.Settings.DOM.classList.add('gameArea-menu');
    this.parentNode.appendChild(this.Settings.DOM);
    this.Settings.isVisible = true;

    this.Settings.LI = document.createElement('li');
    this.Settings.DOM.appendChild(this.Settings.LI);
    // NG mode
    this.Settings.UL_MODE = document.createElement('ul');
    this.Settings.UL_MODE.textContent = 'Mode:';
    this.Settings.LI.appendChild(this.Settings.UL_MODE);
    this.Settings.UL_MODE.classList.add('gameArea-menu-item');

    this.Settings.UL_MODE_SEL = document.createElement('select');
    this.Settings.UL_MODE.appendChild(this.Settings.UL_MODE_SEL);
    for (let i = 2; i <= 8; i++) {
      const opt = `${i}x${i}`;
      this.Settings[`UL_MODE_SEL_OPT_${i}`] = document.createElement('option');
      this.Settings[`UL_MODE_SEL_OPT_${i}`].textContent = opt;
      this.Settings[`UL_MODE_SEL_OPT_${i}`].value = i;
      this.Settings.UL_MODE_SEL.appendChild(this.Settings[`UL_MODE_SEL_OPT_${i}`]);
    }
    // NG IMG
    this.Settings.UL_IMG = document.createElement('ul');
    this.Settings.UL_IMG.textContent = 'Chose image:';
    this.Settings.UL_IMG.classList.add('gameArea-menu-item');
    this.Settings.LI.appendChild(this.Settings.UL_IMG);
    this.Settings.UL_IMG.appendChild(document.createElement('br'));
    this.Settings.UL_IMG_IMAGE = document.createElement('img');
    this.Settings.UL_IMG_IMAGE.src = '../images/1.jpg';
    this.Settings.UL_IMG_IMAGE.id = 'settings_img';
    this.Settings.UL_IMG_IMAGE.width = 600;
    this.Settings.UL_IMG_IMAGE.height = 600;
    this.Settings.UL_IMG.appendChild(this.Settings.UL_IMG_IMAGE);
    this.Settings.UL_IMG.appendChild(document.createElement('br'));

    this.Settings.UL_IMG_prev = document.createElement('span');
    this.Settings.UL_IMG_prev.textContent = '<<prev ';
    this.Settings.UL_IMG.appendChild(this.Settings.UL_IMG_prev);
    this.Settings.UL_IMG_prev.classList.add('gameArea-menu-item');
    this.Settings.UL_IMG_prev.addEventListener('click', () => {
      const path = this.Settings.UL_IMG_IMAGE.src;
      const num = Number(path.substring(path.length - 5, path.length - 4)) - 1;
      this.Settings.UL_IMG_IMAGE.src = `../images/${num % 9 || 9}.jpg`;
    });

    this.Settings.UL_IMG_Next = document.createElement('span');
    this.Settings.UL_IMG_Next.textContent = ' next>>';
    this.Settings.UL_IMG.appendChild(this.Settings.UL_IMG_Next);
    this.Settings.UL_IMG_Next.classList.add('gameArea-menu-item');
    this.Settings.UL_IMG_Next.addEventListener('click', () => {
      const path = this.Settings.UL_IMG_IMAGE.src;
      const num = Number(path.substring(path.length - 5, path.length - 4)) + 1;
      this.Settings.UL_IMG_IMAGE.src = `../images/${num % 9 || 9}.jpg`;
    });
    // NG back
    this.Settings.UL_BACK = document.createElement('ul');
    this.Settings.UL_BACK.textContent = 'Back';
    this.Settings.UL_BACK.addEventListener('click', () => {
      this.setMenuVisible(this.Settings);
      this.setMenuVisible(this.MainMenu);
    });
    this.Settings.LI.appendChild(this.Settings.UL_BACK);
    this.Settings.UL_BACK.classList.add('gameArea-menu-item');
    this.setMenuVisible(this.Settings);
  }

  menuHandler(e) {
    const type = e.target.innerText;
    switch (type) {
      case 'Menu':
        this.setMenuVisible(this.MainMenu);
        break;
      case 'New':
        this.StartNewGame(e.target.innerText);
        break;
      case 'Settings':
        this.setMenuVisible(this.MainMenu);
        this.setMenuVisible(this.Settings);

        break;
      default: break;
    }
  }

  getSettings() {
    return this.Settings;
  }

  setMenuVisible(menuList) {
    if (menuList.isVisible) {
      menuList.DOM.classList.add('gameArea-menu_invisible');
      menuList.DOM.classList.remove('gameArea-menu_visible');
      menuList.isVisible = false;
    } else {
      menuList.DOM.classList.add('gameArea-menu_visible');
      menuList.DOM.classList.remove('gameArea-menu_invisible');
      menuList.isVisible = true;
    }
  }
}
