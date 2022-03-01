import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { HouseSchema } from '../models/Houses';
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Houses = mongoose.model("House", HouseSchema)
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');
}

export const dbContext = new DbContext()
