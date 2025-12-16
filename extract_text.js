const fs = require('fs');
const PizZip = require('pizzip');
const path = require('path');

const filePath = path.join(__dirname, 'src/assets/Plan de estudios Licenciatura en Historia 280824.docx');

try {
    const content = fs.readFileSync(filePath);
    const zip = new PizZip(content);
    const doc = zip.file("word/document.xml").asText();

    // Simple textual extraction by removing tags
    // This is naive but might give us enough to work with
    const text = doc.replace(/<w:p.*?>/g, '\n').replace(/<[^>]+>/g, '');
    console.log(text);
} catch (e) {
    console.error("Error reading file:", e);
}
