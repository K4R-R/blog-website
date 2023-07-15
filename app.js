const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes')

//express app
const app=express();

//connect to mongoDB
const dbURI = 'mongodb+srv://karanraghu:mongoDB123@nodejstutorial.2w64gvd.mongodb.net/node-tut?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser:true, useUnifiedTopology: true })
   .then((result) => app.listen(3000))
   .catch((err) => console.log(err));

//register view engine
app.set('view engine','ejs');
//app.set('views','my-views'); or any other folder of your choice

// app.use((req,res,next) => {
//    console.log('new request made');
//    console.log(req.hostname);
//    console.log(req.path);
//    console.log(req.method);
//    next();
// });

//middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended:true }));
app.use(morgan('dev'));

app.get('/', (req,res) => {
   res.redirect('/blogs');
});

app.get('/about', (req,res) => {
   // res.send('<p>about page</p>');
   res.render('about',{title:'About'});
});

//redirects
// app.get('/about-us', (req,res) => {
//    res.redirect('/about');
// });

//blog routes
app.use(blogRoutes);

//404 error
app.use((req,res) => {
   res.status(404).render('404',{title:'404'});
});





//mongoose and mongo sandbox routes

// app.get('/add-blog', (req,res) => {
//    const blog = new Blog({
//       title:'new blog 2',
//       snippet:'about my new blog',
//       body:'more about my new blog'
//    });

//    blog.save()
//       .then((result) => {
//          res.send(result)
//       })
//       .catch((err) => {
//          console.log(err);
//       });
// });

// app.get('/all-blogs',(req,res) => {
//    Blog.find()
//       .then((result) => {
//          res.send(result)
//       })
//       .catch((err) => {
//          console.log(err);
//       });
// })