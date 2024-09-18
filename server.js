 
  import express from 'express';
  import cors from 'cors';
  const app = express();
  
  app.use(cors()); // Allow all origins (can also specify specific origins)
  app.listen(8081, () => {   console.log('Server running on port 8081'); });
  
  // app.use(cors());
  // use this -> app.use(cors());