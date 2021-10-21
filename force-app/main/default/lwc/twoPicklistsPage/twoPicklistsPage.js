import { LightningElement, wire } from 'lwc';
import getAccounts from '@salesforce/apex/PicklistHelper.getAccounts';
import getMounths from '@salesforce/apex/PicklistHelper.getMounths';
export default class TwoPicklistPage extends LightningElement {
    
    accountList;
    selectedAccount;
    mountsList;
    selectedMounths;
       
    @wire(getAccounts) 
    retrieveAccounts({error,data}){
        let accountArray = [];
        if(data){
            for(let key in data){
                accountArray.push({label:data[key],value:key});
            }
        }
        this.accountList=accountArray;
    }

    @wire(getMounths) 
    retrieveMounths({error,data}){
        let mounthsArray = [];
        if(data){
            for(let key in data){
                mounthsArray.push({label:data[key],value:key});
            }
        }
        this.mountsList=mounthsArray;
    }

     
    /*hadnling*/
    handleAccountChange(event){
        this.selectedAccount = event?.detail && event?.detail?.value;
    }

    handleMounthstChange(event){
        this.selectedMounths = event?.detail && event?.detail?.value;
    }
   
}