const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'css/style.css');
const audioPath = path.join(__dirname, 'js/audio.js');
const questionsPath = path.join(__dirname, 'js/questions.js');
const patientsPath = path.join(__dirname, 'js/patients.js');
const gamePath = path.join(__dirname, 'js/game.js');
const htmlPath = path.join(__dirname, 'index.html');

const css = fs.readFileSync(cssPath, 'utf8');
const audioJs = fs.readFileSync(audioPath, 'utf8');
const questionsJs = fs.readFileSync(questionsPath, 'utf8');
const patientsJs = fs.readFileSync(patientsPath, 'utf8');
const gameJs = fs.readFileSync(gamePath, 'utf8');
let html = fs.readFileSync(htmlPath, 'utf8');

// Replace CSS link with inline <style>
const cssLinkRegex = /<link\s+rel="stylesheet"\s+href="css\/style\.css"\s*\/?>/i;
const inlineStyle = `<style>\n${css}\n</style>`;
html = html.replace(cssLinkRegex, inlineStyle);

// Replace JS script tags with inline <script>
const scriptTagsRegex = /<!-- Application Logic Scripts -->[\s\S]*?<script\s+src="js\/game\.js"><\/script>/i;
const combinedJs = `<!-- Embedded Single-File Application Logic (Ready for GitHub Pages) -->
<script>
// --- AUDIO SYSTEM ---
${audioJs}

// --- QUESTIONS DATABASE ---
${questionsJs}

// --- PATIENTS WARD DATA ---
${patientsJs}

// --- MAIN GAME CONTROLLER ---
${gameJs}
</script>`;

html = html.replace(scriptTagsRegex, combinedJs);

fs.writeFileSync(htmlPath, html, 'utf8');
console.log("Successfully bundled single-file index.html!");
console.log("Total file size:", (fs.statSync(htmlPath).size / 1024).toFixed(2), "KB");
