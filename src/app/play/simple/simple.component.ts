import { Component } from '@angular/core';
import { Form } from '@angular/forms';

@Component({
  selector: 'app-simple',
  templateUrl: './simple.component.html',
  styleUrls: ['./simple.component.css']
})
export class SimpleComponent {
  chosenWord: string =  'guess';
  finalWord: string = '';
  wordArray: Array<string> = [];
  guessedWord: string = '';
  newArray: Array<string> = [];

  box:string='';
  attemptComplete: boolean=false;
  num: number = 0;
  check: boolean = false;
  failed: boolean = false;
  submitted: boolean = false;

  modelBoxes1: string[] = ['','','','',''];
  modelBoxes2: string[] = ['','','','',''];
  modelBoxes3: string[] = ['','','','',''];
  modelBoxes4: string[] = ['','','','',''];
  modelBoxes5: string[] = ['','','','',''];

  attempt1: boolean = false;
  attempt2: boolean = false;
  attempt3: boolean = false;
  attempt4: boolean = false;

  button1: boolean = false;
  button2: boolean = false;
  button3: boolean = false;
  button4: boolean = false;
  button5: boolean = false;

  completed:boolean = false;
  

  constructor(){}

  ngOnInit(): void{
    
  }

  moveBox(event:Event, nextEvent:number, attempt:number){
    switch(attempt){
      case 1:
        this.box='one'
        this.num = 1
        break;
      case 2:
        this.box='two'
        this.num = 2;
        break;
      case 3:
        this.box='three'
        break;
      case 4:
        this.box='four'
        break;
      case 5:
        this.box='five'
        break;
    }
    //thisBox is the current box user is in
    const thisBox = event.target as HTMLInputElement
    //using id of next box to select that element
    const nextBox = document.getElementById(nextEvent.toString() + this.box) as HTMLInputElement
        
    if(/^[a-zA-Z]+$/.test(thisBox.value) && parseInt(thisBox.id)<4){
      nextBox.focus()
      //console.log(thisBox.id)
    } 
  }

  onSubmit(num:number){
    this.check=false;
  switch(num){
      case 1:
        this.wordArray = [...this.chosenWord]
        this.box='one'
        this.checkWord(this.box, this.modelBoxes1)
        this.attempt1 = true;
        this.button1 = true;        
        break;
      case 2:
        this.wordArray = [...this.chosenWord]
        this.newArray=[]
        this.finalWord=''
        this.box='two'
        this.checkWord(this.box, this.modelBoxes2)
        this.attempt2=true
        this.button2 = true
        break;
      case 3:
        this.wordArray = [...this.chosenWord]
        this.newArray=[]
        this.finalWord=''
        this.box='three'
        this.checkWord(this.box, this.modelBoxes3)
        this.attempt3=true
        this.button3=true
        break;
      case 4:
        this.wordArray = [...this.chosenWord]
        this.newArray=[]
        this.finalWord=''
        this.box='four'
        this.checkWord(this.box, this.modelBoxes4)
        this.attempt4=true
        this.button4=true
        break;
      case 5:
        this.wordArray = [...this.chosenWord]
        this.newArray=[]
        this.finalWord=''
        this.box='five'
        this.checkWord(this.box, this.modelBoxes5)
        this.submitted= true
        break;
    }
  }

  // checkWord(box:string){
  //   for(let i=0;i<5;i++){
  //     const element = document.getElementById(i.toString()+box) as HTMLInputElement;
  //     this.newArray.push(element.value);
  //     this.finalWord=this.finalWord+element.value
  //     if(this.newArray[i]==this.wordArray[i]){
  //       element.style.backgroundColor = 'green';
  //       this.wordArray[i]='xx';
  //       console.log(this.wordArray,'green')
  //     }
  //     else if(this.wordArray.includes(element.value)){
  //       element.style.backgroundColor = 'yellow';
  //       console.log(this.wordArray, 'yellow')
  //     }
  //     else{
  //       element.style.backgroundColor = 'red';
  //     }
  //   }
  //   if(this.finalWord==this.chosenWord){
  //     this.completed=true
  //     alert('Successfully completed!')
  //   }
  // }

  checkWord(box:string, modelboxes:any){
    this.newArray = [...modelboxes]
    this.finalWord = modelboxes.join('')
    for(let i=0;i<5;i++){
      const elementGreen = document.getElementById(i.toString()+box) as HTMLInputElement;
      if(this.newArray[i]==this.wordArray[i]){
        elementGreen.style.backgroundColor = 'green';
        this.wordArray[i]='xx';
        this.newArray[i]='xx';
        console.log(this.wordArray,'green')
      }
      else{
        console.log(i)
      }
    }
    for(let i=0;i<5;i++){
      const elementYellow = document.getElementById(i.toString()+box) as HTMLInputElement;
      if(this.wordArray.includes(elementYellow.value)){
        elementYellow.style.backgroundColor = 'yellow';
        console.log('yellow',elementYellow.value )
      }
    }
    for(let i=0;i<5;i++){
      const elementRed = document.getElementById(i.toString()+box) as HTMLInputElement;
      if(elementRed.style.backgroundColor != 'green' && elementRed.style.backgroundColor!='yellow'){
        elementRed.style.backgroundColor = 'red';
      }
    }
    
    if(this.finalWord==this.chosenWord){
      this.completed=true
      alert('Successfully completed!')
    }
  }

  onInput(i:number, n:number){
    switch(n){
      case 1:
        this.check = this.modelBoxes1.every(box => box.trim() !== '');
        break;
      case 2:
        this.check = this.modelBoxes2.every(box => box.trim() !== '');
        break;
      case 3:
        this.check = this.modelBoxes3.every(box => box.trim() !== '');
        break;
      case 4:
        this.check = this.modelBoxes4.every(box => box.trim() !== '');
        break;
      case 5:
        this.check = this.modelBoxes5.every(box => box.trim() !== '');
        this.failed=true;
        break;
    }
  }
  
  onSubmitForm(f:any){
    console.log('HELLOO')
  }
}
