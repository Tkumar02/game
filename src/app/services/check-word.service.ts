import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CheckWordService {

  constructor( 
    private http: HttpClient
  ) { }

  checkWord(word:string){
    const rObject = this.http.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .subscribe((data:any)=>{
      return{'coming from service file':data}
    },
    (error:any)=>{
      if(error.status===404){
        console.log('here is an error from service!')
      }
    }
    
    
    )
  }
}
