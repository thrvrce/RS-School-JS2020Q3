const keyboard = {
	DOM_Elements:{
		keyboard : null,
		keyboard_buttons: null
	},
	properties:{
		textarea: null,
		isCapsEnable: false,
		isShiftEnable: false,
		isEng: true,
		caretPos: 0,
		isOpen: false
	},
	keyboards:{
		EngNoShift:["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace",
							  "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]",
								"Caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "\\", "Enter",
								"Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/",
								"Done","Space", "ENG", "arrow_back", "arrow_forward"],
		EngShift:["~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "Backspace",
							"q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "{", "}",
							"Caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ":", '"', "|", "Enter",
							"Shift", "z", "x", "c", "v", "b", "n", "m", "<", ">", "?",
							"Done", "Space", "ENG", "arrow_back", "arrow_forward"],
		RuNoShift:["ё", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace",
							"й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ",
							"Caps",  "ф",  "ы",  "в",  "а",  "п",  "р",  "о",  "л",  "д",  "ж",  "э",  "\\",  "Enter",
							"Shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".",
							"Done", "Space", "РУС", "arrow_back", "arrow_forward"],
		RuShift:["ё", "!", '"', "№", ";", "%", ":", "?", "*", "(", ")", "_", "+", "Backspace",
						 "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ",
						 "Caps",  "ф",  "ы",  "в",  "а",  "п",  "р",  "о",  "л",  "д",  "ж",  "э",  "/",  "Enter",
						 "Shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ",",
						 "Done", "Space", "РУС", "arrow_back", "arrow_forward"]
	},
	init(){
		this.properties.textarea = document.querySelector("textarea");
		this.properties.textarea.addEventListener ("focus", () => {
			if (!this.properties.isOpen){
				this.open();
			}
		});

		//create elements
		this.DOM_Elements.keyboard = document.createElement("div");
		this.DOM_Elements.keyboard_buttons = document.createElement("div");

		//add classes
		this.DOM_Elements.keyboard.classList.add("keyboard", "keyboard-hidden");
		this.DOM_Elements.keyboard_buttons.classList.add("keyboard_buttons");

		this.setKeys();

	},
	_reDrawKeyboard(){
		this._resetKeys();
		this.setKeys();
		return true;
	},
	_resetShift(){
		if (this.properties.isShiftEnable){
			this.properties.isShiftEnable = false;
			document.querySelector(".keyboard_button_Shift").classList.toggle("keyboard_button_Shift", this.properties.isShiftEnable);
		}
	},
	_setCaret(pos_base, pos_shift){
		this.properties.textarea.selectionStart = pos_base + pos_shift;
		this.properties.textarea.selectionEnd = this.properties.textarea.selectionStart;
		this.properties.textarea.focus();
	},
	_onInput (key){
		let tmpArr = this.properties.textarea.value.split("");
		console.log(tmpArr);

		let	selectionStart = this.properties.textarea.selectionStart;
		let	selectionEnd = this.properties.textarea.selectionEnd;
		let numOfDeletedElems = Math.abs( selectionStart -  selectionEnd );
		let caret_shift= 0;
		console.log(`Start ${selectionStart}; End ${selectionEnd}; toDel: ${numOfDeletedElems}`);
		 if (key === "Backspace"){
			if (numOfDeletedElems === 0){
				if (selectionStart !== 0){
					tmpArr.splice(selectionStart - 1, 1, "");
					caret_shift = -1;
				}
			}
			else{
				tmpArr.splice(selectionStart, numOfDeletedElems, "");
			}
		 }
		 else if (key === "arrow_back" || key === "arrow_forward"){
			if ( (selectionStart !== 0 && key === "arrow_back") || key === "arrow_forward"){
				caret_shift = (key === "arrow_back") ? -1 : 1;
			}
		 }
		 else{
			tmpArr.splice(selectionStart, numOfDeletedElems, (this.properties.isShiftEnable || this.properties.isCapsEnable) ? key.toUpperCase() : key.toLowerCase() );
			caret_shift = 1;
		 }

		console.log(tmpArr);

		this.properties.textarea.value = tmpArr.join("");
		console.log(this.properties.textarea.value);

		this._setCaret(selectionStart, caret_shift);
	},
	setKeys(){
		const fragment = document.createDocumentFragment();
		let keyLayOut = ((this.properties.isEng) ? "Eng" : "Ru") + ((this.properties.isShiftEnable) ? "" : "No") + "Shift";
		console.log(this.properties.isEng);
		console.log(keyLayOut);

		const creatrIcon = (icon_name) => {
			return `<i class="material-icons">${icon_name}</i>`
		};

		this.keyboards[keyLayOut].forEach(key => {
		//	console.log(key);
			const DOM_key = document.createElement("button");
			let isNedInsertLineBreak = false;
			if (this.properties.isEng){
				isNedInsertLineBreak = ["Backspace", "]", "}", "Enter", "/", "?"].indexOf(key) !== -1;
			}
			else {
				isNedInsertLineBreak = ["Backspace", "ъ", "Ъ", "Enter", ".", ","].indexOf(key) !== -1;
			}

			DOM_key.setAttribute("type", "button");
			DOM_key.classList.add("keyboard_button");
			switch(key){
				case "Backspace":
					DOM_key.classList.add("keyboard_button-wide");
					DOM_key.innerHTML = creatrIcon("backspace");

					DOM_key.addEventListener("click", () => {
						this._onInput(key);
						//this._resetShift();
					});
					break;
				case "Caps":
					DOM_key.classList.add("keyboard_button-wide", "keyboard_button-activatable" );
					DOM_key.classList.toggle("keyboard_button-active", this.properties.isCapsEnable);
					DOM_key.innerHTML = creatrIcon("keyboard_capslock");

					DOM_key.addEventListener("click", () => {
						this.properties.isCapsEnable = !this.properties.isCapsEnable;
						//this._resetShift();
						this._reDrawKeyboard();
					});
					break;
				case "Enter":
					DOM_key.classList.add("keyboard_button-wide")	;
					DOM_key.innerHTML = creatrIcon("keyboard_return");

					DOM_key.addEventListener("click", () => {
						this._onInput("\n");
						//this._resetShift();
					});
					break;
				case "Shift":
					DOM_key.classList.add("keyboard_button-wide")	;
					DOM_key.classList.toggle("keyboard_button_Shift", this.properties.isShiftEnable);
					DOM_key.textContent = key;

					DOM_key.addEventListener("click", () => {
						this.properties.isShiftEnable = !this.properties.isShiftEnable;
						this._reDrawKeyboard();
					});
					break;
				case "ENG":
				case "РУС" :
					DOM_key.classList.add("keyboard_button-wide")	;
					DOM_key.textContent = key;

					DOM_key.addEventListener("click", () => {
						this.properties.isEng = !this.properties.isEng;
						//this._resetShift();
						this._reDrawKeyboard();
					});
					break;
				case "Done":
					DOM_key.classList.add("keyboard_button-wide", "keyboard_button-dark")	;
					DOM_key.innerHTML = creatrIcon("check_circle");

					DOM_key.addEventListener("click", () => {
						this.close();
						//this._resetShift();

					});
					break;
				case "Space":
					DOM_key.classList.add("keyboard_button-extra-wide")	;
					DOM_key.innerHTML = creatrIcon("space_bar");

					DOM_key.addEventListener("click", () => {
						this._onInput(" ");
						//this._resetShift();
					});
					break;
				case "arrow_back":
					DOM_key.classList.add("keyboard_button-wide", "keyboard_button-dark")	;
					DOM_key.innerHTML = creatrIcon("arrow_back");

					DOM_key.addEventListener("click", () => {
						this._onInput("arrow_back");
						//this._resetShift();

					});
					break;
				case "arrow_forward":
					DOM_key.classList.add("keyboard_button-wide", "keyboard_button-dark")	;
					DOM_key.innerHTML = creatrIcon("arrow_forward");

					DOM_key.addEventListener("click", () => {
						this._onInput("arrow_forward");
						//this._resetShift();

					});

					break;
				default:
					DOM_key.textContent = (this.properties.isCapsEnable || this.properties.isShiftEnable) ? key.toUpperCase() : key.toLowerCase();

					DOM_key.addEventListener("click", (e) => {
						if (document.activeElement === this.properties.textarea.value)
						{
							console.log("asd")
							DOM_key.preventDefault();
						}


						this._onInput(key);
						//this._resetShift();
					});

					break;
			}

			fragment.appendChild(DOM_key);

			if (isNedInsertLineBreak)
			{
				fragment.appendChild(document.createElement("br"));
			}
		});

		this.DOM_Elements.keyboard_buttons.appendChild(fragment);
		this.DOM_Elements.keyboard.appendChild(this.DOM_Elements.keyboard_buttons);
		document.body.appendChild(this.DOM_Elements.keyboard);

	},
	_resetKeys(){
		let keyboard_buttons = document.querySelector(".keyboard_buttons");
		while(keyboard_buttons.firstChild){
			keyboard_buttons.removeChild(keyboard_buttons.firstChild);
		}
	},
	open(){
		this.DOM_Elements.keyboard.classList.remove("keyboard-hidden");
		this.properties.isOpen = true;
	},
	close(){
		this.DOM_Elements.keyboard.classList.add("keyboard-hidden");
		this.properties.isOpen = false;
	}
}

// let textarea = document.querySelector("textarea");
// textarea.onclick = () =>{
// 	console.log(`S:${textarea.selectionStart}    E:${textarea.selectionEnd}`);
// };
keyboard.init();


// keyboard.properties.isCapsEnable = true;
// keyboard.properties.isShiftEnable = true;
// keyboard.properties.isEng = true;
// setTimeout(()=>{
// 	if (confirm("смена")){
// 		keyboard._resetKeys();
// 		keyboard.setKeys();
// 	}
// }, 2000);


