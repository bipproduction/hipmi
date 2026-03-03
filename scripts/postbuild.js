const fs = require('fs');
const path = require('path');

const standaloneDir = path.join(__dirname, '../.next/standalone');
const prismaDir = path.join(__dirname, '../node_modules/.prisma');

console.log('🚀 Running postbuild script...');

// Copy Prisma binaries ke standalone output
if (fs.existsSync(prismaDir)) {
  const dest = path.join(standaloneDir, 'node_modules/.prisma');
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.cpSync(prismaDir, dest, { recursive: true });
  console.log('✓ Prisma binaries copied to standalone output');
} else {
  console.warn('⚠ Prisma binaries directory not found, skipping...');
}

// Copy schema.prisma jika diperlukan
const schemaSrc = path.join(__dirname, '../prisma/schema.prisma');
const schemaDest = path.join(standaloneDir, 'prisma/schema.prisma');
if (fs.existsSync(schemaSrc)) {
  fs.mkdirSync(path.dirname(schemaDest), { recursive: true });
  fs.copyFileSync(schemaSrc, schemaDest);
  console.log('✓ schema.prisma copied to standalone output');
} else {
  console.warn('⚠ schema.prisma not found, skipping...');
}

// Copy prisma client dari node_modules/@prisma/client
const prismaClientSrc = path.join(__dirname, '../node_modules/@prisma/client');
const prismaClientDest = path.join(standaloneDir, 'node_modules/@prisma/client');
if (fs.existsSync(prismaClientSrc)) {
  fs.mkdirSync(path.dirname(prismaClientDest), { recursive: true });
  fs.cpSync(prismaClientSrc, prismaClientDest, { recursive: true });
  console.log('✓ @prisma/client copied to standalone output');
} else {
  console.warn('⚠ @prisma/client not found, skipping...');
}

// Copy .env file jika ada (untuk production)
const envSrc = path.join(__dirname, '../.env');
const envDest = path.join(standaloneDir, '.env');
if (fs.existsSync(envSrc)) {
  fs.copyFileSync(envSrc, envDest);
  console.log('✓ .env file copied to standalone output');
} else {
  console.warn('⚠ .env file not found, skipping...');
  console.warn('  Pastikan DATABASE_URL di-set di system environment server!');
}

// Copy .env-local file jika ada (opsional)
const envLocalSrc = path.join(__dirname, '../.env-local');
const envLocalDest = path.join(standaloneDir, '.env-local');
if (fs.existsSync(envLocalSrc)) {
  fs.copyFileSync(envLocalSrc, envLocalDest);
  console.log('✓ .env-local file copied to standalone output');
}

console.log('✅ Postbuild script completed!');
console.log('');
console.log('📋 Penting untuk Production:');
console.log('   - Pastikan DATABASE_URL tersedia di environment server, ATAU');
console.log('   - File .env sudah ter-copy ke /app/.env di server');
