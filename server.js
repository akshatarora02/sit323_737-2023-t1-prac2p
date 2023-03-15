const express = require('express')
const {json} = require('express')
const res = require('express/lib/response')
const app = express()
const port = 3000

app.use(express.json());
app.use(express.urlencoded());

let users = [
    { id: 1, name: 'ABC'},
    { id: 2, name: 'DEF'},
    { id: 3, name: 'GHI'},
];


app.get('/',function(req,res){
    res.send('Hello World')
})

app.get('/users',function(req,res){
    res.json(users)
})

app.get('/users/:id',function(req,res){
    var userID = req.params.id;
    var userFound = false;

    users.forEach((user, index, array) => {
        if (user.id == userID) {
            res.status(200).send(users[index]);
            userFound = true;
        }
    });

    if (userFound == false) {
        res.status(400).send("ERROR: User with ID " + userID + " does not exist");
    }

}
)

app.post('/users', (req, res) => {

    if (req.body === undefined) {
      console.log("ERROR: req.body is undefined");
      res.status(400).send("ERROR: req.body is undefined");
    } 
    else {
      userData = JSON.stringify(req.body);
      console.log("Adding new user with data: " + userData);
  
      const newUser = req.body; 
      users.push(newUser); 
      res.status(201).json(newUser); 
    }
    
  }); 

app.put('/users/:id', (req, res) => { 

  const userId = parseInt(req.params.id); 
  console.log("Update user with ID: " + req.params.id);

  const updatedUser = req.body; 

  users = users.map(user => user.id === userId ? updatedUser : user); 
  res.status(200).json(updatedUser); 
}); 
  

app.delete('/users/:id', (req, res) => { 
  const userId = parseInt(req.params.id);

  users = users.filter(user => user.id !== userId); 
  res.status(204).send(); 
  console.log("User with User ID " + userId +" has been deleted")
}); 
  
  
app.listen(port, () => {
    console.log("App running at http://localhost:" + port)
})