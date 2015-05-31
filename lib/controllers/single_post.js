SinglePostController = BaseController.extend({
  template: 'postPage',
  onBeforeAction: function(){
    !Posts.findOne({status: "published"}) ? this.render('notFound') : this.next();
  },
  waitOn: function(){ 
    return [
      Meteor.subscribe('singlePost', this.params._id)
    ]
  },
  data: function() {
    return {
      post: Posts.findOne(this.params._id)
    }
  }
});
