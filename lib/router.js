Router.configure({
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
});

Router.route('/', {
  name: 'root',
  controller: 'MainPageController'
});

Router.route('/new', {
  name: 'newPost'
});

Router.route('/my', {
  name: 'myPosts'
});

Router.onBeforeAction(function() {
  if (!Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
},{only: 'newPost'});

Router.route('/:_id', {
  name: 'singlePost',
  controller: 'SinglePostController'
});
