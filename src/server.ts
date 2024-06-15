import app from './app'
import configs from './App/configs';

import {  connect } from 'mongoose';

async function run() {
  
  try{
    await connect(configs.dbUri);
    app.listen(configs.port, () => {
      console.log(`Example app listening on port ${configs.port}`);
    });
  }catch(err){

    console.log(err);

  }

 
}


run()
