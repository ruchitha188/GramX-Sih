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

            // Global Backgrounds
            content = content.replace(/bg-slate-50\/90/g, 'bg-zinc-950/70 backdrop-blur-3xl');
            content = content.replace(/bg-slate-50/g, 'bg-black');
            content = content.replace(/bg-white\/80/g, 'bg-zinc-900/40 backdrop-blur-xl');
            content = content.replace(/bg-white\/50/g, 'bg-black');
            content = content.replace(/bg-white/g, 'bg-zinc-950');
            content = content.replace(/bg-slate-100/g, 'bg-zinc-900');

            // Borders
            content = content.replace(/border-slate-200\/80/g, 'border-zinc-800/80');
            content = content.replace(/border-slate-200/g, 'border-zinc-800');
            content = content.replace(/border-slate-100/g, 'border-zinc-900');
            content = content.replace(/border-slate-300/g, 'border-zinc-700');

            // Text
            content = content.replace(/text-slate-900/g, 'text-zinc-100');
            content = content.replace(/text-slate-800/g, 'text-zinc-200');
            content = content.replace(/text-slate-700/g, 'text-zinc-300');
            content = content.replace(/text-slate-600/g, 'text-zinc-400');
            content = content.replace(/text-slate-500/g, 'text-zinc-500');

            // Hover Text
            content = content.replace(/hover:text-slate-800/g, 'hover:text-white');
            content = content.replace(/hover:text-slate-900/g, 'hover:text-white');

            // Accents (Blues to Silvers/Metal)
            content = content.replace(/bg-blue-700/g, 'bg-zinc-200 text-black shadow-[0_0_15px_rgba(255,255,255,0.15)]');
            content = content.replace(/hover:bg-blue-600/g, 'hover:bg-white');
            content = content.replace(/bg-blue-600/g, 'bg-zinc-300 text-black');

            // In text we want a metallic feel
            content = content.replace(/text-blue-700/g, 'text-zinc-300');
            content = content.replace(/text-blue-600/g, 'text-zinc-400');
            content = content.replace(/hover:text-blue-600/g, 'hover:text-zinc-200');
            content = content.replace(/border-blue-300\/40/g, 'border-zinc-500/30');
            content = content.replace(/bg-blue-50/g, 'bg-zinc-800/50');
            content = content.replace(/bg-blue-100/g, 'bg-zinc-800');
            content = content.replace(/border-blue-200/g, 'border-zinc-700');

            // Gradients (Indigo/Purple to Metal)
            content = content.replace(/from-indigo-950\/40 via-blue-50 to-white/g, 'from-zinc-900 via-zinc-950 to-black');
            content = content.replace(/from-indigo-600 to-purple-600/g, 'from-zinc-300 to-zinc-500 text-black border border-zinc-200');
            content = content.replace(/from-indigo-50/g, 'from-zinc-900');
            content = content.replace(/to-blue-50/g, 'to-zinc-950');
            content = content.replace(/from-blue-600 to-indigo-600/g, 'from-zinc-300 to-zinc-500 text-black shadow-lg shadow-white/10');

            // Shadow fix for black
            content = content.replace(/shadow-xl/g, 'shadow-2xl shadow-black/80');

            fs.writeFileSync(fullPath, content, 'utf8');
        }
    }
}

switchTheme(path.join(__dirname, 'src'));
console.log('Silver Theme Applied!');
