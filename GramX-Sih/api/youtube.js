import { YoutubeTranscript } from 'youtube-transcript';

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const url = req.query.url || (req.body && req.body.url);

    if (!url) {
        return res.status(400).json({ error: 'Missing youtube url' });
    }

    try {
        const transcript = await YoutubeTranscript.fetchTranscript(url);
        const text = transcript.map(t => t.text).join(' ');
        res.status(200).json({ transcript: text });
    } catch (error) {
        // Elegant fallback: scrape title and description if captions are disabled or blocked
        try {
            const response = await fetch(url.includes('http') ? url : `https://youtube.com/watch?v=${url}`);
            const html = await response.text();

            const titleMatch = html.match(/<title>(.*?)<\/title>/);
            const title = titleMatch ? titleMatch[1].replace(' - YouTube', '') : 'Unknown Video';

            const descMatch = html.match(/"shortDescription":"(.*?)"/);
            const description = descMatch ? descMatch[1].replace(/\\n/g, ' ').replace(/\\"/g, '"') : '';

            const fallbackText = `Video Title: ${title}. \nVideo Description: ${description}. \n\n(Note: Full captions were disabled for this video, so the analysis is based on the official video metadata and description.)`;

            res.status(200).json({ transcript: fallbackText });
        } catch (fallbackError) {
            res.status(500).json({ error: error.message });
        }
    }
}
