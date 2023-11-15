import { Component } from '@angular/core';
import { SecretServiceService } from 'src/app/services/secret-service.service';
import { NgForm } from '@angular/forms';
import { GroupInfo } from 'src/app/models/group-info';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent {

  members:number = 0;
  memberArray: Array<any> = [];
  submitDisabled: boolean = true;
  hide:boolean = true;
  confirmed: boolean = false;
  groupName: string = '';
  namesArray: Array<any> = [];
  groupInfo: GroupInfo = {groupName: '',memberNames: []};
  
  constructor (private ss: SecretServiceService) {}
  
  ngOnInit(): void {  }

  submitForm(value:any){
    console.log(value)
  }

 

  onSubmit(form:NgForm){  
    this.groupInfo = {groupName: this.groupName, memberNames: [...this.namesArray]}
    this.ss.submitGroup(form.value, this.groupInfo);
    alert('Successfully submitted group');
    form.reset();
    this.hide = true;
    this.submitDisabled = true;
    this.confirmed=false;
  }

  generateArray(){
    this.memberArray = Array.from({ length: this.members }, (_, index) => index);
    if(this.members>0){
      this.submitDisabled = false;
      this.hide = false;
      this.confirmed=true;
    }
  }

  resetForm(form:NgForm){
    form.reset();
    this.submitDisabled = true;
    this.hide = true;
    this.confirmed = false;
  }
}
