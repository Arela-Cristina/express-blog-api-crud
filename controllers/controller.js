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

  const lastElement = posts.at(-1);
  const newId = lastElement.id + 1;

  const isValid = validatePostFields(req, res);
  if (!isValid) return; // ritorna errori se ci sono

  const { name, thumb, tier, tag, quality } = req.body;

  //new object
  const newPost = {
    id:newId,
    name: name,
    description: 'This is a Description',
    thumb: thumb,
    tag:tag,
    tier: tier,
    quality:quality,
    published:true

  };

  posts.push(newPost);
  res.status(201); //risposta di stato
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

  const isValid = validatePostFields(req, res);
  if (!isValid) return; // ritorna errori se ci sono

  const { name, thumb, tier, tag, quality } = req.body;

  post.name = name;
  post.thumb = thumb;
  post.tier = tier;
  post.tag = tag;
  post.quality = quality

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
  const { name, tier, tag, quality } = req.body;

  if (!name || !tier || !tag || !quality) {
    res.status(400).json({
      error: "Compilare i campi mancanti",
      message: "I campi 'title', 'tipos' e 'img' sono obbligatori.",
    });
    return false; // Ritorna `true` se ci sono errori
  }

  return true; // Ritorna `false` se non ci sono errori
};
