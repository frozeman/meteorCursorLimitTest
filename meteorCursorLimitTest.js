var myCollection = new Meteor.Collection('myColl');//,{connection: null});

if (Meteor.isClient) {

  // fill the collection with some items
  for (var i = 20 - 1; i >= 0; i--) {
    myCollection.insert({
      itemId: i
    })
  };

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


  Template.item.rendered = function(){
    console.log('Item rendered');
  };


  // using a handlebars helper to show the grid, with the cursor from the template above
  Handlebars.registerHelper('GridHelper', function(template, theCursor){
    return Template[template].withData(theCursor);
  });

}


