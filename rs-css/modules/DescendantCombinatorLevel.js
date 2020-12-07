const DescendantCombinatorLevel = {
  levelNum: 5,
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
      ],
    },
    {
      item: 'fish',
      isSelectable: false,
      parent: null,
      childrens: null,
    },
    {
      item: 'fish',
      isSelectable: false,
      parent: null,
      childrens: null,
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
    {
      item: 'shell',
      isSelectable: false,
      parent: null,
      childrens: null,
    },

  ],
  selector: '.octopusWithGoogles, castle fish',
};
export default DescendantCombinatorLevel;
