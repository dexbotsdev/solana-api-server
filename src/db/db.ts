 import { Mongoose } from "mongoose";
//37qrHBf7IuDfNLpI
//radialdapps
const uri = "mongodb+srv://radialdapps:37qrHBf7IuDfNLpI@cluster0.cnuvoi3.mongodb.net/solanaapi?retryWrites=true&w=majority";
const localUri = 'mongodb://localhost:27017/solanaapi';

const mongoose = new Mongoose();
// Connect to MongoDB
mongoose.connect(localUri, {
  autoCreate: true,
  autoIndex:true
}).catch((error)=>{
  console.log(error)
})

// Define the schema for your collection
const userSchema = new mongoose.Schema({
  userId: { type: String, unique: true, required: true },
  subscription: String,
  authtoken: { type: String, unique: true, required: true },
  enabled: Boolean,
});


const RayDiumPoolSchema = new mongoose.Schema({
  "id": {
    "type": "String",unique: true, required: true 
  },
  "baseMint": {
    "type": "String"
  },
  "quoteMint": {
    "type": "String"
  },
  "lpMint": {
    "type": "String"
  },
  "baseDecimals": {
    "type": "Number"
  },
  "quoteDecimals": {
    "type": "Number"
  },
  "lpDecimals": {
    "type": "Number"
  },
  "version": {
    "type": "Number"
  },
  "programId": {
    "type": "String"
  },
  "authority": {
    "type": "String"
  },
  "openOrders": {
    "type": "String"
  },
  "targetOrders": {
    "type": "String"
  },
  "baseVault": {
    "type": "String"
  },
  "quoteVault": {
    "type": "String"
  },
  "withdrawQueue": {
    "type": "String"
  },
  "lpVault": {
    "type": "String"
  },
  "marketVersion": {
    "type": "Number"
  },
  "marketProgramId": {
    "type": "String"
  },
  "marketId": {
    "type": "String"
  },
  "marketAuthority": {
    "type": "String"
  },
  "marketBaseVault": {
    "type": "String"
  },
  "marketQuoteVault": {
    "type": "String"
  },
  "marketBids": {
    "type": "String"
  },
  "marketAsks": {
    "type": "String"
  },
  "marketEventQueue": {
    "type": "String"
  },
  "lookupTableAccount": {
    "type": "String"
  }
});

// Create the model
  const User = mongoose.model('User', userSchema);
  const RayDiumPool = mongoose.model('NewRaydiumPool', RayDiumPoolSchema);



export async function createUser(userId: any, subscription: any, authtoken: any, enabled: any) {
    try {
      const user = new User({
        userId,
        subscription,
        authtoken,
        enabled,
      });
      await user.save();
       console.log('User created successfully');
    } catch (error:any) {
      console.error('Error creating user:', error.message);
    }
  }
  
  export async function findUser(token: any) {
    try {
      const user = await User.findOne({authtoken: token });
      if (user) {
         console.log('User found:', user);
      } else {
        console.log('User not found');
      }

      return user;
    } catch (error:any) {
      console.error('Error finding user:', error.message);
    }
  }
  
  export async function updateUser(userId: any, updateFields: any) {
    try {
      const result = await User.updateOne({ userId }, { $set: updateFields });
      if (result.modifiedCount > 0) {
         console.log('User updated successfully');
      } else {
        console.log('User not found');
      }
    } catch (error:any) {
      console.error('Error updating user:', error.message);
    }
  }
  
  export async function deleteUser(userId: any) {
    try {
      const result = await User.deleteOne({ userId });
      if (result.deletedCount > 0) {
         console.log('User deleted successfully');
      } else {
         console.log('User not found');
      }
    } catch (error:any) {
      console.error('Error deleting user:', error.message);
    }
  }



  export async function createMarket(marketData: any) {
  try {
    const market = new RayDiumPool(marketData);
    await market.save();
     console.log('Market created successfully');
    } catch (error:any) {
      console.error('Error creating market:', error.message);
  }
}
 
export async function findLpMint(id:any) {
  try {
    const market = await RayDiumPool.findOne({ lpMint: id });
    if (market) {
       console.log('Market for LPMint  found:', market);
       return market;
    } else {
      console.log('Market not found '+id);
      return null;
    }  
  } catch (error:any) {
    console.error('Error finding market:', error.message);
    return null;

  }
}

 

export async function updateMarket(id: any, updateFields: any) {
  try {
    const result = await RayDiumPool.updateOne({ id }, { $set: updateFields });
    if (result.modifiedCount > 0) {
       console.log('Market updated successfully');
      return true;
    } else {
       console.log('Market not found');
      return false;
    }
  } catch (error:any) {
    console.error('Error updating market:', error.message);
    return false;
  }
}