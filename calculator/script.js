class Calculator{
 constructor(){
  this.buttons     = document.querySelectorAll('button');
  this.inpCurValue = document.querySelector('.curValue');
  this.tmpStr = '';
  let Res = undefined;
  let prevOperation = undefined;
 }
 clearAll(){
      this.inpCurValue.innerText = '';
      this.tmpStr = '';
      this.prevOperation = undefined;
      this.Res = undefined;
 }
 fixFloat(number){
  return parseFloat(number.toFixed(10));
 }
 handleEven(event){
  console.log(event.type);
  let curButton = (event.type === 'click') ? event.target.innerText : event.key;
  let regexp = /^[0-9]|[/*\-+=^.√]|AC|DEL|Delete|Backspace|Enter$/;
  if ( regexp.test(curButton) ){

   // console.log(curButton.match(regexp));
   // console.log(`${curButton} is valid`);

   let regExpNumber = /^[0-9.]$/;
   let regExpSimpleOperation = /^[/*\-+=^√]|Enter$/;

   if (regExpNumber.test(curButton)){
    if( this.prevOperation === '=' || this.prevOperation === 'Enter' ){
     this.clearAll();
    }
    if (curButton === '.' && (this.tmpStr === '' || !/\.+/.test(this.tmpStr)) ){
      this.tmpStr += (this.tmpStr === '' || this.tmpStr === '-' ) ? "0." : curButton;
    }
    if ( curButton !== '.' ){
     this.tmpStr += curButton;
    }
   }
   else if (regExpSimpleOperation.test(curButton)){
    if (this.tmpStr === '' && curButton === "-" ) {
      if( this.prevOperation === '=' || this.prevOperation === 'Enter' ){
       this.prevOperation = "-";
      }else
     this.tmpStr += curButton;
    }
    else if (/^\-{0,1}[0-9]+\.{0,1}[0-9]*$/.test(this.tmpStr) || ( this.prevOperation === '=' || this.prevOperation === 'Enter')){

     if (this.prevOperation !== undefined && this.Res !== undefined && curButton !== "√"){
      switch (this.prevOperation){
       case "^":
        this.Res = this.fixFloat(this.Res ** (Number(this.tmpStr)));
        break;
       case "-":
        this.Res = this.fixFloat(this.Res - (Number(this.tmpStr)));
        break;
       case "+":
        this.Res = this.fixFloat(this.Res + (Number(this.tmpStr)));
        break;
       case "/":
        if ( (Number(this.tmpStr)) !== 0){
         this.Res = this.fixFloat(this.Res / (Number(this.tmpStr)));
        }
        else{
         this.clearAll();
         return alert( 'Деление на 0 запрещено');
        }
        break;
       case "*":
        this.Res = this.fixFloat(this.Res * (Number(this.tmpStr)));
        break;

       default: break;
      }
      this.prevOperation =  curButton;
      this.tmpStr = '';
      if (this.prevOperation === '=' || this.prevOperation === 'Enter'){
       this.tmpStr = this.Res;
       this.Res = undefined;
      }
     }
     else if (curButton === "√"){
      let tmpNumber = Number(this.tmpStr);
      if (tmpNumber >= 0  && this.tmpStr !== ''){
       this.tmpStr = String(this.fixFloat(tmpNumber ** (1/2)));
      }
      else{
       alert("Извлечение корня из отрицательного или пустого значения запрещено. Повторите ввод");
       this.tmpStr = "";
      }
     }
     else{
      if (curButton === '=' || curButton === 'Enter'){
       this.prevOperation = curButton;
      }else {
       if (this.Res === undefined){
        this.Res = (Number(this.tmpStr));
        this.tmpStr = '';
       }
       if ( this.prevOperation === undefined || this.prevOperation === '='){
        this.prevOperation = curButton;
       }
      }

     }
    }

    }
   else {

    switch (curButton){
     case "AC":
     case "Delete":
      this.clearAll();
      break;
     case "DEL":
     case "Backspace":
      // if (this.tmpStr.length === 0 && (this.prevOperation !== '=' || this.prevOperation !== 'Enter')){
      //  this.prevOperation = '=';
      //  this.tmpStr = this.Res;

      // }
      // if ( this.tmpStr.length !==0){

       this.tmpStr = String(this.tmpStr).slice(0,-1);
      // }


      break;
     default: break;
    }
   }

  }
  else{
   console.log(`${curButton} is invalid`);
  }


 console.log(`tmpstr = ${this.tmpStr}  res = ${this.Res}   prevoperation = ${this.prevOperation}`);
 this.inpCurValue.innerText = `${this.Res !== undefined ? this.Res : ""} ${(this.prevOperation !== undefined && this.prevOperation !== "=" && this.prevOperation !== "Enter")? this.prevOperation : ''} ${this.tmpStr}`
}
}


let myCalc = new Calculator();

addEventListener("keyup", function(e) {myCalc.handleEven(e)});
for (const iterator of myCalc.buttons) {
 iterator.addEventListener('click', function(e) {myCalc.handleEven(e)})
}





