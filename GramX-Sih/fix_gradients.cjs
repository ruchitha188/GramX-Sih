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

        // Fix remaining dark gradients
        content = content.replace(/from-slate-900/g, 'from-blue-50');
        content = content.replace(/from-slate-950/g, 'from-white');
        content = content.replace(/to-slate-900/g, 'to-blue-50');
        content = content.replace(/to-slate-950/g, 'to-white');
        content = content.replace(/via-indigo-950\/60/g, 'via-blue-100/50');
        content = content.replace(/via-slate-900/g, 'via-blue-50');

        // Some stray glowing rings or shadows
        content = content.replace(/shadow-indigo-950\/40/g, 'shadow-blue-200/50');

        // Make text readable on remaining colored backgrounds if any

        if (content !== original) {
            fs.writeFileSync(file, content, 'utf8');
            changedFiles++;
        }
    });

    console.log(`Updated gradients in ${changedFiles} files.`);
});
