const { posts } = require("../data/data_base");

function index(req, res) {

    console.log('Index Tags');
    console.log('here', req.query.tag)

    let arrayTags = '';

    arrayTags = posts.map(tag => tag.tag)
    console.log('hereeee', arrayTags);

    const tags = [...new Set(arrayTags.flat())]

    res.json(tags);

}

module.exports = { index };