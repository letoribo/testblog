MyPostsController = BaseController.extend({
  template: 'myPosts',
  onBeforeAction: function(){
  	 if (!Meteor.user()) {
  	   if (Meteor.loggingIn()) {
  	     this.render(this.loadingTemplate); 
  	   } 
  	   else {
  	     this.render('accessDenied'); 
  	   } 
  	 } else { this.next(); }   	 
  },
  findOptions: function() {
    return { sort: {createdAt: -1}};
  },
  waitOn: function() {
    return Meteor.subscribe('allPosts', this.findOptions());
  },
  data: function(){
    return { posts: Posts.find({}, this.findOptions()) };
  }
});
