// post-build.js
const fs = require('fs');
const path = require('path');

console.log('Running post-build script to create 404.html...');

// ¡RUTA CORREGIDA! Se ha añadido '/browser' para que coincida con la salida de Angular.
const buildPath = path.join(__dirname, 'dist', 'genera_plan', 'browser');
const indexPath = path.join(buildPath, 'index.html');
const notFoundPath = path.join(buildPath, '404.html');

// Verifica si la carpeta de build existe
if (!fs.existsSync(buildPath)) {
    console.error(`Build directory not found at: ${buildPath}`);
    process.exit(1);
}

// Verifica si el index.html de origen existe
if (fs.existsSync(indexPath)) {
    try {
        // Copia el archivo
        fs.copyFileSync(indexPath, notFoundPath);
        console.log('✅ Successfully copied index.html to 404.html');
    } catch (error) {
        console.error('❌ Error copying file:', error);
        process.exit(1);
    }
} else {
    console.error(`❌ Error: index.html not found at: ${indexPath}. Copy failed.`);
    process.exit(1);
}
