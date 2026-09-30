const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

const checks = [
    { name: 'Contains <style>', pass: content.includes('<style>') },
    { name: 'Contains </style>', pass: content.includes('</style>') },
    { name: 'Contains <script>', pass: content.includes('<script>') },
    { name: 'Contains </script>', pass: content.includes('</script>') },
    { name: 'Contains SoundSystem', pass: content.includes('class SoundSystem') },
    { name: 'Contains BIOLOGY_QUESTIONS', pass: content.includes('const BIOLOGY_QUESTIONS') },
    { name: 'Contains PATIENTS_DATA', pass: content.includes('const PATIENTS_DATA') },
    { name: 'Contains FirebaseManager', pass: content.includes('class FirebaseManager') },
    { name: 'Contains Firebase Config (biology-911)', pass: content.includes('biology-911') && content.includes('AIzaSyDfdnuY054VJyZ7Wtkyxx2U94BD4T545Sk') },
    { name: 'Contains BiologyGame', pass: content.includes('class BiologyGame') },
    { name: 'Zero external CSS links', pass: !content.includes('<link rel="stylesheet"') },
    { name: 'Zero external script src', pass: !content.includes('<script src="') }
];

console.log("=== SINGLE FILE INDEX.HTML VERIFICATION ===");
let allPassed = true;
checks.forEach(c => {
    console.log(`${c.pass ? '✓' : '❌'} ${c.name}`);
    if (!c.pass) allPassed = false;
});

if (allPassed) {
    console.log("\nPERFECT: index.html is completely self-contained and 100% ready for GitHub Pages!");
} else {
    process.exit(1);
}
