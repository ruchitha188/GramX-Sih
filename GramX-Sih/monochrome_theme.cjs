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

            content = content.replace(/bg-\[\#09090b\]/g, 'bg-black');
            content = content.replace(/bg-\[\#0c0a14\] border-indigo-500\/10/g, 'bg-black border-white/10');
            content = content.replace(/bg-\[\#12101f\]\/80/g, 'bg-zinc-950/80');
            content = content.replace(/bg-\[\#12101c\]/g, 'bg-zinc-950');
            content = content.replace(/bg-\[\#1b182b\]/g, 'bg-zinc-900');

            content = content.replace(/bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-\[0_0_20px_rgba\(99,102,241,0\.3\)\] hover:shadow-\[0_0_30px_rgba\(124,58,237,0\.5\)\] border-none/g, 'bg-zinc-200 hover:bg-white text-black');
            content = content.replace(/hover:from-indigo-400 hover:to-violet-500/g, 'hover:bg-zinc-300');

            content = content.replace(/bg-indigo-600 text-white/g, 'bg-zinc-200 text-black');
            content = content.replace(/border-indigo-500\/50 shadow-\[0_0_15px_rgba\(99,102,241,0\.4\)\] text-indigo-300/g, 'border-white/20 shadow-sm text-white');
            content = content.replace(/bg-indigo-600\/20 text-indigo-300/g, 'bg-white/10 text-white');
            content = content.replace(/bg-black\/40 text-indigo-200/g, 'bg-black/50 text-zinc-300');
            content = content.replace(/from-indigo-400 to-violet-400/g, 'from-zinc-300 to-zinc-500');
            content = content.replace(/bg-indigo-400/g, 'bg-zinc-300');
            content = content.replace(/ring-indigo-500\/20/g, 'ring-white/20');
            content = content.replace(/focus-within:border-indigo-500\/50 focus-within:ring-2 focus-within:ring-indigo-500\/20/g, 'focus-within:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-500/30');
            content = content.replace(/bg-\[\#0f0c1b\]\/70/g, 'bg-black/70');
            content = content.replace(/border-indigo-500\/20/g, 'border-white/10');
            content = content.replace(/bg-\[\#131022\]\/40/g, 'bg-zinc-950/40');

            content = content.replace(/text-indigo-[0-9]{3}/g, 'text-zinc-300');
            content = content.replace(/text-violet-[0-9]{3}/g, 'text-zinc-300');
            content = content.replace(/text-blue-[0-9]{3}/g, 'text-zinc-300');
            content = content.replace(/text-purple-[0-9]{3}/g, 'text-zinc-300');
            content = content.replace(/text-emerald-[0-9]{3}/g, 'text-zinc-300');
            content = content.replace(/text-red-[0-9]{3}/g, 'text-zinc-300');
            content = content.replace(/text-yellow-[0-9]{3}/g, 'text-zinc-300');
            content = content.replace(/text-green-[0-9]{3}/g, 'text-zinc-300');

            content = content.replace(/bg-indigo-[0-9]{3}/g, 'bg-zinc-200');
            content = content.replace(/bg-violet-[0-9]{3}/g, 'bg-zinc-200');
            content = content.replace(/bg-blue-[0-9]{3}\/[0-9]{2}/g, 'bg-white/10');
            content = content.replace(/bg-indigo-[0-9]{3}\/[0-9]{2}/g, 'bg-white/10');
            content = content.replace(/border-indigo-[0-9]{3}\/[0-9]{2}/g, 'border-zinc-700');
            content = content.replace(/border-blue-[0-9]{3}\/[0-9]{2}/g, 'border-zinc-700');

            content = content.replace(/from-indigo-[0-9]{3}\/[0-9]{2}/g, 'from-zinc-900');
            content = content.replace(/to-slate-[0-9]{3}/g, 'to-black');
            content = content.replace(/ring-indigo-[0-9]{3}\/[0-9]{2}/g, 'ring-white/10');
            content = content.replace(/shadow-indigo-[0-9]{3}\/[0-9]{2}/g, 'shadow-white/5');

            // Edge cases from OutputSelector / ConfigurationPanel
            content = content.replace(/from-zinc-900 to-black/g, 'from-zinc-900 to-black');
            content = content.replace(/border-indigo-500\/60 ring-1 ring-indigo-500\/40 shadow-lg shadow-indigo-950\/30/g, 'border-zinc-500 ring-1 ring-white/20 shadow-lg shadow-black/50');

            fs.writeFileSync(fullPath, content, 'utf8');
        }
    }
}

switchTheme(path.join(__dirname, 'src'));
console.log('Monochrome Strict Theme Applied!');
