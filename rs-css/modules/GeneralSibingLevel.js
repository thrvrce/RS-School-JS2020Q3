const GeneralSibingLevel = {
  levelNum: 8,
  items: [
    {
      item: 'castle',
      isSelectable: false,
      parent: null,
      childrensFlexProp: 'row',
      childrens: [
        {
          item: 'fish',

          isSelectable: false,
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
      item: 'shell',
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
  ],
  selector: 'fish~fish, castle~shell',
};
export default GeneralSibingLevel;
