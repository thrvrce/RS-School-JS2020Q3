const EleventClassLevel = {
  items: [
	 {
		 item: 'castle',
		 isSelectable: false,
		 parent: null,
		 childrensFlexProp: 'row',
		 childrens: [
			 {
				 item: 'fish',
				 class: 'frst_fish',
				 isSelectable: true,
				 parent: null,
				 childrens: undefined,
			 },
			 {
				 item: 'fish',
				 class: 'second_fish',
				 isSelectable: true,
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
      item: 'octopus',
      class: 'regularOctopus',
      isSelectable: false,
      parent: null,
      childrens: null,
    },
  ],
  selector: 'fish.frst_fish, fish.second_fish, octopus.octopusWithGoogles',
};
export default EleventClassLevel;
