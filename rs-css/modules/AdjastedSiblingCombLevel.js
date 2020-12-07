const AdjastedSiblingCombLevel = {
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
          isSelectable: false,
          parent: null,
          childrens: undefined,
        },

        {
          item: 'octopus',
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
        {
          item: 'fish',
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
    {
      item: 'shell',
      isSelectable: true,
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
      item: 'shell',
      isSelectable: true,
      parent: null,
      childrens: null,
    },
  ],
  selector: 'fish+octopus,fish+octopus+fish, octopus~shell',
};
export default AdjastedSiblingCombLevel;
