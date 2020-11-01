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
		isOpen: false,
		isUseSpeech: false
	},
	keyboards:{
		EngNoShift:["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace",
							  "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "Enter",
								"CapsLock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "\\",
								"Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/",
								"Done","Hearing", "Space", "ENG", "ArrowLeft", "ArrowRight"],
		EngShift:["~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "Backspace",
							"q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "{", "}", "Enter",
							"CapsLock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ":", '"', "|",
							"Shift", "z", "x", "c", "v", "b", "n", "m", "<", ">", "?",
							"Done", "Hearing", "Space", "ENG", "ArrowLeft", "ArrowRight"],
		RuNoShift:["ё", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace",
							"й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ","Enter",
							"CapsLock",  "ф",  "ы",  "в",  "а",  "п",  "р",  "о",  "л",  "д",  "ж",  "э",  "\\",
							"Shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".",
							"Done", "Hearing", "Space", "РУС", "ArrowLeft", "ArrowRight"],
		RuShift:["ё", "!", '"', "№", ";", "%", ":", "?", "*", "(", ")", "_", "+", "Backspace",
						 "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ","Enter",
						 "CapsLock",  "ф",  "ы",  "в",  "а",  "п",  "р",  "о",  "л",  "д",  "ж",  "э",  "/",
						 "Shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ",",
						 "Done", "Hearing", "Space", "РУС", "ArrowLeft", "ArrowRight"]
	},
	_keyHighLight(key){
		let keyToHighLight = document.getElementById( (key !== " " ) ? key.toLowerCase() : "space");
		if (keyToHighLight !== null){
			keyToHighLight.classList.add ("keyboard_button_Used");
			setTimeout( () => {keyToHighLight.classList.remove ("keyboard_button_Used")}, 50);


		}
//keyboard_button_Used
	},
	init(){
		this.properties.textarea = document.querySelector("textarea");
		this.properties.textarea.addEventListener ("focus", () => {
			if (!this.properties.isOpen){
				this.open();
			}
		});
		this.properties.textarea.addEventListener ("keyup", (e) => {

			console.log(`event ^ ${e.type} ; innertext: ${e.target.innerText}  ; key: ${e.key}`)
			this._keyHighLight(e.key);
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
		 else if (key === "ArrowLeft" || key === "ArrowRight"){
			if ( (selectionStart !== 0 && key === "ArrowLeft") || key === "ArrowRight"){
				caret_shift = (key === "ArrowLeft") ? -1 : 1;
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
				//isNedInsertLineBreak = ["Backspace", "]", "}", "Enter", "/", "?"].indexOf(key) !== -1;
				isNedInsertLineBreak = ["Backspace", "\\","|",  "Enter", "/", "?"].indexOf(key) !== -1;
			}
			else {
				//isNedInsertLineBreak = ["Backspace", "ъ", "Ъ", "Enter", ".", ","].indexOf(key) !== -1;
				isNedInsertLineBreak = ["Backspace", "\\", "/", "Enter", ".", ","].indexOf(key) !== -1;
			}

			DOM_key.setAttribute("type", "button");
			DOM_key.classList.add("keyboard_button");
			switch(key){
				case "Backspace":
					DOM_key.classList.add("keyboard_button-wide");
					DOM_key.innerHTML = creatrIcon("backspace");

					DOM_key.addEventListener("click", () => {
						this._speech(key);//speechSynthesis.speak(new SpeechSynthesisUtterance(key));
						this._onInput(key);
						//this._resetShift();
					});
					break;
				case "CapsLock":
					DOM_key.classList.add("keyboard_button-wide", "keyboard_button-activatable" );
					DOM_key.classList.toggle("keyboard_button-active", this.properties.isCapsEnable);
					DOM_key.innerHTML = creatrIcon("keyboard_capslock");

					DOM_key.addEventListener("click", () => {
						this.properties.isCapsEnable = !this.properties.isCapsEnable;
						this._speech(`Caps Lock ${ ( this.properties.isCapsEnable ? "включен" : "отключен") }`);//speechSynthesis.speak(new SpeechSynthesisUtterance(`Caps Lock ${ ( this.properties.isCapsEnable ? "включен" : "отключен") }` ) );
						//this._resetShift();
						this._reDrawKeyboard();
					});
					break;
				case "Enter":
					DOM_key.classList.add("keyboard_button-wide")	;
					DOM_key.innerHTML = creatrIcon("keyboard_return");

					DOM_key.addEventListener("click", () => {
						this._speech("Enter");//speechSynthesis.speak(new SpeechSynthesisUtterance("Enter") );
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
						this._speech(`Shift ${ ( this.properties.isShiftEnable ? "включен" : "отключен") }`); //speechSynthesis.speak(new SpeechSynthesisUtterance(`Shift ${ ( this.properties.isShiftEnable ? "включен" : "отключен") }` ) );
						this._reDrawKeyboard();
					});
					break;
				case "ENG":
				case "РУС" :
					DOM_key.classList.add("keyboard_button-wide")	;
					DOM_key.textContent = key;

					DOM_key.addEventListener("click", () => {
						this.properties.isEng = !this.properties.isEng;
						this._speech(`Выбрана ${ ( this.properties.isEng ? "английская" : "русская") } раскладка`);//speechSynthesis.speak(new SpeechSynthesisUtterance(`Выбрана ${ ( this.properties.isEng ? "английская" : "русская") } раскладка` ) );
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
					case "Hearing":
						DOM_key.classList.add("keyboard_button-wide")	;
						DOM_key.classList.toggle("keyboard_button_Shift", this.properties.isUseSpeech);
						DOM_key.innerHTML = creatrIcon("hearing");

						DOM_key.addEventListener("click", () => {
							this.properties.isUseSpeech = !this.properties.isUseSpeech;
							this._reDrawKeyboard();
							if (this.properties.isUseSpeech){
								this._speech("Включено озвучивание ввода");
							}
							else{
								speechSynthesis.speak(new SpeechSynthesisUtterance("Отключено озвучивание ввода"));
							}

						});
						break;
				case "Space":
					DOM_key.classList.add("keyboard_button-extra-wide")	;
					DOM_key.innerHTML = creatrIcon("space_bar");

					DOM_key.addEventListener("click", () => {
						this._speech("пробел");//speechSynthesis.speak(new SpeechSynthesisUtterance(`пробел` ) );
						this._onInput(" ");
						//this._resetShift();
					});
					break;
				case "ArrowLeft":
					DOM_key.classList.add("keyboard_button-wide", "keyboard_button-dark")	;
					DOM_key.innerHTML = creatrIcon("arrow_back");

					DOM_key.addEventListener("click", () => {
						this._speech("стрелка влево"); //speechSynthesis.speak(new SpeechSynthesisUtterance(`стрелка влево` ) );
						this._onInput("ArrowLeft");
						//this._resetShift();

					});
					break;
				case "ArrowRight":
					DOM_key.classList.add("keyboard_button-wide", "keyboard_button-dark")	;
					DOM_key.innerHTML = creatrIcon("arrow_forward");

					DOM_key.addEventListener("click", () => {
						this._speech("стрелка вправо");// speechSynthesis.speak(new SpeechSynthesisUtterance(`стрелка вправо` ) );
						this._onInput("ArrowRight");
						//this._resetShift();

					});

					break;
				default:
					DOM_key.textContent = (this.properties.isCapsEnable || this.properties.isShiftEnable) ? key.toUpperCase() : key.toLowerCase();

					DOM_key.addEventListener("click", (e) => {
						// if (document.activeElement === this.properties.textarea.value)
						// {
						// 	console.log("asd")
						// 	DOM_key.preventDefault();
						// }
						this._speech(key);
						this._onInput(key);
						//this._resetShift();
					});

					break;
			}
			DOM_key.id = key.toLowerCase();
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
	_speech(strForSpeak){
		if (this.properties.isUseSpeech){
			switch (strForSpeak){
				case "!":
					strForSpeak = "Восклицательный знак";
					break;
					case "%":
						strForSpeak = "Процент";
						break;
					case "(":
					strForSpeak = "открывающая скобка";
					break;
					case ")":
						strForSpeak = "закрывающая скобка";
						break;
					case "{":
						strForSpeak = "открывающая фигурная скобка";
						break;
					case "}":
						strForSpeak = "закрывающая фигурная скобка";
						break;
					case ":":
						strForSpeak = "двоеточие";
						break;
					case '"':
						strForSpeak = "двойные кавычки";
						break;
					case '|':
						strForSpeak = "вертикальная черта";
						break;
					case "<":
						strForSpeak = "меньше чем";
						break;
					case '>':
						strForSpeak = "больше чем";
						break;
					case '?':
						strForSpeak = "вопрос";
						break;
					case "-":
						strForSpeak = "минус";
						break;
					case "[":
						strForSpeak = "открывающая квадратная скобка";
						break;
					case ']':
						strForSpeak = "закрывающая квадратная скобка";
						break;
					case ';':
						strForSpeak = "точка с запятойй";
						break;
					case "'":
						strForSpeak = "одинарные кавычки";
						break;
					case ',':
						strForSpeak = "запятая";
						break;
					case '.':
						strForSpeak = "точка";
						break;
					case '`':
					strForSpeak = "обратные кавычки";
					break;
				default:

					break;
			}
			speechSynthesis.speak(new SpeechSynthesisUtterance(strForSpeak));
		}
	}
	,
	_resetKeys(){
		let keyboard_buttons = document.querySelector(".keyboard_buttons");
		while(keyboard_buttons.firstChild){
			keyboard_buttons.removeChild(keyboard_buttons.firstChild);
		}
	},
	open(){
		this.DOM_Elements.keyboard.classList.remove("keyboard-hidden");
		this.properties.isOpen = true;
		this._speech("Клавиатура открыта")//speechSynthesis.speak(new SpeechSynthesisUtterance(`Клавиатура открыта` ) );
	},
	close(){
		this.DOM_Elements.keyboard.classList.add("keyboard-hidden");
		this.properties.isOpen = false;
		this._speech("Клавиатура закрыта")//speechSynthesis.speak(new SpeechSynthesisUtterance(`Клавиатура закрыта` ) );
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


