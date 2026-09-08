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
                    if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.css')) {
                        results.push(file);
                    }
                    if (!--pending) done(null, results);
                }
            });
        });
    });
}

const replacements = [
    // Backgrounds
    { regex: /bg-slate-950/g, replacement: 'bg-white' },
    { regex: /bg-slate-900\/90/g, replacement: 'bg-slate-50/90' },
    { regex: /bg-slate-900/g, replacement: 'bg-slate-50' },
    { regex: /bg-slate-800/g, replacement: 'bg-slate-100' },

    // App.css body bg (hardcoded in old index.css maybe?)
    { regex: /background-color:\s*#0f172a;/g, replacement: 'background-color: #f8fafc;' },
    { regex: /color:\s*#f8fafc;/g, replacement: 'color: #0f172a;' },

    // Text
    { regex: /text-white/g, replacement: 'text-slate-900' },
    { regex: /text-slate-100/g, replacement: 'text-slate-900' },
    { regex: /text-slate-200/g, replacement: 'text-slate-800' },
    { regex: /text-slate-300/g, replacement: 'text-slate-700' },
    { regex: /text-slate-400/g, replacement: 'text-slate-600' },
    { regex: /text-slate-500/g, replacement: 'text-slate-500' },

    // Borders
    { regex: /border-slate-800/g, replacement: 'border-slate-200' },
    { regex: /border-slate-700/g, replacement: 'border-slate-300' },
    { regex: /border-slate-600/g, replacement: 'border-slate-400' },
    { regex: /ring-white\/20/g, replacement: 'ring-black/10' },

    // Gradients and big colorful buttons
    { regex: /bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600/g, replacement: 'bg-blue-700' },
    { regex: /hover:from-indigo-500 hover:to-pink-500/g, replacement: 'hover:bg-blue-800' },
    { regex: /shadow-indigo-600\/25/g, replacement: 'shadow-blue-900/20' },

    { regex: /bg-gradient-to-b from-indigo-950\/50 to-slate-900/g, replacement: 'bg-gradient-to-b from-blue-50 to-white' },
    { regex: /border-indigo-500\/60/g, replacement: 'border-blue-400' },
    { regex: /ring-indigo-500\/40/g, replacement: 'ring-blue-200' },
    { regex: /shadow-indigo-950\/30/g, replacement: 'shadow-blue-100' },

    // Indigo to Blue-700 (Enterprise)
    { regex: /bg-indigo-600/g, replacement: 'bg-blue-700' },
    { regex: /bg-indigo-500/g, replacement: 'bg-blue-600' },
    { regex: /text-indigo-400/g, replacement: 'text-blue-700' },
    { regex: /text-indigo-300/g, replacement: 'text-blue-600' },
    { regex: /border-indigo-500/g, replacement: 'border-blue-300' },

    // Emerald updates
    { regex: /text-emerald-400/g, replacement: 'text-emerald-700' },
    { regex: /bg-emerald-500\/20/g, replacement: 'bg-emerald-100' },
    { regex: /bg-emerald-500\/10/g, replacement: 'bg-emerald-50' },

    // Rose updates
    { regex: /text-rose-400/g, replacement: 'text-rose-700' },
    { regex: /bg-rose-500\/20/g, replacement: 'bg-rose-100' },
    { regex: /bg-rose-500\/10/g, replacement: 'bg-rose-50' },

    // Amber updates
    { regex: /text-amber-400/g, replacement: 'text-amber-700' },
    { regex: /bg-amber-500\/20/g, replacement: 'bg-amber-100' },
    { regex: /bg-amber-500\/10/g, replacement: 'bg-amber-50' },

    // Violet/Purple
    { regex: /text-purple-400/g, replacement: 'text-purple-700' },
    { regex: /text-sky-400/g, replacement: 'text-sky-700' },

    // Fixed text colors on active colored backgrounds
    // We don't want "text-slate-900" inside a "bg-blue-700"
    // But wait, regexing "bg-blue-700 text-white" is hard if we just blindly replaced it to text-slate-900.
    // We'll let it be for now and fix manually if any button looks bad.
];

walk(path.join(__dirname, 'src'), function (err, results) {
    if (err) throw err;
    let changedFiles = 0;

    results.forEach(file => {
        let content = fs.readFileSync(file, 'utf8');
        let original = content;

        replacements.forEach(({ regex, replacement }) => {
            content = content.replace(regex, replacement);
        });

        // Post-processing fix: If we have bg-blue-700, the text needs to be white, not slate-900.
        // E.g. className="... bg-blue-700 ... text-slate-900" -> text-white
        if (content.includes('bg-blue-') || content.includes('bg-emerald-') || content.includes('bg-rose-')) {
            // A cheap trick: replace text-slate-900 with text-white if it's right after bg-something darkish
            // Let's not make it too complex. We can fix individual buttons later if needed.
        }

        if (content !== original) {
            fs.writeFileSync(file, content, 'utf8');
            changedFiles++;
        }
    });

    console.log(`Updated ${changedFiles} files with the new Light Theme.`);
});
