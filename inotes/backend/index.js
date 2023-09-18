const connectToMongo=require('./db');
connectToMongo();
const express = require('express')

const app = express()
const port = 5000
app.use(express.json());
//cors
const cors=require('cors');
app.use(cors());

app.get('/', (req, res) => {
  console.log(req.body);
  res.send("This is the homepage");
})

// app.get('/api/auth',(req,res)=>{
//   let obj={
//       name:"Nani",
//       password:"nani"
//   }
//   res.json(obj);
// });
app.use('/api/auth',require('./routes/auth'));

app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
