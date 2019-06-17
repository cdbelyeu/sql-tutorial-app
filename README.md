#Purpose
A simple Nod.js/Express.js CRUD app

# The tutorial
When you initially open the app, the home page will work, but none of the other pages will. This is because all of the database functionality other than the query for the loading page hasn't been implemented.

# Setting up your database
Connect to your database server in PGAdmin. Create a database (I've named mine blogDemo. You can name it whatever you want as long as you properly configure your connection in the following step).

# Connecting to your database server
At the top of the postRepository file, you will find a method creating a new Pool object.
A pool is a managed collection of database connections. Using a Pool instead of directly connecting to the database means that our app won't have to re-perform the costly process of creating a database connection with every request we make.

Set up the pool with the correct user credentials and url to connect to your Postgres server and database. It has already been set to look for a local postgres server with the default user.

# Add the post table
In PGAdmin, add your table by running the following sql statement.
`
CREATE TABLE post(
    title varchar(256),
	slug varchar(256),
    body varchar(4000),
    author_name varchar(256)
);
`
This will create a database table with:
A title (a text string up to 256 characters long)
A slug (this is the url that people will use to specify a specific blog entry. It is also a text string up to 256 characters long)
A body (4000 characters of text for whatever they want to say)
An author_name (the name of the author of the blog entry)

In order to have more than just an empty table, run the following statement to add a single test entry to your blogs table

`
INSERT INTO post(title, slug, body, author_name)
VALUES ('Hello World', 'health_check_post', 'Hey guys, I made a blog!', 'Chris Belyeu');
`

# Load the app
2) Navigate to the home directory of the locally cloned repository and run npm install
3) Run npm start
4) Open http://localhost:3000 in a web browser



You should see the homepage of the app!
There is only one post so far, it's the hello world post that we manually added, but if you try to open it, you will get an error.
That's because while we have a sql query to list all of the posts, queries to view a single post, create a post, update a post, or delete a post are still missing

If you open the postRepository file, you will find method stubs for the different CRUD requests you need to bring the app to life. I suggest you implement and test them in this order

getOne
getByAuthorName
saveNewPost
update
deletePost