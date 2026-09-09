import React, { useState, useEffect } from 'react';
import { Flame, ExternalLink, RefreshCw, Clock } from 'lucide-react';
import { NavTab } from '../../components/layout/Sidebar';

interface TrendingItem {
    title: string;
    link: string;
    pubDate: string;
    source: string;
}

export const TrendingTopicsView: React.FC = () => {
    const [topics, setTopics] = useState<TrendingItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());

    const fetchTopics = async () => {
        setLoading(true);
        try {
            // Using an open RSS-to-JSON API to fetch live trending news from Google News India directly in the browser!
            const res = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://news.google.com/rss?hl=en-IN&gl=IN&ceid=IN:en');
            const data = await res.json();
            if (data && data.items) {
                const formatted = data.items.map((item: any) => {
                    // Attempt to extract source from title ("Article Title - Source Name")
                    const splitTitle = item.title.split(' - ');
                    const source = splitTitle.length > 1 ? splitTitle.pop() : 'Google News';
                    return {
                        title: splitTitle.join(' - '),
                        link: item.link,
                        pubDate: new Date(item.pubDate).toLocaleString(),
                        source: source
                    };
                });
                setTopics(formatted);
                setLastRefreshed(new Date());
            }
        } catch (error) {
            console.error("Failed to fetch trending topics:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTopics();

        // Auto-refresh every 1 hour (3600000 ms) as requested
        const interval = setInterval(fetchTopics, 3600000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end pb-4 border-b border-white/[0.08]">
                <div>
                    <h2 className="text-2xl font-black text-slate-50 tracking-tight flex items-center gap-2">
                        <Flame className="w-6 h-6 text-red-500" />
                        Live Viral Topics in India
                    </h2>
                    <p className="text-sm text-slate-400 mt-1">
                        Real-time scraping of the most discussed events across the country. Auto-refreshes every 1 hour.
                    </p>
                </div>
                <div className="flex items-center gap-3 mt-4 sm:mt-0">
                    <span className="text-xs text-zinc-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Last updated: {lastRefreshed.toLocaleTimeString()}
                    </span>
                    <button
                        onClick={fetchTopics}
                        disabled={loading}
                        className="flex items-center gap-2 px-3 py-1.5 bg-[#0c0a14] border-indigo-500/10 border border-white/[0.08] rounded-lg text-xs font-semibold text-slate-300 hover:bg-[#09090b] active:scale-95 transition-all disabled:opacity-50"
                    >
                        <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                        Refresh
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {loading && topics.length === 0 ? (
                    // Skeletons
                    Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="p-5 rounded-2xl bg-[#0c0a14] border-indigo-500/10 border border-white/[0.08] animate-pulse h-40"></div>
                    ))
                ) : (
                    topics.map((topic, i) => (
                        <div key={i} className="p-5 rounded-2xl bg-[#0c0a14] border-indigo-500/10 border border-white/[0.08] hover:border-red-300 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <span className="px-2 py-0.5 rounded-full bg-red-50 text-red-600 text-[10px] font-bold uppercase tracking-wider border border-red-100">
                                        Trending #{i + 1}
                                    </span>
                                    <span className="text-[10px] text-slate-400 font-medium">{topic.pubDate}</span>
                                </div>
                                <h3 className="font-bold text-slate-200 text-sm leading-snug group-hover:text-red-700 transition-colors">
                                    {topic.title}
                                </h3>
                            </div>
                            <div className="mt-4 pt-3 border-t border-zinc-900 flex items-center justify-between">
                                <span className="text-xs font-medium text-zinc-500 flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                                    {topic.source}
                                </span>
                                <a
                                    href={topic.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 hover:text-blue-800 transition-colors"
                                >
                                    Source Link <ExternalLink className="w-3 h-3" />
                                </a>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
