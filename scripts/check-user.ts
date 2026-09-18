import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { User } from '../src/core/database/models/User.js';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://admin:adminpassword@localhost:27017/lapaginadelardi?authSource=admin';

async function main() {
  const email = process.argv[2] || 'juane8w@gmail.com';
  const testPassword = process.argv[3] || 'GatoFeo12#';

  try {
    await mongoose.connect(MONGODB_URI);
    console.log('DB_CONNECTED');

    const user = await User.findOne({ email });
    if (!user) {
      console.log(`RESULT: NO_USER (no existe usuario con email ${email})`);
      await mongoose.disconnect();
      process.exit(0);
    }

    const match = await bcrypt.compare(testPassword, user.passwordHash);
    console.log('RESULT: USER_FOUND');
    console.log(`  email:      ${user.email}`);
    console.log(`  name:       ${user.name}`);
    console.log(`  isVerified: ${user.isVerified}`);
    console.log(`  passwordMatchesTestPassword(${testPassword}): ${match}`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('ERROR:', err);
    process.exit(1);
  }
}

main();
