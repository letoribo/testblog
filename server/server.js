Meteor.publish('allPosts', function(){
  return Posts.find();
});

Meteor.publish('singlePost', function(id){
  return Posts.find(id);
});

Meteor.publish('postComments', function(postId) {
  return Comments.find({postId: postId});
});

Meteor.methods({
  submitPost: function(post) {    
    var user = Meteor.user();
    if (!user) throw new Meteor.Error(401, 'You need to log in first');

    var additionalParams = {
      author: user.profile.name,
      userId: user._id,
      lead: post.body.slice(0, 512),
      createdAt: post.createdAt + " " + moment().format("H:mm"), 
      status: "published"
    }

    _.extend(post, additionalParams);
    post._id = Posts.insert(post);

    return post;
  },
  deletePost: function(postId) {    
    return Posts.remove(postId) && Comments.remove({postId: postId});    
  },
  deletePostComments: function(postId) {    
    return Comments.remove(postId);    
  },
  deleteComment: function(Id) {    
    return Comments.remove(Id);    
  },
  status: function(postId, status) { 
    return Posts.update(postId, {$set: {status: status}});    
  },
  submitComment: function(comment) {  
    var user = Meteor.user();    
    if (!user) throw new Meteor.Error(401, 'You need to log in first');
      
    var additionalParams = {
      author: user.profile.name
    }

    _.extend(comment, additionalParams);  
    comment._id = Comments.insert(comment);
    
    return comment;
  },
  formSubmissionMethod: function(recaptchaResponse) {
    var verifyCaptchaResponse = reCAPTCHA.verifyCaptcha(recaptchaResponse, this.connection.clientAddress);
    if (!verifyCaptchaResponse.success) {
      console.log('reCAPTCHA check failed!', verifyCaptchaResponse);
      throw new Meteor.Error(422, 'reCAPTCHA Failed: ' + verifyCaptchaResponse.error);
    } else console.log('reCAPTCHA verification passed!');

    return true;
  }
});
