const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//serve any file in "public as a regular web server would"
app.use(express.static('public'))

let animations = [];
let id = 0;

app.get('/api/items', (req, res) => {
  res.send(animations);
});

app.post('/api/items', (req, res) => {
  id = id + 1;
  let animation = {id:id, type:req.body.type, show:req.body.show, walk:req.body.walk};
  animations.push(animation);
  res.send(animation);
});

app.put('/api/items/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let itemsMap = animations.map(animation => { return animation.id; });
  let index = itemsMap.indexOf(id);
  let animation = animations[index];
    animation.type = req.body.type;
  animation.show = req.body.show;
  console.log(req.body.walk);
  animation.walk = req.body.walk;
  res.send(animation);
});

app.delete('/api/items/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let removeIndex = animations.map(animation => { return animation.id; }).indexOf(id);
  if (removeIndex === -1) {
    res.status(404).send("Sorry, that item doesn't exist");
    return;
  }
  animations.splice(removeIndex, 1);
  res.sendStatus(200);
});

app.listen(3000, () => console.log('Server listening on port 3000!'))
