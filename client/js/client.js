if (Meteor.isClient) {		
  Deps.autorun(function() {
    Meteor.subscribe('postComments', Session.get("path"));
  });
	 
  Template.postPage.onRendered(function () {
    Session.set('itemsLimit', 10);
    Session.set('path', Iron.Location.get().path.slice(1));
  });
  
  Template.postPage.helpers({
    comments: function () {
    	var postId = Session.get("path");
      return Comments.find({postId: postId}, {limit : Session.get("itemsLimit")});
    }
  });

  Template.postsList.onRendered(function () {
    Session.set('postsLimit', 15);
    Session.set('path', Iron.Location.get().path.slice(1));
  }); 
  
  Template.postsList.helpers({
    posts: function () {
    	var post = Posts.find({status: "published"}, {limit : Session.get('postsLimit')});
      return post;
    }
  });

  Template.myPosts.helpers({
    posts: function () { 
      return Posts.find({author: Meteor.user().profile.name}, {limit : Session.get('postsLimit')});
    },
    comments: function () { 
      return Comments.find({postId: this._id}, {limit : Session.get("itemsLimit")});
    },
    status: function () { 
      return this.status;
    },
    isSelected: function () { 
      return Session.equals("selected_post", this._id);
    }
  });
  
  Template.myPosts.onRendered(function () {
    Session.set('postsLimit', 15);
    Session.set('path', Iron.Location.get().path.slice(1));
  }); 
  
  Template.myPosts.events({
  'click #deletePost': function () { 
    var postId = this._id;
    alertify.confirm('Really delete "' + this.title + '"?', function (e) {
      if (e) {
        Meteor.call('deletePost',{_id: postId}); 
        Meteor.call('deletePostComments',{postId: postId});
      }
    });  
  },
  'click #deleteComment': function () { 
    var commentId = this._id;
    alertify.confirm("Really delete?", function (e) {
      if (e) {
        Meteor.call('deleteComment',commentId); 
      }
    });  
  },
  'click #status': function () {
    var postId = this._id; 
    var status = this.status === "published" ? "unpublished" : "published";
    Meteor.call('status', postId, status); 
  },
  'click': function () {
    Session.set("selected_post", this._id); Meteor.subscribe('postComments', this._id);
  }
});

  $(window).scroll(function(){ 
    var scroll = $(window).scrollTop();
    var diff = $(document).height() - $(window).height(); 
    var approximate_equality = Math.abs(Math.round(diff - scroll)) == 1 || Math.abs(Math.round(diff - scroll)) == 0;
    if(approximate_equality) {
      Session.get("path") === "" || Session.get("path") === "my" ? Session.set("postsLimit", Session.get("postsLimit") + 1) : Session.set("itemsLimit", Session.get("itemsLimit") + 1);    	
    }
  });

}
