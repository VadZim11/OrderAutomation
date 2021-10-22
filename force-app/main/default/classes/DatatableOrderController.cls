public with sharing class DatatableOrderController {
    @AuraEnabled(cacheable=true)
    public static List<Order__c> getOrder(){
        return [SELECT Id, Name, Account__c, Total_Amount__c, Payment_Due_date__c from Order__c];
    }

}