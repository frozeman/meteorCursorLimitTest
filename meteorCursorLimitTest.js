myCollection = new Meteor.Collection('myColl', {connection: null});

if (Meteor.isClient) {



  // fill the collection BEFORE the template gets rendered
  for (var i = 0; i < 20; i++) {
    myCollection.insert({
      itemId: 5
    });
  }


  // set default limit
  Session.setDefault('limit', 10);


  // The cursor gets passed trough the helper to the grid template
  Template.hello.theCursor = function () {
    return myCollection.find({}, {limit: Session.get('limit')});
  };

  Template.hello.events({
    'click button' : function () {
      Session.set('limit', 20);
    }
  });

  Template.grid.rendered = function(){

      // fill the collection AFTER the template gets rendered
      // for (var i = 0; i < 20; i++) {
      //   myCollection.insert({
      //     itemId: 5
      //   });
      // }

  };


  Template.grid.isRendered = function(){
    console.log('List item rendered');
  };


}


