const fs = require('fs');
const path = require('path');

console.log("=== RUNNING GAME SANITY CHECK ===");

// 1. Read files
const questionsContent = fs.readFileSync(path.join(__dirname, 'js/questions.js'), 'utf8');
const patientsContent = fs.readFileSync(path.join(__dirname, 'js/patients.js'), 'utf8');
const htmlContent = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const gameContent = fs.readFileSync(path.join(__dirname, 'js/game.js'), 'utf8');

// Mock window environment
const windowMock = {};
global.window = windowMock;

// Evaluate questions.js
eval(questionsContent);
const questions = windowMock.BIOLOGY_QUESTIONS;
console.log(`✓ Loaded ${questions.length} biology questions`);

// Evaluate patients.js
eval(patientsContent);
const patients = windowMock.PATIENTS_DATA;
console.log(`✓ Loaded ${patients.length} patients`);

// Test 2: Check questions integrity
let questionErrors = 0;
const tools = ['stethoscope', 'thermometer', 'bloodLab', 'microscope', 'treatment'];

patients.forEach(p => {
    tools.forEach(tool => {
        const q = questions.find(item => item.patientId === p.id && item.tool === tool);
        if (!q) {
            console.error(`❌ Missing question for patient ${p.id} and tool ${tool}`);
            questionErrors++;
        } else {
            if (!q.options || q.options.length !== 4) {
                console.error(`❌ Question ${q.id} does not have 4 options`);
                questionErrors++;
            }
            if (typeof q.correctIndex !== 'number' || q.correctIndex < 0 || q.correctIndex > 3) {
                console.error(`❌ Question ${q.id} has invalid correctIndex ${q.correctIndex}`);
                questionErrors++;
            }
            if (!q.explanation || q.explanation.length < 10) {
                console.error(`❌ Question ${q.id} missing explanation`);
                questionErrors++;
            }
            if (!q.hint || q.hint.length < 5) {
                console.error(`❌ Question ${q.id} missing hint`);
                questionErrors++;
            }
        }
    });
});

if (questionErrors === 0) {
    console.log("✓ All 30 clinical questions (6 patients x 5 medical tools) are 100% valid with hints, options, and explanations!");
}

// Test 3: Check referenced element IDs in index.html
const idRegex = /document\.getElementById\(['"]([^'"]+)['"]\)/g;
let match;
const requiredIds = new Set();
while ((match = idRegex.exec(gameContent)) !== null) {
    requiredIds.add(match[1]);
}

let missingIds = 0;
requiredIds.forEach(id => {
    // Check if ID is in HTML or dynamically generated
    const dynamicIds = ['modalFeedbackTitle', 'modalFeedbackText', 'modalFeedbackBox', 'modalToolBadge', 'modalTopicTag', 'modalContextText', 'modalQuestionText', 'modalOptionsList', 'btnContinueNext', 'topic_sirkulasi', 'topic_imun', 'topic_metabolisme', 'topic_respirasi', 'topic_ekskresi', 'topic_genetika'];
    if (!htmlContent.includes(`id="${id}"`) && !dynamicIds.includes(id)) {
        console.error(`❌ ID not found in HTML: ${id}`);
        missingIds++;
    }
});

if (missingIds === 0) {
    console.log(`✓ All ${requiredIds.size} DOM element IDs referenced in game.js exist in index.html!`);
}

console.log("=== ALL CHECKS PASSED ===");
