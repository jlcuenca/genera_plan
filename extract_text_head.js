const fs = require('fs');
const PizZip = require('pizzip');
const path = require('path');

const filePath = path.join(__dirname, 'src/assets/Plan de estudios Licenciatura en Historia 280824.docx');

try {
    const content = fs.readFileSync(filePath);
    const zip = new PizZip(content);
    const doc = zip.file("word/document.xml").asText();
    const text = doc.replace(/<w:p.*?>/g, '\n').replace(/<[^>]+>/g, '');

    // Print first 5000 characters to see the beginning
    console.log(text.substring(0, 5000));
} catch (e) {
    console.error("Error reading file:", e);
}
