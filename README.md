# creative5

Github link: https://github.com/jtcooper/creative5

Website link: http://54.193.77.79:3002

Implement:

Login to a user to make posts and profile changes

Newsfeed

Add MongoDB connection

Follow users so you only see certain posts

See a user's posts when you click on their profile

Database entries:
{name: string, 
	profileImg: url, 
	bgColor: "#FF0000", 
	interests: string,
  posts: {
    post1: {
      post: string,
      postTime: date,
      comments: { ... }
    },
    post2: {
      post: string,
      postTime: date,
      comments: { ... }
    },
    ...
  },
  following: [usernames]
}
