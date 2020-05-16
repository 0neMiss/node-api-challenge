const express = require('express');
const actions = require('../data/helpers/actionModel.js');
const router = express.Router();

//actions action
router.post('/', (req, res) => {
  users.insert(req.body)
  .then(user => {
    res.status(201).json(user);

  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ error: "There was an error while saving the comment to the database" });
  });
});

//get actions
router.get('/', (req, res) => {
  console.log(req);
  actions.get()
  .then(action => {
    res.status(201).json(action);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ error: "The action information could not be retrieved." });
  });
});
//get action by ID
router.get('/:id', validateUserId, (req, res) => {
    res.status(201).json(req.action);
});
//delete action by ID
router.delete('/:id', validateUserId, (req, res) => {
  const action = req.action;
  actions.remove(action.id)
  .then(count => {
    if (count > 0) {
      res.status(201).json(count);
    } else {
      res.status(404).json({ message: "The action with the specified ID does not exist." });
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ error: "The action could not be removed" });
  });
});

router.put('/:id', (req, res) => {
  const changes = req.body;
  actions.update(req.params.id, changes)
  .then(action => {
    res.status(201).json(changes);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json(null);
  });
});


function validateUserId(req, res, next) {
  const id = req.params.id;
  console.log(`req.paramas.id in validateUserId: ${req.params.id}`);
  actions.get(id)
    .then(action =>{
      if(action){
        req.action = action;
        next();
    }
    else{
      res.status(404).json({error: 'user not found'});
    }

    })
    .catch(err =>{
      console.log(err);

    })
};

module.exports = router;
