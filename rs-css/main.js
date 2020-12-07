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
    FragmentHtml: '',
  };

  // const aquariumFragment = document.createDocumentFragment();
  // let FragmentHtml = '';
  Items.forEach((element) => {
    element.aquariumElement = document.createElement(element.item);
    // FragmentHtml += `\n<div> < <span> ${element.item} id = "" class = "" </span> > </div>`;
    levelFragment.FragmentHtml += `\n<div><<span>${element.item} id = "" class = ""</span>>`;
    if (element.isSelectable) {
      element.aquariumElement.classList.add('selectable');
    }
    if (element.childrens) {
      // element.aquariumElement.appendChild(createLevel(element.childrens));
      const childLevelFragment = createLevel(element.childrens);
      element.aquariumElement.appendChild(childLevelFragment.aquariumFragment);
      element.aquariumElement.classList.add(element.childrensFlexProp);
      levelFragment.FragmentHtml += `\n  ${childLevelFragment.FragmentHtml}\n<div><<span>${element.item}\\</span>>`;
    }
    levelFragment.aquariumFragment.appendChild(element.aquariumElement);
    levelFragment.FragmentHtml += '</div>';
  });
  console.log(levelFragment.FragmentHtml);
  // return aquariumFragment;
  return levelFragment;
}

const aquariumNode = document.querySelector('.aquarium');
const HTMLcodeNode = document.querySelector('.HTMLCodeNode');
// console.log(aquariumNode);
const level = createLevel(testLevel.items);
aquariumNode.appendChild(level.aquariumFragment);
HTMLcodeNode.innerHTML = level.FragmentHtml;

// console.log(level.aquariumFragment);
