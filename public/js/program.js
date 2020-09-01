class Program {
    constructor(category){
        this.category = category;
        this.scoringList = [];
        this.currentScoring = new Scoring();
        this.currentElement = false;
    }
    addScoring(){
        this.scoringList.push(new Scoring());
    }
    removeScoring(index){
        this.scoringList.splice(index,1);
    }
    updateGOE(num){
        this.currentScoring.updateGOE(num);
    }
    updateMods(mod){
        this.currentScoring.updateMods(mod);
    }
    updateLevel(lev){
        this.currentScoring.updateLevel(lev);
    }
    updateRotations(rot){
        this.currentScoring.updateRotations(rot);
    }
    clearScoring(){
        this.currentScoring.clear();
    }
    removeElement(){
        this.currentScoring.removeElement();
    }
}