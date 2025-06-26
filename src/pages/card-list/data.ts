import { createClient } from '@supabase/supabase-js'


const anonkey = import.meta.env.VITE_ANON_KEY;
const projectUrl = import.meta.env.VITE_PROJECT_URL;

if (!anonkey || !projectUrl) {
    throw new Error('Missing Supabase environment variables: REACT_APP_ANON_KEY or PROJECT_URL');
}

export const supabase = createClient(projectUrl, anonkey);

export interface CardItem {
    title: string;
    tags: string[];
    count: number;
}

export interface VocabList {
    id: number | string;
    title: string;
    tags: string[];
}