import { Component } from '@angular/core';
import { CheckWordService } from 'src/app/services/check-word.service';
import { Challenge } from 'src/app/models/challenge';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.css']
})
export class ChallengeComponent {
  data: any[] | undefined;
  choice: Challenge | undefined;
  gameStarted: boolean = false

  constructor (private checkWord: CheckWordService) {}

  ngOnInit(): void {
    this.checkWord.loadUsers().subscribe((val)=>{
      this.data = val
    })
  }

  onClick(){
    if(this.choice?.word){
      this.gameStarted = true;
    }
  }
}
