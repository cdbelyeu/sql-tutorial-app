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

var makeId = (length) => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
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
        'SELECT NULL',//todo
        []
    ).then(posts => {
        return posts[0];
    });
}

var getByAuthorName = (authorName) => {
    return executeQuery(
        'SELECT NULL',//todo
        []
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
        'SELECT NULL',//todo
        []
    ).then(result => {
        return getOne(post.slug);
    });
}

var update = (post) => {
    return executeQuery(
        'SELECT NULL',//todo
        []
    ).then(result => {
        return getOne(post.slug);
    })
};

var deletePost = (slug) => {
    return executeQuery(
        'SELECT NULL',//todo
        []
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