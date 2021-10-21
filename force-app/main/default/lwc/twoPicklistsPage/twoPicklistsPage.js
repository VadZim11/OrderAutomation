import { LightningElement, wire } from 'lwc';
import getAccounts from '@salesforce/apex/PicklistHelper.getAccounts';

export default class TwoPicklistPage extends LightningElement {
    
    profileOptionsList;
    selectedProfile;
       
    @wire(getAccounts) 
    retrieveProfiles({error,data}){
        let tempArray = [];
        if(data){
            for(let key in data){
                tempArray.push({label:data[key],value:key});
            }
        }
        this.profileOptionsList=tempArray;
    }

     
    /*hadnling profiles*/
    handleProfileChange(event){
        this.selectedProfile = event.target.value;
        this.template.querySelector("[data-id='selectId']").value = this.selectedProfile;
    }
   
}