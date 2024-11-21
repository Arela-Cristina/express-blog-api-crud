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
  const post = findPostById(id); //trova il oggetto con id ...
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

  const validation = validatePostFields(req, res);
  if (validation) return; // ritorna errori se ci sono

  const { title, tipos, img } = req.body;

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

  const post = findPostById(id); //recuperiamo il post
  console.log(`Detagli del pasticino ${id}`);

  if (!post) {
    res.status(404);
    return res.json({
      error: "Post not found",
      message: "Il Post non e stato trovato",
    });
  }

  const validation = validatePostFields(req, res);
  if (validation) return; // ritorna errori se ci sono

  const { title, tipos, img } = req.body;

  post.title = title;
  post.tipos = tipos;
  post.img = img;

  res.json(post); // ... e ritorna il oggetto completo
}

//modify
function patch(req, res) {
  const id = parseInt(req.params.id);
  console.log(`Aggiornamento parziale ${id}`);

  const post = findPostById(id); //recuperiamo il post
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

  const postIndex = findPostById(id); //trova il oggetto con id ...
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

//function  2
const findPostById = (id) => {
  return posts.find((el) => el.id === id);
};

//function 1
const validatePostFields = (req, res) => {
  const { title, tipos, img } = req.body;

  if (!title || !tipos || !img) {
    res.status(400).json({
      error: "Compilare i campi mancanti",
      message: "I campi 'title', 'tipos' e 'img' sono obbligatori.",
    });
    return true; // Ritorna `true` se ci sono errori
  }

  return false; // Ritorna `false` se non ci sono errori
};
