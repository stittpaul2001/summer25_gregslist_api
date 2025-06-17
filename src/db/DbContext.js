import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account.js'
import { ValueSchema } from '../models/Value.js'

class DbContext {
  Account = mongoose.model('Account', AccountSchema);
}

export const dbContext = new DbContext()
