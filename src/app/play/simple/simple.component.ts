import { Component } from '@angular/core';

@Component({
  selector: 'app-simple',
  templateUrl: './simple.component.html',
  styleUrls: ['./simple.component.css']
})
export class SimpleComponent {
  current: number = 0
  word: string = 'guess'
  inputValues: Array<string> = ['','','','','']
  
  constructor() {}

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
    console.log(this.inputValues)
  }
}
