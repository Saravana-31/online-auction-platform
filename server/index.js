// // const http=require('http');
// const express = require('express');
// const mongoose = require('mongoose');
// const session = require('express-session');
// const bcrypt = require('bcrypt');
// const cors = require('cors');
// const multer = require('multer');
// const bodyParser=require('body-parser');
// // const socketIo = require('socket.io');

// const app = express();
// // const server = http.createServer(app);
// // const io = socketIo(server);
// app.use(express.json());
// app.use(cors({
//   origin: 'http://localhost:3000',
//   credentials: true,
// }));

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use('/uploads', express.static('uploads'));

// // io.on('connection',(socket)=>{
// //   console.log('a user connected');

// //   socket.on('subscribeToItem',(itemId)=>{
// //     socket.join(itemId);
// //   });

// //   socket.on('unsubscribeFormItem',(itemId)=>{
// //     socket.leave(itemId);
// //   });

// //   socket.on('itemSold',(itemId)=>{
// //     io.to(itemId).emit('itemSold');
// //   });
// // });
// // app.set('socketio', io);

// mongoose.connect('mongodb+srv://Saravana:saravana%403128@cluster0.5mlofsi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   serverSelectionTimeoutMS: 5000,
// });
// const User = mongoose.model('User', {
//   name: String,
//   email: String,
//   password: String,
// });

// const Item=mongoose.model('Item',{
//   name: String,
//   description: String,
//   startingPrice: Number,
//   endDate: Date,
//   imagePath: String,
//   userId:{
//     type:mongoose.Schema.Types.ObjectId,
//     ref:'User'
//   },
//   highestBid:{
//     type:Number,
//     default:0
//   },
//   highestBidder:{
//     type:mongoose.Schema.Types.ObjectId,
//     ref:'User'
//   },
//   itemSold:{
//     type:Boolean,
//     default:0
//   }
// });

// const GlobalMessage = mongoose.model('GlobalMessage', {
//   content: String,
//   timestamp: {
//     type: Date,
//     default: Date.now
//   }
// });



// app.use(
//   session({
//     secret: 'mysecret',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false },
//   })
// );
// app.get('/check-session', (req, res) => {
//   console.log(req.session.user); // Check if req.session.user is defined
//   if (req.session.user) {
//     console.log(req.session.user._id); // Attempting to access _id
//   }
//   const user = req.session.user || null;
//   res.json({ user });
// });

// app.post('/signup', async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await User.create({ name, email, password: hashedPassword });
    
//     res.json({ success: true, user });
//     console.log('Success: User registered');
//   } catch (error) {
//     console.error(error);
//     res.json({ success: false, error: 'Error creating user' });
//   }
// });

// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });

//     if (user && (await bcrypt.compare(password, user.password))) {
//       req.session.user = user; // Set the user in the session first
//       console.log(req.session.user._id); // Log the user ID to make sure it's available
//       res.json({ success: true, user });
//       console.log('Success: User logged in');
//     }
    
//      else {
//       res.json({ success: false, error: 'Invalid email or password' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.json({ success: false, error: 'Error logging in' });
//   }
// });

// app.get('/logout', (req, res) => {
//   req.session.destroy();
//   res.json({ success: true });
//   console.log('Success: User logged out');
// });

// const upload=multer({dest:'uploads/'})

// app.post('/add-item', upload.single('itemImage'), async (req, res) => {
//   // const io = req.app.get('socketio');
//   const { name, description, startingPrice, endDate } = req.body;
//   const imagePath = req.file.path;

//   try {
//     if (!req.session.user) {
//       res.json({ success: false, error: 'User not logged in' });
//       return;
//     }
//     console.log(req.session.user._id)
//     const item = await Item.create({
//       name,
//       description,
//       startingPrice,
//       endDate,
//       imagePath,
//       userId: req.session.user._id
//     });

//     // io.emit('itemAdded', item);
//     await GlobalMessage.create({
//       content: `Item ${item.name} is added`
//     });
//     res.json({ success: true, item });
//     console.log("success: item added");
//   } catch (err) {
//     console.log(err);
//     res.json({ success: false, error: 'Error adding item' });
//   }
// });

// app.get('/get-items',async(req,res)=>{
//   try{
//     const items=await Item.find();
//     res.json({success:true,items});
//   }catch(err){
//     console.log(err);
//     res.json({success:false,error:'error fetching items'})
//   }
// });

// app.post('/place-bid/:itemId', async (req, res) => {
//   const itemId = req.params.itemId;
//   const { amount } = req.body;

//   try {
//     const item = await Item.findById(itemId);

//     if (!item) {
//       return res.json({ success: false, error: 'Item not found' });
//     }

//     if (item.itemSold || amount < item.startingPrice || new Date() >= item.endDate || amount <= item.highestBid) {
//       return res.json({ success: false, error: 'Invalid bid' });
//     }

//     item.highestBid = amount;
//     item.highestBidder = item.userId;
//     await GlobalMessage.create({
//       content: `Item ${item.name} has an highest bid of ${item.highestBid}`
//     });
//     await item.save();


//     res.json({ success: true });
//   } catch (error) {
//     console.error(error);
//     res.json({ success: false, error: 'Error placing bid' });
//   }
// });

// // Add this at the bottom of your existing server code
// app.get('/get-messages', async (req, res) => {
//   try {
//     const messages = await GlobalMessage.find();
//     res.json({ success: true, messages });
//   } catch (error) {
//     console.error(error);
//     res.json({ success: false, error: 'Error fetching messages' });
//   }
// });





// // let soldItems=[];
// // app.post('/item-sold/:itemId',(req,res)=>{
// //   const itemId=req.params.itemId;
// //   soldItems.push(itemId);

// //   io.emit('itemSold',itemId);
// //   res.send('item marked as sold');
// // });


// app.listen(5000, () => {
//   console.log('Server is running on http://localhost:5000');
// });
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bcrypt = require('bcrypt');
const cors = require('cors');
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');
const MongoStore = require('connect-mongo');
const app = express();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
});
mongoose.connection.on('connected', () => {
  console.log('✅ MongoDB connected successfully');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err);
});
const User = mongoose.model('User', {
  name: String,
  email: String,
  password: String,
});

const Item = mongoose.model('Item', {
  name: String,
  description: String,
  startingPrice: Number,
  endDate: Date,
  imagePath: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  highestBid: {
    type: Number,
    default: 0
  },
  highestBidder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  itemSold: {
    type: Boolean,
    default: false
  }
});

const GlobalMessage = mongoose.model('GlobalMessage', {
  content: String,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

// Middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve uploads
app.use('/uploads', express.static('uploads'));

// Session

app.set('trust proxy', 1);


app.use(session({
  secret: 'mysecret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
  cookie: {
    secure: true,
    sameSite: 'none'
  }
}));

// CORS
app.use(cors({
  origin: 'https://bidbank.onrender.com', // In local dev. When deployed, update as needed.
  credentials: true,
}));

// Routes
app.get('/check-session', (req, res) => {
  const user = req.session.user || null;
  res.json({ user });
});

app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    res.json({ success: true, user });
    console.log('Success: User registered');
  } catch (error) {
    console.error(error);
    res.json({ success: false, error: 'Error creating user' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      req.session.user = user;
      res.json({ success: true, user });
      console.log('Success: User logged in');
    } else {
      res.json({ success: false, error: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    res.json({ success: false, error: 'Error logging in' });
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.json({ success: true });
  console.log('Success: User logged out');
});

const upload = multer({ dest: 'uploads/' });

app.post('/add-item', upload.single('itemImage'), async (req, res) => {
  const { name, description, startingPrice, endDate } = req.body;
  const imagePath = req.file.path;

  try {
    if (!req.session.user) {
      return res.json({ success: false, error: 'User not logged in' });
    }

    const item = await Item.create({
      name,
      description,
      startingPrice,
      endDate,
      imagePath,
      userId: req.session.user._id
    });

    await GlobalMessage.create({
      content: `Item ${item.name} is added`
    });

    res.json({ success: true, item });
    console.log("Success: Item added");
  } catch (err) {
    console.error(err);
    res.json({ success: false, error: 'Error adding item' });
  }
});

app.get('/get-items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json({ success: true, items });
  } catch (err) {
    console.error(err);
    res.json({ success: false, error: 'Error fetching items' });
  }
});

app.post('/place-bid/:itemId', async (req, res) => {
  const itemId = req.params.itemId;
  const { amount } = req.body;

  try {
    const item = await Item.findById(itemId);

    if (!item) {
      return res.json({ success: false, error: 'Item not found' });
    }

    if (item.itemSold || amount < item.startingPrice || new Date() >= item.endDate || amount <= item.highestBid) {
      return res.json({ success: false, error: 'Invalid bid' });
    }

    item.highestBid = amount;
    item.highestBidder = item.userId;

    await GlobalMessage.create({
      content: `Item ${item.name} has a highest bid of ${item.highestBid}`
    });

    await item.save();
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.json({ success: false, error: 'Error placing bid' });
  }
});

app.get('/get-messages', async (req, res) => {
  try {
    const messages = await GlobalMessage.find();
    res.json({ success: true, messages });
  } catch (error) {
    console.error(error);
    res.json({ success: false, error: 'Error fetching messages' });
  }
});

// ---------- Serve React build files ----------
app.use(express.static(path.join(__dirname, '../reactapp/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../reactapp/build', 'index.html'));
});


// ---------- Start server ----------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
