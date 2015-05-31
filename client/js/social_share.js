if(Meteor.isClient) {
  Template.socialShareBasic.helpers({
    opts: function() {
      var opts ={
        facebook: true,
        twitter: true,
        pinterest: false,
        shareData: {
          url: window.location.href
        }
      };
      return opts;
    }
  });
}