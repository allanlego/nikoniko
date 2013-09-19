Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',
 
    // Remove this override in production (in-rally use)
    getAppId : function() { return "14154311144"; },
    getCurrentUser : function() {
        return this.getContext().getUser().ObjectID;
    },

    _encodeKey : function(date, user) {
        return date + "/" + user; 
    },
    
    items: [
        {
            xtype: "container",
            itemId: "outercontainer",
            layout: {
                type: "vbox"
            },
            items: [
                {
                    xtype: "container",
                    itemId: "labelcontainer",
                    layout: {
                        type: "hbox",
                        align: "stretch"
                    }
                },
                {
                    xtype: "container",
                    itemId: "buttoncontainer",
                    layout: {
                        type: "hbox",
                        align: "stretch"
                    }
                }
            ]
        },
    ],

    launch: function() {
        //Write app code here
    //    this.getPreferencesByDateAndUser(today, user);
        this._doButtonLayout();
    
    },
    
    _doButtonLayout : function() {
        var today = Ext.Date.format(new Date(), "Y-m-d");

        var button1 = Ext.create('Rally.ui.Button', {
           text: "Good",
           listeners: {
               click: function(button, event) { 
                   this.saveMood(today, this.getCurrentUser(), 3);
               },
               scope: this
           },
           
        });
        var button2 = Ext.create('Rally.ui.Button', {
           text: "Neutral",
           listeners: {
               click: function(button, event) { 
                   this.saveMood(today, this.getCurrentUser(), 2);
               },
               scope: this
           },
        });
        var button3 = Ext.create('Rally.ui.Button', {
           text: "Bad",
           listeners: {
               click: function(button, event) { 
                   this.saveMood(today, this.getCurrentUser(), 1);
               },
               scope: this
           },
           
        });
    
        
        var labelToday = Ext.create('Ext.Component', {
            html: today
        });
        
        
        this.down('#labelcontainer').add(labelToday);
        this.down('#buttoncontainer').add(button1);
        this.down('#buttoncontainer').add(button2);
        this.down('#buttoncontainer').add(button3);
    },
    
    getPreferencesByDateAndUser:function(date, user){
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
