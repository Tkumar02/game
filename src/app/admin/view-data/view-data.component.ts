import { Component } from '@angular/core';
import { SecretServiceService } from 'src/app/services/secret-service.service';

@Component({
  selector: 'app-view-data',
  templateUrl: './view-data.component.html',
  styleUrls: ['./view-data.component.css']
})
export class ViewDataComponent {
  groups: any;
  pairings: any;
  group: string = ''
  selected: boolean = false;

  constructor(private ss:SecretServiceService){}

  ngOnInit(): void{
    this.ss.loadGroup().subscribe(val=>{
      this.groups = val
      console.log(this.groups, 'hi')
    })
  }

  seeAllPairings(){
    console.log(this.group)
    this.ss.loadPairings(this.group).subscribe(val=>{
      this.pairings = val
      console.log(val)
    })
    this.selected=true
  }
}
