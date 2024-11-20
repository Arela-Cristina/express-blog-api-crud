const { posts } = require("../data/data_base.js"); //import data_base, cioe array di pasticini

//index
function index(req, res) {
  console.log("Index pasticini");
  //   res.send("Index pasticini");
  console.log("hola", req.query); // req.query: oggetto dove ci sono le prop del mio array

  let postsFilter = posts;

  //filtro per tipo
  if (req.query.tipo) {
    console.log(`elemento que posiede ${req.query.tipo}`);

    postsFilter = posts.filter((post) => {
      return post.tipos.some(
        (item) => item.toLowerCase() == req.query.tipo.toLowerCase()
      );
    });
    console.log(postsFilter);
  }

  //filtro per limite
  const limit = parseInt(req.query.limit);
  if (limit && !isNaN(limit) && limit >= 0) {
    postsFilter = postsFilter.slice(0, limit);
  }

  res.json(postsFilter); //return post in JSON in base alla condizione
}

//show
function show(req, res) {
  const id = parseInt(req.params.id);
  const post = posts.find((el) => el.id === id); //trova il oggetto con id ...
  console.log(`Detagli del pasticino ${id}`);

  let result = post;
  if (!post) {
    res.status(404);

    res.json({
      error: "Post not found",
      message: "Il Post non e stato trovato",
    });

    return;
  }

  res.json(post); // ... e ritorna il oggetto completo
}

//store
function store(req, res) {
  console.log("Creiamo un nuovo pasticino");
  res.send("Creiamo un nuovo pasticino");
}

//update
function update(req, res) {
  const id = req.params.id;
  console.log(`Aggiornamento pasticino ${id}`);
  res.send(`Aggiornamento pasticino ${id}`);
}

//modify
function patch(req, res) {
  const id = req.params.id;
  console.log(`Aggiornamento parziale pasticino ${id}`);
  res.send(`Aggiornamento parziale pasticino ${id}`);
}

//deleted
function destroy(req, res) {
  const id = parseInt(req.params.id);
  console.log(`Eliminazione pasticino ${id}`);

  const postIndex = posts.findIndex((el) => el.id === id); //trova il oggetto con id ...
  console.log(`Detagli del post ${id}`);

  if (postIndex === -1) {
    res.status(404);

    return res.json({
      error: "Post not found",
      message: "Il Post non e stato trovato",
    });
  }

  posts.splice(postIndex, 1);
  res.sendStatus(204);

  //   res.send([postIndex]); // ... e ritorna il oggetto completo
}

module.exports = { index, show, store, update, patch, destroy }; // export functions
