import TypeLevel from './modules/TypeLevel.js';
import classLevel from './modules/ClassLevel.js';
import IDLevel from './modules/IDLevel.js';

console.log(classLevel);
const testLevel = {
  items: [
    {
      item: 'castle',
      isSelectable: false,
      parent: null,
      childrensFlexProp: 'row',
      childrens: [
        {
          item: 'fish',
          id: 'frst_fish',
          isSelectable: true,
          parent: null,
          childrens: undefined,
        },
        {
          item: 'fish',
          isSelectable: false,
          parent: null,
          childrens: null,
        },
        {
          item: 'fish',
          isSelectable: true,
          parent: null,
          childrens: null,
        },
      ],
    },
    {
      item: 'octopus',
      isSelectable: false,
      parent: null,
      childrens: null,
    },
    {
      item: 'octopusWithHat',
      isSelectable: false,
      parent: null,
      childrensFlexProp: 'column',
      childrens: [
        {
          item: 'captainHat',
          isSelectable: true,
          parent: null,
          childrens: null,
        },
        {
          item: 'octopus',
          isSelectable: false,
          parent: null,
          childrens: null,
        },

      ],
    },
    {
      item: 'octopus',
      class: 'octopusWithGoogles',
      isSelectable: true,
      parent: null,
      childrensFlexProp: 'row',
      childrens: [
        {
          item: 'googles',
          isSelectable: false,
          parent: null,
          childrens: null,
        },
      ],
    },

    {
      item: 'shell',
      isSelectable: true,
      parent: null,
      childrens: null,
    },
  ],
};

function createLevel(Items) {
  const levelFragment = {
    aquariumFragment: document.createDocumentFragment(),
    FragmentHtml: document.createDocumentFragment(),
  };

  Items.forEach((element) => {
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
  });

  return levelFragment;
}

function checkCssSelector(selectorToTest, selectorFromCurLevel) {
  const NodesForTest = document.querySelectorAll(selectorToTest);
  const NodesFromLevel = document.querySelectorAll(selectorFromCurLevel);
  let isEqualNodes = false;
  if (NodesForTest.length === NodesFromLevel.length) {
    isEqualNodes = true;
    for (let i = 0; i < NodesFromLevel.length; i++) {
      // console.log(NodesForTest[i]);
      // console.log(NodesFromLevel[i]);
      // console.log(NodesForTest[i] === NodesFromLevel[i]);
      if (NodesForTest[i] !== NodesFromLevel[i]) {
        isEqualNodes = false;
        break;
      }
    }
  }
  console.log(isEqualNodes);
  return isEqualNodes;
}

const aquariumNode = document.querySelector('.aquarium');
const HTMLcodeNode = document.querySelector('.HTMLCodeNode');
const curentLevel = IDLevel;
const level = createLevel(curentLevel.items);
aquariumNode.appendChild(level.aquariumFragment);

HTMLcodeNode.appendChild(level.FragmentHtml);

const enterButton = document.querySelector('.enter');
const inputCssSelector = document.querySelector('.selectorInput');
enterButton.addEventListener('click', (e) => {
  if (inputCssSelector.value) {
    if (checkCssSelector(inputCssSelector.value, curentLevel.selector)) {

    }
  }

  // console.log(document.querySelectorAll(inputCssSelector.value));
});
