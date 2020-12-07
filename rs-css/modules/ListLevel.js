const ListLevel = {
  items: [
    {
      item: 'castle',

      isSelectable: false,
      parent: null,
      childrensFlexProp: 'row',
      childrens: [
        {
          item: 'fish',
          class: 'firstOfTheirKind',
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
          id: 'third_fish',
          isSelectable: true,
          parent: null,
          childrens: null,
        },
      ],
    },
    {
      item: 'octopus',
      class: 'firstOfTheirKind',
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
      isSelectable: true,
      parent: null,
      childrens: null,
    },

  ],
  selector: '.firstOfTheirKind, #third_fish, shell',
};
export default ListLevel;
