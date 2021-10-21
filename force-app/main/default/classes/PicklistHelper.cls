public with sharing class PicklistHelper {
    public PicklistHelper() {

    }
    @AuraEnabled(cacheable=true)
    public static Map<String,String> getAccounts(){
        Map<String,String> accountsMap = new Map<String,String>();
        for(Account accObj:[select Id, Name from Account where Id in (select Account__c from Order__c)]){  
            accountsMap.put(accObj.Id, accObj.Name);
        }
        return accountsMap;

    }
}