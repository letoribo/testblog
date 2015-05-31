AutoForm.hooks({
  submitPostForm: {
    onSuccess: function(operation, post) {
      Router.go('/');
    }
  },
  submitCommentForm: {
  	 before: {
      method: function(doc){
        if (!Meteor.user()) alertify.alert("You have to log in first");
        doc.postId = Iron.Location.get().path.slice(1);
        var date = moment().toISOString().slice(0, 10) + " " + moment().format("H:mm");
        doc.createdAt = date;
 
        self = this;
        var recaptchaResponse = grecaptcha.getResponse();
        Meteor.call('formSubmissionMethod', recaptchaResponse, function(error, result) {
          if (error) {
            self.result(false);
          } else {
            self.result(doc);
          }
        });
      }
    },
    onSuccess: function(operation, comment) {
      //Router.go('singlePost', {_id: comment.postId});
      //Router.go('singlePost');
      Session.set("selected_post", comment.postId);
      Router.go('myPosts');
    }
  }
});
