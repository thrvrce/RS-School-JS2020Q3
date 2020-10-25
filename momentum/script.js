let
 time = document.querySelector("time"),
 date = document.querySelector(".Date"),
 greeting = document.querySelector(".greeting"),
 name = document.querySelector(".name"),
 focus = document.querySelector(".focus")
 changeBackgroundPrev = document.querySelector(".changeBackgroundPrev"),
 changeBackgroundNext = document.querySelector(".changeBackgroundNext"),
 FocusHeader = document.querySelector(".FocusHeader")
 //isNeedChangeBg = true,
 prevHourWhenBgChanged = -1;

 function getDayOfWeek (day){
  let dayOfWweek = "";
  switch (day){
   case 1: dayOfWweek = "Monday"; break;
   case 2: dayOfWweek = "Tuesday"; break;
   case 3: dayOfWweek = "Wednesday"; break;
   case 4: dayOfWweek = "Thursday"; break;
   case 5: dayOfWweek = "Friday"; break;
   case 6: dayOfWweek = "Saturday"; break;
   case 0: dayOfWweek = "Sunday"; break;
   default : dayOfWweek = "Cant calculate day of week";
  }
  return dayOfWweek;
 }
 function getMonth(month){
  let strMonth = "";
  switch (month){
   case 0: strMonth = "January"; break;
   case 1: strMonth = "February"; break;
   case 2: strMonth = "March"; break;
   case 3: strMonth = "April"; break;
   case 4: strMonth = "May"; break;
   case 5: strMonth = "June"; break;
   case 6: strMonth = "July"; break;
   case 7: strMonth = "August"; break;
   case 8: strMonth = "September"; break;
   case 9: strMonth = "October"; break;
   case 10: strMonth = "November"; break;
   case 11: strMonth = "December"; break;
   default: strMonth = "Doesnt exists"; break;
  }
  return strMonth;
 }

 function addZero (strToParse){
  return  ((parseInt(strToParse, 10) < 10) ? "0" : "") + strToParse;
 }
 function setBackground(imgID){
  document.body.style.backgroundImage = `url(./assets/${imgID}.jpg)`;
 }
 function getGreeting (hour){
  let PartOfDay = "";
  if ( hour >= 0 && hour < 6){
   PartOfDay = "night";
  }
  else if (hour >= 6 && hour < 12){
   PartOfDay = "morning";
  }
  else if (hour >= 12 && hour < 18){
   PartOfDay = "day";
  }
  else {
   PartOfDay = "evening";
 }
 return PartOfDay;
}

 function setDateTime (){
 let
  curDateTime = new Date(),
  Month = curDateTime.getMonth(),
  DaOfMonth  = curDateTime.getDate(),
  Day = curDateTime.getDay(),
  hour = curDateTime.getHours(),
  min = curDateTime.getMinutes(),
  sec = curDateTime.getSeconds();

  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;
  date.innerText = `${getDayOfWeek(Day)}, ${getMonth(Month)} ${DaOfMonth}`;
  greeting.textContent = `Good ${getGreeting(hour)}, `;

  if (prevHourWhenBgChanged !== hour){
   //isNeedChangeBg = true;
   prevHourWhenBgChanged = hour;
   setBackground(hour);
  }
  // if (isNeedChangeBg){

  // }

  setTimeout(setDateTime, 1000);
}

function setBackgroundExt(e){
 let curbackgrountImfID = Number(document.body.style.backgroundImage.replace('url("./assets/', "").replace(`.jpg")`, ""));
 if( e.target.innerText === "<" ){
  document.body.style.backgroundImage = curbackgrountImfID === 0 ? `url(./assets/${23}.jpg)` : `url(./assets/${curbackgrountImfID-1}.jpg)`;
 }
 else{
  document.body.style.backgroundImage = curbackgrountImfID === 23 ? `url(./assets/${0}.jpg)` : `url(./assets/${curbackgrountImfID+1}.jpg)`;
 }
 //isNeedChangeBg = false;
 prevHourWhenBgChanged = new Date().getHours();
}
function getName(){
 let strForNameField = "";
 if (localStorage.getItem("name") === null || localStorage.getItem("name") === ""){
  strForNameField = "[Enter name there]";
 }
 else {

  strForNameField = localStorage.getItem("name");
 }
 name.innerText = strForNameField;
}
function getfocus(){
 let strForfocusField = "";
 if (localStorage.getItem("focus") === null || localStorage.getItem("focus") === ""){
  FocusHeader.innerText = "What is your main focus for today?";
  strForfocusField = "[Enter focus there]";
 }
 else {
  FocusHeader.innerText = "Your main focus for today:";
  strForfocusField = localStorage.getItem("focus");
 }
 focus.textContent = strForfocusField;
}
function checkSTR(s){
 if ( s.length  === 0 || /^\s+$/.test(s) ){//пустая строка или строка из символов пустого пространства
  return false;
 }
 else {
  return true;
 }

}
function setName(e){
 if (e.type = "keypress" ){
  if ( e.which == 13 || e.keyCode == 13 ){
   if (checkSTR(e.target.innerText)){
    localStorage.setItem("name",` ${e.target.innerText}`);
   }
   getName();
   name.blur();
  }
  else if (e.which == 1 || e.keyCode == 1) {
   e.target.innerText = " ";
  }
  else if (e.which == 0 || e.keyCode == 0){
   getName();
  }
 }
}
function setfocus(e){
 if (e.type = "keypress" ){
  if ( e.which == 13 || e.keyCode == 13 ){
   if (checkSTR(e.target.innerText)){
    localStorage.setItem("focus",` ${e.target.innerText}`);
   }
   getfocus();
   focus.blur();
  }
  else if (e.which == 1 || e.keyCode == 1) {
   FocusHeader.innerText = "What is your main focus for today?";
   e.target.innerText = " ";
  }else if (e.which == 0 || e.keyCode == 0){
   getfocus();
  }
 }
}

getName();
getfocus();

changeBackgroundPrev.addEventListener('click', function(e) {setBackgroundExt(e)})
changeBackgroundNext.addEventListener('click', function(e) {setBackgroundExt(e)})

name.addEventListener("keypress", function(e) {setName(e)});
name.addEventListener("click", function(e) {setName(e)});
name.addEventListener("blur", function(e) {setName(e)});

focus.addEventListener("keypress", function(e) {setfocus(e)});
focus.addEventListener("click", function(e) {setfocus(e)});
focus.addEventListener("blur", function(e) {setfocus(e)});



setDateTime();

