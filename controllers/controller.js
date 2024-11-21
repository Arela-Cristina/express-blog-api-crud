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

  if (!post) {
    res.status(404);

    return res.json({
      error: "Post not found",
      message: "Il Post non e stato trovato",
    });
  }

  res.json(post); // ... e ritorna il oggetto completo
}

//store
function store(req, res) {
  console.log("Creiamo un nuovo pasticino");
  console.log("req body", req.body);

  const lastIndex = posts.at(-1);
  const newId = lastIndex.id + 1;

  //creiamo la struttura del oggetto
  const { title, tipos, img } = req.body;

  //control !undefined
  if (!title || !tipos || !img) {
    return res.status(400).json({
      error: "Compilare i campi mancanti",
      message: "I campi 'title', 'tipos' e 'img' sono.",
    });
  }

  //new object
  const newPost = {
    title: title,
    tipos: tipos,
    img: img,
    id: newId,
  };

  posts.push(newPost);
  res.json(newPost);
}

//update
function update(req, res) {
  const id = parseInt(req.params.id);
  console.log(`Aggiornamento pasticino ${id}`);
  // res.send(`Aggiornamento pasticino ${id}`);

  const post = posts.find((el) => el.id === id); //recuperiamo il post
  console.log(`Detagli del pasticino ${id}`);

  if (!post) {
    res.status(404);
    return res.json({
      error: "Post not found",
      message: "Il Post non e stato trovato",
    });
  }

  const { title, tipos, img } = req.body;

  //control !undefined
  if (!title || !tipos || !img) {
    return res.status(400).json({
      error: "Compilare i campi mancanti",
      message: "I campi 'title', 'tipos' e 'img' sono.",
    });
  }

  post.title = title;
  post.tipos = tipos;
  post.img = img;

  res.json(post); // ... e ritorna il oggetto completo
}

//modify
function patch(req, res) {
  const id = parseInt(req.params.id);
  console.log(`Aggiornamento parziale ${id}`);

  const post = posts.find((el) => el.id === id); //recuperiamo il post
  console.log(`Detagli del pasticino ${id}`);

  if (!post) {
    res.status(404);
    return res.json({
      error: "Post not found",
      message: "Il Post non e stato trovato",
    });
  }

  const { title, tipos, img } = req.body;

  if (title) post.title = title;
  if (tipos) post.tipos = tipos;
  if (img) post.img = img;

  res.json(post); // ... e ritorna il oggetto completo
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
