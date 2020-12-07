import TypeLevel from './modules/TypeLevel.js';
import classLevel from './modules/ClassLevel.js';
import IDLevel from './modules/IDLevel.js';
import ListLevel from './modules/ListLevel.js';
import DescendantCombinatorLevel from './modules/DescendantCombinatorLevel.js';
import ChildCombinator from './modules/ChildCombinator.js';
import EmptyLevel from './modules/EmptyLevel.js';
import GeneralSibingLevel from './modules/GeneralSibingLevel.js';
import AdjastedSiblingCombLevel from './modules/AdjastedSiblingCombLevel.js';
import EleventClassLevel from './modules/EleventClassLevel.js';

const aquariumNode = document.querySelector('.aquarium');
const HTMLcodeNode = document.querySelector('.HTMLCodeNode');

const enterButton = document.querySelector('.enter');
const helpButton = document.querySelector('.help');
const inputCssSelector = document.querySelector('.selectorInput');
let curentLevel = IDLevel;
console.log(classLevel);

function createLevel(Items) {
  const levelFragment = {
    aquariumFragment: document.createDocumentFragment(),
    FragmentHtml: document.createDocumentFragment(),
  };

  for (let i = 0; i < Items.length; i += 1) {
    const element = Items[i];
    element.aquariumElement = document.createElement(element.item);
    element.FragmentHtmlElement = document.createElement('div');

    element.FragmentHtmlElement.innerHTML += `&lt;${element.item}`;

    if (element.id) {
      element.aquariumElement.id = element.id;
      element.FragmentHtmlElement.innerHTML += ` id = "${element.id}"`;
    }

    if (element.class) {
      element.aquariumElement.classList.add(element.class);
      element.FragmentHtmlElement.innerHTML += ` class = "${element.class}"`;
    }

    element.FragmentHtmlElement.innerHTML += `${(!element.childrens ? '\\' : '')}&gt;`;

    if (element.isSelectable) {
      element.aquariumElement.classList.add('selectable');
    }
    if (element.childrens) {
      const childLevelFragment = createLevel(element.childrens);
      element.aquariumElement.appendChild(childLevelFragment.aquariumFragment);
      element.aquariumElement.classList.add(element.childrensFlexProp);

      element.FragmentHtmlElement.appendChild(childLevelFragment.FragmentHtml);
      element.FragmentHtmlElement.innerHTML += `&lt;${element.item}\\&gt;`;
    }
    levelFragment.aquariumFragment.appendChild(element.aquariumElement);

    levelFragment.FragmentHtml.appendChild(element.FragmentHtmlElement);
  }

  return levelFragment;
}

function checkCssSelector(selectorToTest) {
  const NodesForTest = document.querySelectorAll(selectorToTest);
  const NodesFromLevel = document.querySelectorAll(curentLevel.selector);
  let isEqualNodes = false;
  if (NodesForTest.length === NodesFromLevel.length) {
    isEqualNodes = true;
    for (let i = 0; i < NodesFromLevel.length; i += 1) {
      console.log(NodesForTest[i]);
      console.log(NodesFromLevel[i]);
      console.log(NodesForTest[i] === NodesFromLevel[i]);
      if (NodesForTest[i] !== NodesFromLevel[i]) {
        isEqualNodes = false;
        break;
      }
    }
  }
  console.log(isEqualNodes);
  return isEqualNodes;
}

function DeleteChilds(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
function insertLevel(_level) {
  aquariumNode.appendChild(_level.aquariumFragment);
  HTMLcodeNode.appendChild(_level.FragmentHtml);
}

enterButton.addEventListener('click', () => {
  console.log(inputCssSelector.value);
  if (inputCssSelector.value) {
    if (checkCssSelector(inputCssSelector.value)) {
      alert('Succes!');
    }
  }

  // console.log(document.querySelectorAll(inputCssSelector.value));
});
helpButton.addEventListener('click', () => {
  inputCssSelector.value = '';
  const arrOfChars = curentLevel.selector.split('');
  let i = 0;
  const thisLevel = curentLevel;
  const interval = setInterval(() => {
    if (i < arrOfChars.length && curentLevel === thisLevel) {
      inputCssSelector.value += arrOfChars[i];
      i += 1;
    } else {
			 clearInterval(interval);
    }
  }, 150);

  console.log(arrOfChars);
});

insertLevel(createLevel(curentLevel.items));
// const level = ;

const menu = document.querySelectorAll('.level');

menu.forEach((menuItem) => {
  menuItem.addEventListener('click', (e) => {
    console.log(e.target.id);
    DeleteChilds(aquariumNode);
    DeleteChilds(HTMLcodeNode);
    inputCssSelector.value = '';

    switch (e.target.id) {
      case '1':
        curentLevel = TypeLevel;
        break;
      case '2':
        curentLevel = classLevel;
        break;
      case '3':
        curentLevel = IDLevel;
        break;
      case '4':
        curentLevel = ListLevel;
        break;
      case '5':
        curentLevel = DescendantCombinatorLevel;
        break;
      case '6':
        curentLevel = ChildCombinator;
        break;
      case '7':
        curentLevel = EmptyLevel;
        break;
      case '8':
        curentLevel = GeneralSibingLevel;
        break;
      case '9':
        curentLevel = AdjastedSiblingCombLevel;
        break;
      case '10':
        curentLevel = EleventClassLevel;
        break;
      default: break;
    }
    insertLevel(createLevel(curentLevel.items));
  });
});
