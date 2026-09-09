const fs = require('fs');
const path = require('path');

function switchTheme(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            switchTheme(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf8');

            content = content.replace(/\bslate-/g, 'neutral-');
            content = content.replace(/\bsky-/g, 'emerald-');
            content = content.replace(/\bblue-/g, 'teal-');
            content = content.replace(/\bpurple-/g, 'teal-');
            content = content.replace(/\bfuchsia-/g, 'emerald-');
            content = content.replace(/\bzinc-/g, 'neutral-'); // Catch any stragglers

            fs.writeFileSync(fullPath, content, 'utf8');
        }
    }
}

switchTheme(path.join(__dirname, 'src'));
console.log('Charcoal & Emerald Theme Applied!');
