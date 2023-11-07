import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { fiveLetterWords } from 'src/assets/words';

@Component({
  selector: 'app-simple',
  templateUrl: './simple.component.html',
  styleUrls: ['./simple.component.css']
})
export class SimpleComponent {

  fiveLetterWords = fiveLetterWords
  
  chosenWord: string =  '';
  finalWord: string = '';
  wordArray: Array<string> = [];
  finalArray: Array<string> = [];
  guessedWord: string = '';
  newArray: Array<string> = [];

  box:string='';
  attemptComplete: boolean=false;
  num: number = 0;
  check: boolean = false;
  failed: boolean = false;
  submitted: boolean = false;
  invalidWord: boolean = false;
  wrongLetters: Array<any> = []

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
  

  constructor(private http:HttpClient){}

  ngOnInit(): void{

    const randomWord=Math.floor(Math.random() * this.fiveLetterWords.length);
    this.chosenWord = this.fiveLetterWords[randomWord]
    this.finalArray = [...this.chosenWord]
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
    thisBox.value = thisBox.value.toUpperCase()
    //using id of next box to select that element
    const nextBox = document.getElementById(nextEvent.toString() + this.box) as HTMLInputElement
            
    if(/^[a-zA-Z]+$/.test(thisBox.value) && parseInt(thisBox.id)<4){
      nextBox.focus()
    } 
  }
  
  checkBack(event:Event,i:number,box:string){
    const find = event.target as HTMLInputElement
    if((event as KeyboardEvent).key==='Backspace' && i>0 && find.value==''){
      const idBox = (i-1).toString() + box
      const focusTo = document.getElementById(idBox) as HTMLInputElement
      focusTo.focus()
    }
  }

  async onSubmit(num:number){
    this.check=false;
  switch(num){
      case 1:
        this.wordArray = [...this.chosenWord]
        this.box='one'
        try
        {await this.checkWord(this.box, this.modelBoxes1)
          if(!this.invalidWord){
            this.attempt1 = true;
            this.button1 = true;  
          }   
          else{
            this.modelBoxes1 = ['','','','','']
          }   
        }
        catch(error){
          console.log(error)
        }
        break;
      case 2:
        this.wordArray = [...this.chosenWord]
        this.newArray=[]
        this.finalWord=''
        this.box='two'
        // this.checkWord(this.box, this.modelBoxes2)
        // this.attempt2=true
        // this.button2 = true
        try
        {await this.checkWord(this.box, this.modelBoxes2)
          if(!this.invalidWord){
            this.attempt2 = true;
            this.button2 = true;  
          }   
          else{
            this.modelBoxes2 = ['','','','','']
          }   
        }
        catch(error){
          console.log(error)
        }
        break;
      case 3:
        this.wordArray = [...this.chosenWord]
        this.newArray=[]
        this.finalWord=''
        this.box='three'
        try
        {await this.checkWord(this.box, this.modelBoxes3)
          if(!this.invalidWord){
            this.attempt3 = true;
            this.button3 = true;  
          }   
          else{
            this.modelBoxes3 = ['','','','','']
          }   
        }
        catch(error){
          console.log(error)
        }
        break;
      case 4:
        this.wordArray = [...this.chosenWord]
        this.newArray=[]
        this.finalWord=''
        this.box='four'
        try
        {await this.checkWord(this.box, this.modelBoxes4)
          if(!this.invalidWord){
            this.attempt4 = true;
            this.button4 = true;  
          }   
          else{
            this.modelBoxes4 = ['','','','','']
          }   
        }
        catch(error){
          console.log(error)
        }
        break;
      case 5:
        console.log(this.chosenWord)
        this.wordArray = [...this.chosenWord]
        this.newArray=[]
        this.finalWord=''
        this.box='five'
        try
        {await this.checkWord(this.box, this.modelBoxes5)
          if(!this.invalidWord){
            this.button5 = true;  
          }   
          else{
            this.modelBoxes5 = ['','','','','']
          }   
        }
        catch(error){
          console.log(error)
        }
        this.submitted = true;
        if(this.finalWord!=this.chosenWord){
          console.log('failed:', this.failed,'completed: ', this.completed)
        }
        break;
    }
  }

  async checkWord(box:string, modelboxes:any){
    this.newArray = [...modelboxes]
    this.finalWord = modelboxes.join('').toLowerCase()
    try{
      await this.checkIfValid(this.finalWord)
    }
    catch(error:any){
      if (error.status === 404){
        console.log('error!!!')
      }
    }

    if(this.invalidWord){
      modelboxes = ['','','','','']
      this.newArray = []
      alert('according to this weird dictionary im using this word does not exist')
      return
    }
    
    for(let i=0;i<5;i++){
      const elementGreen = document.getElementById(i.toString()+box) as HTMLInputElement;
      if(this.newArray[i].toLowerCase()==this.wordArray[i].toLowerCase()){
        elementGreen.style.backgroundColor = 'green';
        this.wordArray[i]='xx';
        this.newArray[i]='xx';
      }
    }
    for(let i=0;i<5;i++){
      const elementYellow = document.getElementById(i.toString()+box) as HTMLInputElement;
      if(this.wordArray.includes(elementYellow.value.toLowerCase()) && elementYellow.style.backgroundColor!='green'){
        elementYellow.style.backgroundColor = 'yellow';
        const yellowIndex = this.wordArray.indexOf(elementYellow.value.toLowerCase())
        this.wordArray[yellowIndex]='xx';
      }
    }
    for(let i=0;i<5;i++){
      const elementRed = document.getElementById(i.toString()+box) as HTMLInputElement;
      if(elementRed.style.backgroundColor != 'green' && elementRed.style.backgroundColor!='yellow'){
        elementRed.style.backgroundColor = 'red';
        this.wrongLetters.push(elementRed.value.toLowerCase())
      }
    }
    if(this.finalWord==this.chosenWord){
      this.completed=true
      alert('Successfully completed!')
    }
  }

  checkLetter(letter:string, event:Event){
    const wrongBox = event.target as HTMLInputElement
    if(this.wrongLetters.includes(letter) && !this.finalArray.includes(letter)){
      wrongBox.style.color = 'grey';
    }
    else{
      wrongBox.style.color = 'black'
    }
  }

  async checkIfValid(word:string) { 
    try{
      await this.http.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`).toPromise()
        this.invalidWord = false
    }
    catch(error:any){
      this.invalidWord = true
      if(error.status===404){
      }
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
        if(!this.completed)
          {this.failed=true;}
        break;
    }
  }
  
  onSubmitForm(f:any){
  }
}
