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
      Session.set('limit', 20);
    },
    'click button.rerun' : function () {
      // Session.set('rerunHelper', _.uniqueId());

      // change the items data
      _.each(mySecondCollection.find().fetch(), function(item){
        mySecondCollection.update(item._id, {$set: { someValue: _.uniqueId() }});
      });
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
      for (var i = 0; i < 20; i++) {
        myCollection.insert({
          itemId: 5
        });
        mySecondCollection.insert({
          itemId: 5
        });
      }

  };
  Template.grid.placeTemplate = function(itemTemplate){
    return Template[itemTemplate].withData(this);
  };




  Template.item.secondColl = function(){
    return mySecondCollection.findOne({itemId:this.itemId});
    // if(this.lastRerunId && this.lastRerunId !== Session.get('rerunHelper'))
      // console.log('Rerun helper');
    // this.lastRerunId = Session.get('rerunHelper');
  };
  Template.item.isCalled = function(){
    console.log('List item helper called');
  };



}


