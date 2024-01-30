if (process.env.NODE_ENV !== 'production') {
    require("dotenv").config({ path: '.env' });
}
const  express= require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

const indexRouter = require('./routes/index')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

const mongoose =require('mongoose')
mongoose.connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    bufferCommands: false,

    autoCreate: false
  })

try {

  await mongoose.connect('mongodb://username:password@host:port/database', {

    useNewUrlParser: true,

    useUnifiedTopology: true,

    bufferCommands: false,

    autoCreate: false

  });

  console.log('Connected to MongoDB');

} catch (error) {

  console.error('Error connecting to MongoDB:', error);

}

app.use('/', indexRouter)

app.listen(process.env.PORT || 3000)

