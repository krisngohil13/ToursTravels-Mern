const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoute = require('./router/auth.js');
const tourRoute = require('./router/tour.js');
const searchRoute = require('./router/Search.js');
const userRoute = require('./router/user.js');
const reviewRoute = require('./router/review.js');
const bookingRoute = require('./router/booking.js');
const contactRoute = require('./router/contact.js');
const blogRoute = require('./router/blog.js');
const commentRoute = require('./router/comment.js');
const adminRoute = require('./router/admin.js');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

const connect = async () => {
    try {
      const connection = await mongoose.connect(process.env.MONGO_URI);
      console.log('Connected to the database:', connection.connection.host);
  
      // Ensure connection is available before accessing `db.admin`
      if (connection.connection.db) {
        const collections = await connection.connection.db.listCollections().toArray();
        console.log('Collections in tours_travels:', collections.map((col) => col.name));
      }
    } catch (error) {
      console.error('Error connecting to the database:', error);
    }
  };
  


const corsOptions = {
    origin: true,
    credentials: true,
};

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/tours", tourRoute);
app.use("/api/v1/search", searchRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/review", reviewRoute);
app.use("/api/v1/booking", bookingRoute);
app.use("/api/v1/contact", contactRoute);
app.use("/api/v1/blogs", blogRoute);
app.use("/api/v1/comment", commentRoute);
app.use("/api/v1/admin", adminRoute);

app.get('//api/v1', (req, res) => res.send('Hello, Node.js!'));

connect().then(() =>
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
);
