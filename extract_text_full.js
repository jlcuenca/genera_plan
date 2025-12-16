const fs = require('fs');
const PizZip = require('pizzip');
const path = require('path');

const filePath = path.join(__dirname, 'src/assets/Plan de estudios Licenciatura en Historia 280824.docx');
const outPath = path.join(__dirname, 'src/assets/plan_extracted.txt');

try {
    const content = fs.readFileSync(filePath);
    const zip = new PizZip(content);
    const doc = zip.file("word/document.xml").asText();
    const text = doc.replace(/<w:p.*?>/g, '\n').replace(/<[^>]+>/g, '');

    fs.writeFileSync(outPath, text);
    console.log("Text extracted to " + outPath);
} catch (e) {
    console.error("Error reading file:", e);
}
