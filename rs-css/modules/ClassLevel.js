const classLevel = {
  levelNum: 2,
  items: [
    {
      item: 'castle',
      class: 'castleWithaFish',
      isSelectable: false,
      parent: null,
      childrensFlexProp: 'row',
      childrens: [
        {
          item: 'fish',
          class: 'first_fish',
          isSelectable: false,
          parent: null,
          childrens: undefined,
        },
        {
          item: 'fish',
          class: 'second_fish',
          isSelectable: false,
          parent: null,
          childrens: null,
        },
        {
          item: 'fish',
          class: 'third_fish',
          isSelectable: false,
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

  ],
  selector: '.octopusWithGoogles',
};
export default classLevel;
