const IDLevel = {
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
          id: 'first_fish',
          isSelectable: false,
          parent: null,
          childrens: undefined,
        },
        {
          item: 'fish',
          id: 'second_fish',
          isSelectable: true,
          parent: null,
          childrens: null,
        },
        {
          item: 'fish',
          id: 'third_fish',
          isSelectable: false,
          parent: null,
          childrens: null,
        },
      ],
    },
    {
      item: 'octopus',
      id: 'octopusWithoutGoogles',
      isSelectable: true,
      parent: null,
      childrens: null,
    },
    {
      item: 'octopus',
      class: 'octopusWithGoogles',
      isSelectable: false,
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
      id: 'lonelyShell',
      isSelectable: true,
      parent: null,
      childrens: null,
    },

  ],
  selector: '#second_fish, #octopusWithoutGoogles, #lonelyShell',
};
export default IDLevel;
