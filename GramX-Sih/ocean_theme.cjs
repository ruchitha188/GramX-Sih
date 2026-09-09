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

            // Base background mappings to Midnight Slate
            content = content.replace(/bg-black/g, 'bg-slate-950');
            content = content.replace(/bg-zinc-950/g, 'bg-slate-950');
            content = content.replace(/bg-zinc-900/g, 'bg-slate-900/90');
            content = content.replace(/bg-zinc-800/g, 'bg-slate-800/80');
            content = content.replace(/bg-white\/10/g, 'bg-slate-800/60');
            content = content.replace(/bg-white\/5/g, 'bg-slate-800/40');
            content = content.replace(/bg-white/g, 'bg-sky-500'); // the buttons

            // Button hover mappings
            content = content.replace(/hover:bg-zinc-200/g, 'hover:bg-sky-400');
            content = content.replace(/hover:bg-sky-500/g, 'hover:bg-sky-400'); // self correction
            content = content.replace(/hover:bg-zinc-[0-9]{3}/g, 'hover:bg-slate-700/50');
            content = content.replace(/bg-zinc-200/g, 'bg-sky-500 text-white shadow-md shadow-sky-500/20 hover:bg-sky-400 border-none');
            content = content.replace(/bg-zinc-100/g, 'bg-sky-500 text-white shadow-md shadow-sky-500/20 hover:bg-sky-400 border-none');

            // Accents & borders
            content = content.replace(/border-white\/10/g, 'border-sky-500/10');
            content = content.replace(/border-white\/20/g, 'border-sky-500/20');
            content = content.replace(/border-zinc-[0-9]{3}/g, 'border-slate-700/50');

            // Text
            content = content.replace(/text-black/g, 'text-white');
            content = content.replace(/text-zinc-400/g, 'text-slate-400');
            content = content.replace(/text-zinc-300/g, 'text-slate-300');
            content = content.replace(/text-zinc-200/g, 'text-slate-200');
            content = content.replace(/text-zinc-100/g, 'text-slate-100');

            // The stray purple/pink "active" branding left over in logos
            content = content.replace(/bg-purple-600/g, 'bg-sky-500');
            content = content.replace(/from-purple-600/g, 'from-sky-500');
            content = content.replace(/from-fuchsia-600/g, 'from-sky-500');
            content = content.replace(/to-fuchsia-500/g, 'to-blue-600');
            content = content.replace(/from-indigo-[0-9]{3}/g, 'from-sky-500');
            content = content.replace(/text-purple-300/g, 'text-sky-300');
            content = content.replace(/text-purple-400/g, 'text-sky-400');
            content = content.replace(/border-purple-500\/30/g, 'border-sky-500/30');

            // Glowing Rings
            content = content.replace(/ring-white\/20/g, 'ring-sky-500/20');

            fs.writeFileSync(fullPath, content, 'utf8');
        }
    }
}

switchTheme(path.join(__dirname, 'src'));
console.log('Ocean Theme Applied!');
