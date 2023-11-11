import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CheckWordService } from 'src/app/services/check-word.service';
import { Challenge } from 'src/app/models/challenge';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  constructor(private http: HttpClient, private checkWord: CheckWordService){}

  checkValidity: boolean = false;
  userWord: string = '';
  userName: string = '';
  title: string = '';
  submitData: Challenge | undefined;

  ngOnInit(): void{  }

  async onClick(word: string){
    console.log(this.checkValidity, 'initial', word)
    try{
      await this.checkWord1(word)
      if(this.checkValidity){
      }
    }
    catch (error:any){
      alert('please enter a valid word')
      this.userWord = ''
    }
    if(this.checkValidity && this.userName && this.userWord){
      this.submitData = {name: this.userName, word: this.userWord, title:this.title, createdAt: new Date()}
      this.checkWord.sendWord(this.submitData)
      alert('Your word has been successfully submitted!')
    }
    else{
      alert('there has been an error, please check all the fields')
    }
    this.userName = ''
    this.userWord = ''
    this.title = ''
    this.submitData = {name: '', createdAt:new Date(), title:'', word:''}
  }

  async checkWord1(word:string): Promise<any>{ 
    const rObject = await this.http.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .toPromise()
    try {
      this.checkValidity = true
    }
    catch (error:any) {
      this.checkValidity = false
      if(error.status===404){
        console.log('here is an error from function!', word)
      }
    }
  } 
}
