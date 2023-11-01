import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  constructor(private http: HttpClient){}

  checkValidity: boolean = false
  inputWord: string = ''

  ngOnInit(): void{  }

  async onClick(word: string){
    console.log(this.checkValidity, 'initial', word)
    try{
      await this.checkWord1(word)
      this.checkValidity = true
      console.log(this.checkValidity, 'in await function')
      if(this.checkValidity){
        console.log('Yes', word)
      }
    }
    catch (error:any){
      this.checkValidity = false
      console.log('word doesnot exist', this.checkValidity)
    }
    console.log(this.checkValidity, 'after function has run', word)
  }

  async checkWord1(word:string): Promise<any>{ 
     const rObject = await this.http.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .toPromise()
    try {
      //console.log('coming from checkIfValid function',data)
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
