const express = require('express');
const projects = require('../data/helpers/projectModel.js');
const router = express.Router();

//post project
router.post('/', (req, res) => {
  projects.insert(req.body)
  .then(project => {
    res.status(201).json(project);

  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ error: "There was an error while saving the comment to the database" });
  });
});
router.post('/:id/actions', validateProjectId, (req, res) => {
  const project = req.project;
  projects.getProjectActions(project.id)
  .then(actions => {
    actions.push(req.body);
    res.status(201).json(actions);

  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ error: "There was an error while saving the comment to the database" });
  });
});
//get projects
router.get('/', (req, res) => {
  console.log(req.query);
  projects.get()
  .then(project => {
    res.status(201).json(project);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ error: "The project information could not be retrieved." });
  });
});
//get project by ID
router.get('/:id', validateProjectId, (req, res) => {
    res.status(201).json(req.project);
});
//get project actions by project ID
router.get('/:id/actions',validateProjectId, (req, res) => {
    const project = req.project;
    projects.getProjectActions(project.id)
    .then(actions => res.status(200).json(actions))
    .catch(() => res.status(500).json({error: "error retrieving project from database."}))
});
//delete project
router.delete('/:id', validateProjectId, (req, res) => {
  const project = req.project;
  projects.remove(project.id)
  .then(count => {
    if (count > 0) {
      res.status(201).json(count);
    } else {
      res.status(404).json({ message: "The project with the specified ID does not exist." });
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ error: "The project could not be removed" });
  });
});
//put project by ID
router.put('/:id', validateProjectId, (req, res) => {
  const changes = req.body;
  const project = req.project;
  projects.update(project.id, changes)
  .then(project => {
    res.status(201).json(changes);
  })
  .catch(error => {
    console.log(error);
    res.status(500).json(null);
  });
});

//id validation middlware
function validateProjectId(req, res, next) {
  const id = req.params.id;
  console.log(`req.paramas.id in validateProjectId: ${req.params.id}`);
  projects.get(id)
    .then(project =>{
      if(project){
        req.project = project;
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


function addToActionsArr(req, res, next) {
  const id = req.params.id;
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
