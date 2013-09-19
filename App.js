Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',

    launch: function() {
        //Write app code here
        this.saveMood("2013-09-19", "test", 1);
        this.getPreferencesByUserAndDate("2013-09-19", "test");
    },
    
    
    getPreferencesByUserAndDate:function(date, user){
        console.log("Getting mood.....");
        Rally.data.PreferenceManager.load({
            additionalFilters :[
                {
                    property: 'Name',
                    operator: 'contains',
                    value: date + ";" + user
                }
            ],
            appID: "14154311144",
            scope:this,
            success:function(preferences) { console.log("Got: ", preferences)} 
        });
    },

    //adds one saves the preferences
    saveMood:function(date, user, mood){
        console.log("Saving mood.....");
        var key = date + ";" + user;
        var value = mood;
        
        Rally.data.PreferenceManager.update({
            appID: "14154311144",
            scope: this,
            settings:{
                key: value
            },
            success: function(updatedRecords, noUpdatedRecords) { console.log("Mood stored for " + user + " on " + date + ": " + mood); console.log(updatedRecords); console.log(noUpdatedRecords); }
        });
    },

    
});
