import { LightningElement, wire } from 'lwc';
import getOrder from '@salesforce/apex/DatatableOrderController.getOrder'
const COLUMNS = [
    {label:'Order Name', fieldName:'Name'},
    {label:'Account', fieldName:'Account__c'},
    {label:'ITotal Amount', fieldName:'Total_Amount__c', type:'number'},
    {label:'Payment Due date', fieldName:'Payment_Due_date__c', type:'date'},
]
export default class DatatableOrder extends LightningElement {
    tableData
    columns = COLUMNS

    @wire(getOrder)
    ordersHandler({data, error}){ 
        if(data){            
            this.tableData = data
            console.log(this.tableData)
        }
        if(error){
            console.error(error)
        }
    }
}