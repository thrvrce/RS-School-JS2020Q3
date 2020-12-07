const ChildCombinator = {
  items: [
    {
      item: 'castle',
      isSelectable: false,
      parent: null,
      childrensFlexProp: 'row',
      childrens: [
        {
          item: 'octopus',

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

      ],
    },
    {
      item: 'octopus',

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
      ],
    },
  ],
  selector: 'castle > octopus > fish',
};
export default ChildCombinator;
