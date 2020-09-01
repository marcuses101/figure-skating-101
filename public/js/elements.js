var sovData = [["Jump","Euler","Eu","Salchow,Flip","",0,0.5,"","","",1,"","","","","","","","","<<"],["Jump","Toe","T","Euler,Toe,Loop","Axel",0,0.4,1.3,4.2,9.5,1,2,3,4,"","","","q","<","<<"],["Jump","Salchow","S","Euler,Toe,Loop","Axel",0,0.4,1.3,4.3,9.7,1,2,3,4,"","","","q","<","<<"],["Jump","Loop","Lo","Euler,Toe,Loop","Axel",0,0.5,1.7,4.9,11,1,2,3,4,"","","","q","<","<<"],["Jump","Flip","F","Euler,Toe,Loop","Axel",0,0.5,1.8,5.3,11,1,2,3,4,"","!","e","q","<","<<"],["Jump","Lutz","Lz","Euler,Toe,Loop","Axel",0,0.6,2.1,5.3,11,1,2,3,4,"","!","e","q","<","<<"],["Jump","Axel","A","Euler,Toe,Loop","Axel",0,1.1,3.3,8,12.5,1,2,3,4,"","","","q","<","<<"],["Spin","Upright","USp","","",1,1.2,1.5,1.9,2.4,"B",1,2,3,4,"","","","",""],["Spin","Layback","LSp","","",1.2,1.5,1.9,2.4,2.7,"B",1,2,3,4,"","","","",""],["Spin","Camel","CSp","","",1.1,1.4,1.8,2.3,2.6,"B",1,2,3,4,"","","","",""],["Spin","Sit","SSp","","",1.1,1.3,1.6,2.1,2.5,"B",1,2,3,4,"","","","",""],["Spin","Flying Upright","FUSp","","",1.5,1.7,2,2.4,2.9,"B",1,2,3,4,"v","","","",""],["Spin","Flying Layback","FLSp","","",1.7,2,2.4,2.9,3.2,"B",1,2,3,4,"v","","","",""],["Spin","Flying Camel","FCSp","","",1.6,1.9,2.3,2.8,3.2,"B",1,2,3,4,"v","","","",""],["Spin","Flying Sit","FSSp","","",1.7,2,2.3,2.6,3,"B",1,2,3,4,"v","","","",""],["Spin","Change Upright","CUSp","","",1.5,1.7,2,2.4,2.9,"B",1,2,3,4,"v","","","",""],["Spin","Flying Change Upright","FCUSp","","",1.5,1.7,2,2.4,2.9,"B",1,2,3,4,"v","","","",""],["Spin","Change Layback","CLSp","","",1.7,2,2.4,2.9,3.2,"B",1,2,3,4,"v","","","",""],["Spin","Flying Change Layback","FCLSp","","",1.7,2,2.4,2.9,3.2,"B",1,2,3,4,"v","","","",""],["Spin","Change Camel","CCSp","","",1.7,2,2.3,2.8,3.2,"B",1,2,3,4,"v","","","",""],["Spin","Flying Change Camel","FCCSp","","",1.7,2,2.3,2.8,3.2,"B",1,2,3,4,"v","","","",""],["Spin","Change Sit","CSSp","","",1.6,1.9,2.3,2.6,3,"B",1,2,3,4,"v","","","",""],["Spin","Flying Change Sit","FCSSp","","",1.6,1.9,2.3,2.6,3,"B",1,2,3,4,"v","","","",""],["Spin","Combo","CoSp","","",1.5,1.7,2,2.5,3,"B",1,2,3,4,"v","","","",""],["Spin","Flying Combo","FCoSp","","",1.5,1.7,2,2.5,3,"B",1,2,3,4,"v","","","",""],["Spin","Change Combo","CCoSp","","",1.7,2,2.5,3,3.5,"B",1,2,3,4,"v","","","",""],["Spin","Flying Change Combo","FCCoSp","","",1.7,2,2.5,3,3.5,"B",1,2,3,4,"v","","","",""],["Step Sequence","Step Sequence","StSq","","",1.5,1.8,2.6,3.3,3.9,"B",1,2,3,4,"","","","",""],["Choreo","Choreographic Step Sequence","ChSq","","","",3,"","","",1,"","","","","","","","",""]];  
var elements;
var students;
var scoring;


class Scoring {
  constructor(){
    this.elementList = [];
    this.goe = 0;
    this.currentElement = {};
    this.comboElements = [];
    this.currentCode = "";
    this.currentScore = 0;
    }
    addElement(input){
      let element = buildNewElement(input)
        if (element){
      if ((this.comboElements.includes(element.name) && this.elementList.length < 3 ) || this.elementList.length == 0){
        element.index = this.elementList.length
        this.elementList.push(element)
        this.currentElement = element;
        this.updateComboElements();
        this.score();
        this.code();
      } else{
        console.log("can't add")
      }
    }
    else{
      console.log("not an element")
      M.toast({html:"Invalid Element"})
    }
  }
    updateComboElements(){
      let listLength = this.elementList.length;
      if (listLength>0){
        this.comboElements = this.currentElement.combo
        if (this.elementList[listLength-1].sequence) {this.comboElements.push(this.elementList[listLength-1].sequence)}
      } else{
        this.comboElements = [];
      }
    }
    removeElement(){
      let removedElement = this.elementList.pop();
      if (this.elementList.length == 0){
        this.clear();
      } else{
      this.score();
      this.code();
      if (removedElement.index == this.currentElement.index){
      this.currentElement = this.elementList[this.elementList.length-1]
      }
      this.updateComboElements();
    } 
    return this;
  }
    updateGOE(num){
      this.goe = num;
      this.score();
      this.code();
    }
    updateMods(mod){
      this.currentElement.updateMods(mod);
      this.score();
      this.code();
      return this;
    }
    updateLevel(lev){
      this.currentElement.updateLevel(lev);
      this.score();
      this.code();
      return this;
    }
    updateRotations(rot){
      let currentElement = this.currentElement;
      console.log(currentElement)
      currentElement.updateRotations(rot);
      this.score();
      this.code();
      return this;
    }

    code(){
      let codeArray = this.elementList.map(e=>e.code())
      let code = codeArray.join("+");
      this.currentCode = code;
      return code;
    }

    score(){
      let elements = this.elementList;
      let pointsArray = elements.map((e)=>{return e.score()})
      let max = Math.max(...pointsArray);
      let goeScore = (elements[0].type == "Choreo")?this.goe*.5:max*.1*this.goe;
      let sum = pointsArray.reduce((a,b)=>{return a+b},0);
      let score = sum+goeScore;
      this.currentScore = score;
      return (sum+goeScore).toFixed(2);
    }
    changeCurrentElement(index){
      this.currentElement = this.elementList[index]
    }
    clear(){
      this.elementList = [];
      this.goe = 0;
      this.currentElement = false;
      this.comboElements = [];
      console.log("scoring cleared")
    }
 }
class Element {
  constructor(elementType,elementName,elementCode,elementBaseValues, mods) {
    this.type = elementType;  
    this.name = elementName;
    this.combo = [];
    this.baseCode = elementCode;
    this.baseValues = elementBaseValues;
    this.levels = [];
    this.rotations = [];
    this.sequence = "";
    this.modifiers = mods;
    this.currentComboElements = [];
    this.currentMods = [];
    this.currentLevel = "";
    this.currentRotations = "";
    this.currentCode = "";
    this.currentScore = 0.00;
  }
  updateMods(mod){
    let currentMods = this.currentMods;
    let possibleMods = this.modifiers;
    let rotMods = ["q","<","<<"]
    let edgeMods = ["!","e"]
    let spinMods = ["v"]
    let allMods = [rotMods,edgeMods,spinMods];
    if (currentMods.includes(mod)){
      currentMods = currentMods.filter(e=>e!=mod)
    } else{
      allMods.forEach(e=>{
        if(e.includes(mod)){
          currentMods = currentMods.filter(f=>!e.includes(f))
          currentMods.push(mod)
        }
      })
    }
    this.currentMods = possibleMods.filter(e=>currentMods.includes(e))
    this.refresh();
    console.log(this)
    }
  
    
    updateLevel(level){
      this.currentLevel = level
      this.refresh();
      return this
    }
    updateRotations(rots){
      this.currentRotations = rots;
      this.refresh();
      return this
    }

    refresh(){
      this.currentCode = this.code();
      this.currentScore = this.score();
    }
    code(){
      let code = this.currentRotations+this.baseCode+this.currentLevel+this.currentMods.join("")
      return code;
    }
    score(){
      return 0.00
    }
}
class Jump extends Element {
    constructor(elementType,elementName,elementCode,elementBaseValues, comboElements, sequenceElements, rotationsArray,mods){
      super(elementType,elementName,elementCode,elementBaseValues,mods)
      this.rotations = rotationsArray;
      this.combo = comboElements;
      this.sequence = sequenceElements;
      this.currentRotations = this.rotations[0]
      this.currentCode = this.code();
      this.currentScore = this.score();
      }

      score(){
        let basePoints = this.baseValues[this.currentRotations];
        let modMulti = 1;
        if (this.currentMods){
          if (this.currentMods.includes("<<")){basePoints = this.baseValues[this.currentRotations-1]};
          if (this.currentMods.includes('e')){modMulti-=.2};
          if (this.currentMods.includes('<')){modMulti-=.2};
        }
        let points = basePoints*modMulti
          return parseFloat(points)
      }
} 
class Spin extends Element {
    constructor(elementType,elementName,elementCode,elementBaseValues,levelsArray,mods){
      super(elementType,elementName,elementCode,elementBaseValues,mods)
      this.levels = levelsArray;
      this.currentLevel = this.levels[0]
      this.currentCode = this.code();
      this.currentScore = this.score();
      }
      score(){
        let lev = this.currentLevel
        if (lev =="B") {lev = 0}
        let basePoints = this.baseValues[lev];
        let modMulti = 1;
        if (this.currentMods.includes("v")){modMulti = 0.75};
        let points = basePoints*modMulti;
        return parseFloat(points);
      }
} 
class Step extends Element {
    constructor(elementType,elementName,elementCode,elementBaseValues,levelsArray,mods){
      super(elementType,elementName,elementCode,elementBaseValues,mods)
      this.levels = levelsArray;
      this.currentLevel = this.levels[0]
      this.currentCode = this.code();
      this.currentScore = this.score();
      }
      score(){
      let basePoints = this.baseValues[(this.currentLevel=="B"?0:this.currentLevel)]
      let points = parseFloat(basePoints);
      return points;
      }
      
  } 
class Choreo extends Element {
    constructor(elementType,elementName,elementCode,elementBaseValues,levelsArray,mods){
      super(elementType,elementName,elementCode,elementBaseValues,mods)
      this.levels = levelsArray;
      this.currentLevel = this.levels[0]
      this.currentCode = this.code();
      this.currentScore = this.score();
      }
      score(){
        return 3.00;
      }
      
  }



function buildNewElement(entry){
  let rotArray = [/single/i,/double/i,/triple/i,/quadruple|quad/i]
  let element;
  let input = entry.toUpperCase();
  input = input.trim();
  var therotations = 0;
  var thelevel = 0;
  for (i in rotArray){
    let regex = rotArray[i]
    if (regex.test(input)){
      input = input.replace(regex,"")
      therotations = parseInt(i)+1
      console.log(input);
      input = input.trim();
    }
  }
  if (parseInt(input.charAt(0))){
    therotations = parseInt(input.charAt(0));
    input = input.substring(1)
  }
  if (parseInt(input.charAt(input.length-1)) || input.charAt(input.length-1) == "B"){
    thelevel = input.charAt(input.length-1);
    input = input.slice(0,-1)
  }
  input = input.replace(/spin/i,"")
  input = input.trim();
  console.log(input)
  let data = sovData.filter(e=>(e[1].toUpperCase()==input.toUpperCase()||e[2].toUpperCase()==input.toUpperCase()));
  if (data.length == 0) {return false}else{
    data = data[0]
    console.log(data)
  let type = data[0];
    let name = data[1];
    let code = data[2];
    let combo = data[3].split(',');
    let sequence = data[4];
    let baseValues = data.slice(5,10).filter(item=>item!=="");
    let lev = data.slice(10,15).filter(item=>item!=="");
    let mods = data.slice(15).filter(item=>item);
    if (type == 'Jump') {
      element = new Jump(type, name, code,baseValues,combo, sequence,lev,mods);
      if (therotations) {element.updateRotations(therotations)}
      }
      else if(type == 'Spin'){
      element = new Spin(type, name, code, baseValues,lev,mods)
      if (thelevel){element.updateLevel(thelevel)}
      }
      else if(type == 'Step Sequence'){
      element = new Step(type, name, code,baseValues,lev,mods)
      if (thelevel){element.updateLevel(thelevel)}
      }
      else if (type =="Choreo"){
      element = new Choreo(type, name, code,baseValues,lev,mods)
      if (thelevel){element.updateLevel(thelevel)}
      }
      return element; 
}}

function buildElements(arr){
  elements = arr.map(e=>{
    let type = e[0];
    let name = e[1];
    let code = e[2];
    let combo = e[3].split(',');
    let sequence = e[4];
    let baseValues = e.slice(5,10).filter(item=>item!=="");
    let lev = e.slice(10,15).filter(item=>item!=="");
    let mods = e.slice(15).filter(item=>item);
    
    if (type == 'Jump') {
    return new Jump(type, name, code,baseValues,combo, sequence,lev,mods);
    }
    else if(type == 'Spin'){
    return new Spin(type, name, code,baseValues,lev,mods)
    }
    else if(type == 'Step Sequence'){
    return new Step(type, name, code,baseValues,lev,mods)
    }
    else if (type =="Choreo"){
    return new Choreo(type, name, code,baseValues,lev,mods)
    }
    }
  )
 
  console.log(elements);
  window.localStorage.setItem("elements", JSON.stringify(elements))
}

