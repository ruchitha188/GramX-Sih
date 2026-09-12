import { supabase } from './supabaseClient';
import { ProjectItem, SourceDocument, DeliverableOutput } from '../types';

export const dbService = {
    async saveProject(source: SourceDocument, deliverables: DeliverableOutput[], user: any) {
        if (!user) return null;

        // Save to projects equivalent table (workspaces or custom project tracking table)
        // Here we assume saving to a 'projects' table if it exists, or mimicking by saving source as a project representation
        try {
            // Create source
            const { data: sourceData, error: sourceError } = await supabase
                .from('sources')
                .insert({
                    title: source.title || 'Untitled Project',
                    filename: source.filename || '',
                    source_type: source.type || 'text',
                    raw_content: source.rawContent || '',
                    context_summary: source.contextSummary || ''
                })
                .select()
                .single();

            if (sourceError) throw sourceError;

            const sourceId = sourceData.id;

            // Save deliverables
            const mappedDeliverables = deliverables.map(d => ({
                source_id: sourceId,
                deliverable_type: d.type,
                title: d.title,
                category: d.category || 'Documents',
                description: d.description || '',
                content_en: d.contentEn || '',
                content_te: d.contentTe || '',
                version: d.version || 1,
                review_status: d.reviewStatus || 'Draft'
            }));

            if (mappedDeliverables.length > 0) {
                const { error: delivError } = await supabase
                    .from('deliverables')
                    .insert(mappedDeliverables);
                if (delivError) throw delivError;
            }

            return sourceId;
        } catch (e) {
            console.error('Error saving to Supabase:', e);
            return null;
        }
    },

    async getProjectsList(): Promise<ProjectItem[]> {
        try {
            const { data, error } = await supabase
                .from('sources')
                .select(`
          id, 
          title, 
          filename, 
          created_at, 
          deliverables ( id, review_status )
        `)
                .order('created_at', { ascending: false });

            if (error || !data) return [];

            return data.map(src => {
                const delivs = (src.deliverables || []) as any[];
                // Determine collective status
                let status = 'Draft';
                if (delivs.some(d => d.review_status === 'Approved')) status = 'Approved';
                else if (delivs.some(d => d.review_status === 'In Review')) status = 'In Review';

                return {
                    id: src.id,
                    title: src.title,
                    description: src.title,
                    sourceName: src.filename,
                    deliverablesCount: delivs.length,
                    updatedAt: new Date(src.created_at).toLocaleDateString(),
                    status: status as any,
                    team: ['You']
                };
            });
        } catch (e) {
            console.error('Error fetching projects:', e);
            return [];
        }
    }
};
