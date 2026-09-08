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

        // Replace text-slate-900 with text-white on prominent colored buttons
        const classRegex = /className=(["'`])(.*?)(["'`])/g;
        content = content.replace(classRegex, (match, p1, classes, p3) => {
            // If the class string has a dark colored background and text-slate-900 
            // which we accidentally converted from text-white...
            if (
                (classes.includes('bg-blue-600') ||
                    classes.includes('bg-blue-700') ||
                    classes.includes('bg-rose-600') ||
                    classes.includes('bg-amber-600') ||
                    classes.includes('bg-emerald-600') ||
                    classes.includes('bg-emerald-500') ||
                    classes.includes('bg-indigo-600')) &&
                classes.includes('text-slate-900')
            ) {
                return `className=${p1}${classes.replace(/text-slate-900/g, 'text-white')}${p3}`;
            }
            return match;
        });

        if (content !== original) {
            fs.writeFileSync(file, content, 'utf8');
            changedFiles++;
        }
    });

    console.log(`Updated button text colors in ${changedFiles} files.`);
});
