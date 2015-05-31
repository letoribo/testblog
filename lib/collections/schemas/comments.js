var commentFields = {
  email: {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
    label: "E-mail address"
  },
  body: {
    type: String,
    label: 'Comment this post',
    autoform: {
      type: 'textarea',
      rows: 5
    }
  },
  _id: {
    type: String,
    optional: true,
    autoform: {
      omit: true
    }
  },
  postId: {
    type: String,
    optional: true,
    autoform: {
      omit: true
    }
  },
  author: {
    type: String,
    optional: true,
    autoform: {
      omit: true
    }
  },
  createdAt: {
    type: String,
    optional: true,
    autoform: {
      omit: true
    }
  }
};

CommentSchema = new SimpleSchema(commentFields);