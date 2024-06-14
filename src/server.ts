import app from './app'
import config from './App/configs'
import {  connect } from 'mongoose';

async function run() {
  
  try{
    await connect(config.dbUri);
    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  }catch(err){

    console.log(err);

  }

 
}


run()
