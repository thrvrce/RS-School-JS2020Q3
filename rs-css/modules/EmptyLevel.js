const EmptyLevel = {
  levelNum: 7,
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
          isSelectable: true,
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
  selector: 'castle > :empty, octopusWithHat :empty',
};

export default EmptyLevel;
