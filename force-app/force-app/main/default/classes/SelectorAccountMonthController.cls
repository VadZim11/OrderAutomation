public with sharing class SelectorAccountMonthController {
    public SelectorAccountMonthController() {

    }
    @AuraEnabled(cacheable=true)
    public static Map<String, String> getAccounts(){
        Map<String, String> accountsMap = new Map<String, String>();
        for(Account accObj:[
        SELECT Id, Name 
        FROM Account
        WHERE Id IN (SELECT Account__c FROM Order__c)
        ]){  
            accountsMap.put(accObj.Id, accObj.Name);
        }
        return accountsMap;

    }

    @AuraEnabled(cacheable=true)
    public static Map<String, Integer> getMonths(String selectedAccount){
        Map<String, Integer> monthsMap = new Map<String, Integer>();
        for(Order__c ordObj:[
            SELECT Id, Payment_Due_date__c 
            FROM  Order__c 
            WHERE  Account__c = :selectedAccount
            ]){  
            monthsMap.put(ordObj.Id, ordObj.Payment_Due_date__c.month());
        }
        return monthsMap;

    }
}