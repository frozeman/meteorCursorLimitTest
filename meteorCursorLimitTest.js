myCollection = new Meteor.Collection('myColl', {connection: null});

mySecondCollection = new Meteor.Collection('mySecondColl', {connection: null});

if (Meteor.isClient) {



  // set default limit
  Session.setDefault('limit', 10);
  Session.setDefault('rerunHelper', _.uniqueId());


  // The cursor gets passed trough the helper to the grid template
  Template.main.theCursor = function () {
    return myCollection.find({}, {limit: Session.get('limit')});
  };

  Template.main.events({
    'click button.increase' : function () {
      Session.set('limit', Session.get('limit') + 10);
    },
    'click button.rerun' : function () {
      Session.set('rerunHelper', _.uniqueId());
    }
  });


  // fill the collection BEFORE the template gets rendered
  // for (var i = 0; i < 20; i++) {
  //   myCollection.insert({
  //     itemId: 5
  //   });
  // }


  Template.grid.rendered = function(){

      // fill the collection AFTER the template gets rendered
      for (var i = 0; i < 80; i++) {
        myCollection.insert({
          itemId: i + 1
        });
      }

  };


  Template.grid.isHelperCalled = function(){
    Session.get('rerunHelper');
    console.log('List item helper called');
  };



}


