import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { User } from '../src/core/database/models/User.js';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://admin:adminpassword@localhost:27017/lapaginadelardi?authSource=admin';

async function seed() {
  try {
    console.log('Conectando a MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Conectado a la base de datos.');

    const email = 'juane8w@gmail.com';
    const password = 'GatoFeo12#';
    const name = 'Juan Vélez';

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    let user = await User.findOne({ email });

    if (user) {
      user.passwordHash = passwordHash;
      user.isVerified = true;
      user.name = name;
      user.unverifiedExpiresAt = undefined;
      await user.save();
      console.log(`✅ Usuario existente actualizado y verificado exitosamente.`);
    } else {
      user = new User({
        name,
        email,
        passwordHash,
        isVerified: true,
        preferences: {
          transcriptionEnabled: true,
          smartHighlight: true,
          summaryMode: 'Largo',
          aiTone: 'Sencillo',
          themeMode: 'Sistema',
          accentColor: 'moss',
        },
      });
      await user.save();
      console.log(`✅ Usuario creado y verificado exitosamente.`);
    }

    console.log('\n===========================================');
    console.log(`📧 Correo:     ${email}`);
    console.log(`🔑 Contraseña: ${password}`);
    console.log(`✨ Estado:     Verificado (isVerified: true)`);
    console.log('===========================================\n');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creando el usuario:', error);
    process.exit(1);
  }
}

seed();
