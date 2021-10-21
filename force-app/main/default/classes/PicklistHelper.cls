public with sharing class PicklistHelper {
    public PicklistHelper() {

    }
    @AuraEnabled(cacheable=true)
    public static Map<String, String> getAccounts(){
        Map<String, String> accountsMap = new Map<String, String>();
        for(Account accObj:[select Id, Name from Account where Id in (select Account__c from Order__c)]){  
            accountsMap.put(accObj.Id, accObj.Name);
        }
        return accountsMap;

    }

    @AuraEnabled(cacheable=true)
    public static Map<String, Date> getMounths(){
        Map<String, Date> mounthsMap = new Map<String, Date>();
        for(Order__c ordObj:[select Id, Payment_Due_date__c from  Order__c]){  
            mounthsMap.put(ordObj.Id, ordObj.Payment_Due_date__c);
        }
        return mounthsMap;

    }
}