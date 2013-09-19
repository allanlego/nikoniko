Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',
    getAppId : function() { return "14154311144"; },

    _encodeKey : function(date, user) {
        return date + "/" + user; 
    },

    launch: function() {
        //Write app code here
        var today = "2013-09-19";
        var user = "t424est2";
        var mood = 2;
        
        this.saveMood(today, user, mood);
        this.getPreferencesByUserAndDate(today, user);
    },
    
    getPreferencesByUserAndDate:function(date, user){
        console.log("Getting mood.....");
        Rally.data.PreferenceManager.load({
            additionalFilters :[
                {
                    property: 'Name',
                    operator: 'contains',
                    value: this._encodeKey(date, user)
                }
            ],
            appID: this.getAppId(),
            scope:this,
            success:function(preferences) { console.log("Got: ", preferences)} 
        });
    },

    //adds one saves the preferences
    saveMood:function(date, user, mood){
        console.log("Saving mood.....");
        var key = this._encodeKey(date, user);
        var value = mood;
        
        var mysettings = {};
        mysettings[key] = value;
        Rally.data.PreferenceManager.update({
            appID: this.getAppId(),
            scope: this,
            settings:mysettings,
            success: function(updatedRecords, noUpdatedRecords) { console.log("Mood stored for " + user + " on " + date + ": " + mood); console.log(updatedRecords); console.log(noUpdatedRecords); }
        });
    },

    
});
