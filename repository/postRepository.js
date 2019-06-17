const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'blogDemo',
    password: '',
    port: 5432
});

var executeQuery = (queryString, params) => {
    return pool.connect()
        .then(client => {
            return client.query(queryString, params)
            .then(res => {
                client.release();
                console.log(res.rows)
                return res.rows;
            })
            .catch(e => {
                client.release();
                console.log(e)
            })
        });    
}

var getAll = () => {
    return executeQuery(
        'SELECT * ' + 
        'FROM post',
        []
    );
};

var getOne = (slug) => {
    return executeQuery(
        'SELECT * ' +
        'FROM post ' + 
        'WHERE post.slug = $1 ',
        [slug]
    ).then(posts => {
        return posts[0];
    });
}

var getByAuthorName = (authorName) => {
    return executeQuery(
        'SELECT * ' +
        'FROM post ' + 
        'WHERE post.author_name = $1',
        [authorName]
    )
}

var saveNewPost = (post) => {
    var author_name = 'Chris Belyeu';
    var slug = makeId(20);
    post = {
        ...post,
        author_name: author_name,
        slug: slug
    };

    return executeQuery(
        'INSERT INTO post(title, slug, body, author_name) ' +
        'VALUES($1, $2, $3, $4) ',
        [post.title, post.slug, post.body, post.author_name]
    ).then(result => {
        return getOne(post.slug);
    });
}

var makeId = (length) => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

var update = (post) => {
    return executeQuery(
        'UPDATE post ' + 
        'SET title = $1, body = $2 ' +
        'WHERE slug = $3 ',
        [post.title, post.body, post.slug]
    ).then(result => {
        return getOne(post.slug);
    })
};

var deletePost = (slug) => {
    return executeQuery(
        'DELETE FROM post ' + 
        'WHERE slug = $1',
        [slug]
    )
};

module.exports = { 
    getAll: getAll,
    getOne: getOne,
    getByAuthorName: getByAuthorName,
    saveNewPost: saveNewPost,
    update: update,
    deletePost: deletePost
};