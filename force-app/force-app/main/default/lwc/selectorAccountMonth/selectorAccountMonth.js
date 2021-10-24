import { LightningElement, track,  wire } from 'lwc';
import getAccounts from '@salesforce/apex/SelectorAccountMonthController.getAccounts';
import getMonths from '@salesforce/apex/SelectorAccountMonthController.getMonths';
import getOrder from '@salesforce/apex/DatatableOrderController.getOrder';
import getAccountOrder from '@salesforce/apex/DatatableOrderController.getAccountOrder';
import getAccountMonthsOrder from '@salesforce/apex/DatatableOrderController.getAccountMonthsOrder';

const COLUMNS = [
    {label:'Order Name', fieldName:'Name'},
    {label:'Account ID', fieldName:'Account__c'},
    {label:'Total Amount', fieldName:'Total_Amount__c', type:'number'},
    {label:'Payment Due date', fieldName:'Payment_Due_date__c', type:'date'},
]

export default class SelectorAccountMonth extends LightningElement {
    columns = COLUMNS;

    accountList;
    montsList;

    @track selectedAccount;
    @track selectedMonths;

    tableData;
    tableAccountData;
    tableAccountMonthsData;
           
    /*select accounts*/
    @wire(getAccounts) 
    retrieveAccounts({data, error}){
        let accountArray = new Array();
        if(data){
            for(let key in data){
                accountArray.push({label:data[key],value:key});
            }
            if(error){
                console.error(error);
            }
        }
        this.accountList=accountArray;
    }

    /*select months account*/
    @wire(getMonths, { selectedAccount: '$selectedAccount' }) 
    retrieveMounths({data, error}){
        let monthsArray = new Array();
        if(data){
            for(let key in data){
                monthsArray.push({label:data[key],value:data[key]});
            }
            if(error){
                console.error(error);
            }
        }
        this.montsList=monthsArray;
    }

    /*get order data*/
    @wire(getOrder)
    ordersHandler({data, error}){ 
        if(data){            
            this.tableData = data;
            console.log(this.tableData);
        }
        if(error){
            console.error(error);
        }
    }

    /*get order data select account*/
    @wire(getAccountOrder, { selectedAccount: '$selectedAccount' })
    ordersAccountHandler({data, error}){
        if(data){
            this.tableAccountData = data;
            console.log(this.tableAccountData);
            console.log(this.selectedAccount);
        }
        if(error){
            console.error(error);
        }
    }

    /*get order data select account and month*/
    @wire(getAccountMonthsOrder, {
        selectedAccount: '$selectedAccount', 
        selectedMonths: '$selectedMonths' })
    ordersAccountMonthsHandler({data, error}){
        if(data){
            this.tableAccountMonthsData = data;
            console.log(this.tableAccountMonthsData);
            console.log(this.selectedAccount);
            console.log(this.selectedMonths);
        }
        if(error){
            console.error(error);
        }
    }

    /*hadnling*/
    handleAccountChange(event){
        this.selectedAccount = event?.detail && event?.detail?.value;
        console.log(this.selectedAccount);
    }

    handleMonthsChange(event){
        this.selectedMonths = event?.detail && event?.detail?.value;
        console.log(this.selectedMonths);
    }
    
}