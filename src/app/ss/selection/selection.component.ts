import { Component } from '@angular/core';
import { SecretServiceService } from 'src/app/services/secret-service.service';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.css']
})
export class SelectionComponent {
  confirmedGroup: boolean = false;
  password: string = '';
  seeMembers: boolean = false;
  ssReveal: boolean = false;
  membersGroup: Array<any> = [];
  members: Array<any> = [];
  memberPairs: Array<any> = [];
  selectedGroup: any;
  getGroup: any;
  member: string = '';
  finalList: Array<string> = [];
  sSanta: string = '';
  groupID: string = '';
  membersID: string = '';
  allData: any;
  allMembers: any;
  pairing?: any;
  hide:boolean = false;
  hasPairs:boolean = false;
  newMembers: Array<string> = [];
  finalPairings: any;

  constructor(private ss:SecretServiceService){}

  ngOnInit(): void{
    this.ss.loadGroup().subscribe(val=>{
      this.membersGroup = val
    })
  }



  getAllMembers(groupName:string){
    
    this.ss.loadMembers(groupName).subscribe(val=>{
      this.getGroup = val[0].data
      this.groupID = val[0].id
      if(this.password==this.getGroup.password){
        console.log('passed')
        this.confirmedGroup = true;
      }
      else{
        alert('incorrect password')
        return;
      }
      const allMembers = Object.fromEntries(
        Object.entries(this.getGroup).filter(([key])=> key!=='groupName'&& key!=='numero')
      )
      
      this.members = [...new Set(Object.values(allMembers).flat())]
      Object.keys(allMembers).forEach(key=>{
        if(key[0]==='!'){
          const correspondingKey=key.slice(1);
          this.memberPairs.push([allMembers[correspondingKey], allMembers[key]])
        }
      })
      this.pairings()
    })
  }

  async pairings(): Promise<any>{
    console.log(this.hasPairs, 'first')
    this.ss.loadPairings(this.groupID).subscribe(val=>{
      if(!val[0]){
        this.hasPairs = false;
      }
      else{
        this.hasPairs = true
        this.pairing = val
      }
    })
  }

  getSS(member:string){
    this.ssReveal = true;
    for(let list of this.memberPairs){
      if(!list.includes(member) && !this.finalList.includes(list[0])){
        this.finalList.push(list[0])
      }
    }
    console.log(member,this.finalList,'1')
    if(this.hasPairs){
      this.finalList = this.finalList.filter((item: any) => {
        const foundObject = this.pairing.find((obj: { secretSanta: any; }) => obj.secretSanta === item);
        return !foundObject; // Filter out items that have a matching 'name' in the array of objects
      });
    }
    console.log(this.finalList, '2')
    this.sSanta = this.finalList[Math.floor(Math.random()*this.finalList.length)]
    this.hide=true;
    this.pairing = {'member':this.member,'secretSanta':this.sSanta}
    this.ss.updatePairings(this.groupID, this.pairing)
  }

  async getNames(){
    try{
      await this.pairings()
    }
    catch{
      console.error();
    }
    this.seeMembers = true;
    this.ss.loadNames(this.groupID).subscribe(val=>{
      this.allData = val[0].data;
      this.allMembers = this.allData.memberNames;
      this.newMembers = this.allData.memberNames;
      this.membersID = val[0].id;
      if(this.hasPairs){
        this.newMembers = this.allMembers.filter((item: any) => {
          const foundObject = this.pairing.find((obj: { member: any; }) => obj.member === item);
          return !foundObject; // Filter out items that have a matching 'name' in the array of objects
      });
      }
    })
  }

  seeAllPairings(){
    this.ss.loadPairings(this.groupID).subscribe(val=>{
      this.finalPairings = val
      console.log(val)
    })
  }
}
