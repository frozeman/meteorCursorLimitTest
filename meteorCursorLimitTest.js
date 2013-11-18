myCollection = new Meteor.Collection('myColl', {connection: null});


if (Meteor.isClient) {



  // set default orderType
  Session.setDefault('orderType', 'itemId');
  Session.setDefault('rerunHelper', _.uniqueId());


  // The cursor gets passed trough the helper to the grid template
  Template.main.theCursor = function () {

    var order = Session.get('orderType');

    if(order === 'itemId')
      return myCollection.find({}, {sort: {'itemId': 1}});
    if(order === 'name')
      return myCollection.find({}, {sort: {'name': 1}});
  };

  Template.main.events({
    'click button.order' : function () {
      if(Session.equals('orderType','itemId'))
        Session.set('orderType', 'name');
      else
        Session.set('orderType', 'itemId');
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
          itemId: i + 1,
          name: Math.random().toString(36).substring(7)
        });
      }

  };


  Template.grid.isHelperCalled = function(){
    Session.get('rerunHelper');
    console.log('List item helper called');
  };



}


