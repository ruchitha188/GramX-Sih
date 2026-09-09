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

            // Vibe: Cosmic Dark Aesthetics (Anthropic/Vercel/Linear hybrid)
            // Backgrounds
            content = content.replace(/bg-black/g, 'bg-[#09090b]'); // Extremely deep zinc
            content = content.replace(/bg-zinc-950/g, 'bg-[#0c0a14] border-indigo-500/10'); // Slight indigo tint for metal
            content = content.replace(/bg-zinc-900\/80/g, 'bg-[#12101f]/80');
            content = content.replace(/bg-zinc-900/g, 'bg-[#12101c]');
            content = content.replace(/bg-zinc-800/g, 'bg-[#1b182b]');

            // Buttons / Primary actions
            content = content.replace(/bg-zinc-200 text-black/g, 'bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] border-none');
            content = content.replace(/hover:bg-white/g, 'hover:from-indigo-400 hover:to-violet-500');
            content = content.replace(/bg-zinc-300 text-black/g, 'bg-indigo-600 text-white');

            // Accents / Badges
            content = content.replace(/border-blue-300\/30 shadow-sm shadow-blue-200\/50/g, 'border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.4)] text-indigo-300');
            content = content.replace(/bg-zinc-200/g, 'bg-indigo-600/20 text-indigo-300');
            content = content.replace(/bg-black\/10/g, 'bg-black/40 text-indigo-200'); // the cmd+k badge
            content = content.replace(/from-zinc-300 to-zinc-500/g, 'from-indigo-400 to-violet-400');
            content = content.replace(/bg-blue-400/g, 'bg-indigo-400');

            // Outline borders
            content = content.replace(/border-zinc-800/g, 'border-white/[0.08]');
            content = content.replace(/border-zinc-700/g, 'border-white/[0.12]');
            content = content.replace(/ring-zinc-800/g, 'ring-indigo-500/20');
            content = content.replace(/focus-within:border-zinc-500/g, 'focus-within:border-indigo-500/50 focus-within:ring-2 focus-within:ring-indigo-500/20');

            // Text colors
            content = content.replace(/text-zinc-100/g, 'text-slate-50');
            content = content.replace(/text-zinc-200/g, 'text-slate-200');
            content = content.replace(/text-zinc-300/g, 'text-slate-300');
            content = content.replace(/text-zinc-400/g, 'text-slate-400');

            // Overrides for specific components to make them purely aesthetic
            content = content.replace(/bg-zinc-950\/70/g, 'bg-[#0f0c1b]/70');
            content = content.replace(/border-blue-300\/20/g, 'border-indigo-500/20');
            content = content.replace(/bg-zinc-900\/40/g, 'bg-[#131022]/40');
            content = content.replace(/text-blue-400/g, 'text-indigo-400');

            fs.writeFileSync(fullPath, content, 'utf8');
        }
    }
}

switchTheme(path.join(__dirname, 'src'));
console.log('Cosmic Aesthetic Theme Applied!');
