public with sharing class DatatableOrderController {

    @AuraEnabled(cacheable=true)
    public static List<Order__c> getOrder(){
        return [
            SELECT Id, Name, Account__c, Total_Amount__c, Payment_Due_date__c 
            FROM Order__c
            ];
    }

    @AuraEnabled(cacheable=true)
    public static List<Order__c> getAccountOrder(String selectedAccount){
        return [
            SELECT Id, Name, Account__c, Total_Amount__c, Payment_Due_date__c 
            FROM Order__c 
            WHERE  Account__c = :selectedAccount
            ];
    }

    @AuraEnabled(cacheable=true)
    public static List<Order__c> getAccountMonthsOrder(String selectedAccount, String selectedMonths){
        Integer months = Integer.valueOf(selectedMonths);
        return [
            SELECT Id, Name, Account__c, Total_Amount__c, Payment_Due_date__c 
            FROM Order__c 
            WHERE  Account__c = :selectedAccount
            AND CALENDAR_MONTH(Payment_Due_date__c) = :months
            ];
    }
}