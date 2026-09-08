const fs = require('fs');
const path = require('path');

function walk(dir, done) {
    let results = [];
    fs.readdir(dir, function (err, list) {
        if (err) return done(err);
        let pending = list.length;
        if (!pending) return done(null, results);
        list.forEach(function (file) {
            file = path.resolve(dir, file);
            fs.stat(file, function (err, stat) {
                if (stat && stat.isDirectory()) {
                    walk(file, function (err, res) {
                        results = results.concat(res);
                        if (!--pending) done(null, results);
                    });
                } else {
                    if (file.endsWith('.tsx') || file.endsWith('.ts')) {
                        results.push(file);
                    }
                    if (!--pending) done(null, results);
                }
            });
        });
    });
}

walk(path.join(__dirname, 'src'), function (err, results) {
    if (err) throw err;
    let changedFiles = 0;

    results.forEach(file => {
        let content = fs.readFileSync(file, 'utf8');
        let original = content;

        // Replace text
        content = content.replace(/BharatContent AI/g, 'GramX');
        content = content.replace(/BharatContent/g, 'GramX');
        content = content.replace(/Problem Statement ID: SIH26154/g, 'AI Content Engine');
        content = content.replace(/SIH 2026 Problem Statement ID: SIH26154/g, 'Automated Content Transformation');
        content = content.replace(/SIH 2026/g, '2026');
        content = content.replace(/Team GRAMX/g, 'GramX');

        if (content !== original) {
            fs.writeFileSync(file, content, 'utf8');
            changedFiles++;
        }
    });

    console.log(`Cleaned up text in ${changedFiles} files.`);
});
