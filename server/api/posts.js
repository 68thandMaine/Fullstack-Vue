const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get Posts
router.get('/', async (req, res) => {
  const posts = await loadPostCollection();
  res.send( await posts.find({}).toArray() );
});
// Add Posts
router.post('/', async (req, res) => {
  const posts = await loadPostCollection();
  await posts.insertOne({
    text: req.body.text,
    createdAt: new Date()
  });
  res.status(201).send();
});
// Delete Posts
router.delete('/:id', async (req, res) => {
  const posts = await loadPostCollection();
  await posts.deleteOne( {_id: new mongodb.ObjectID(req.params.id)} );
  res.status(200).send();
})
// Update Posts
router.put('/:id', async (req, res) => {
  const posts = await loadPostCollection();
  await posts.update( {_id: new mongodb.ObjectID(req.params.id)}, {
    $set: {
      text: req.body.text,
      createdAt: new Date()
    },
  });
  res.status(201).send();
})

async function loadPostCollection() {
  const client = await mongodb.MongoClient.connect('mongodb+srv://crudnicky:Aa195869@fullstack-vue-tutorial-1auxe.mongodb.net/test?retryWrites=true ', {
    useNewUrlParser: true
  });
  return client.db('fullstack-vue-tutorial').collection('posts');
}

module.exports = router;