const express = require('express');
const bodyParser = require('body-parser');

const { User } = require("./user");

const app = express();
const port = 3000;
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.post('/record', (req, res) => {
    const user = new User({
        name:req.body.name,
        email:req.body.email
    });
    user.save(function(err,result){
        if(err){
            res.json(err);
        }
        else{
            res.json(result._id);
        }
    });
})

app.get('/record', (req, res) => {
    User.findById(req.query.id, function (err, users) {
        if (err) {
            res.json(err);
        }
        res.json(users);
    });
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})
