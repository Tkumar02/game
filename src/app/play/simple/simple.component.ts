import { Component } from '@angular/core';

@Component({
  selector: 'app-simple',
  templateUrl: './simple.component.html',
  styleUrls: ['./simple.component.css']
})
export class SimpleComponent {
  current: number = 0;
  word: string = 'guess';
  inputValues: Array<string> = ['','','','',''];
  backgroundColour: Array<string> = ['white','white','white','white','white'];
  letterStore: Array<string> = [];
  
  constructor() {}

  ngOnInit(): void{
    for(let i=0;i<5;i++){
      this.letterStore.push(this.word.charAt(i))
    }
  }

  moveBox(index: HTMLInputElement,key:any){
    //console.log(key)
    this.current = parseInt(index.id)
    if(this.current<30 && key!='Backspace'){
      const next = (this.current+1).toString()
      document.getElementById(next)?.focus()
    }
    else if(key=='Backspace'){
      const previous = (this.current-1).toString()
      const previousBox = document.getElementById(previous)
      previousBox?.focus()
    }
  }

  onSubmit(){
    for(let i=0;i<5;i++){
      if(this.inputValues[i]==this.word.charAt(i)){
        this.backgroundColour[i] = 'green';
        const indexRemove = this.letterStore.indexOf(this.inputValues[i])
        this.letterStore.splice(indexRemove,1)
     }
    }
    for(let i=0;i<5;i++){
      if(this.letterStore.includes(this.inputValues[i])){
        this.backgroundColour[i] = 'yellow';
        const indexRemove = this.letterStore.indexOf(this.inputValues[i])
        this.letterStore.splice(indexRemove,1)
      }
    }
    
  }
}
