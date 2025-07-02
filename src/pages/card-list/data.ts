import { createClient } from '@supabase/supabase-js'


const anonkey = import.meta.env.VITE_ANON_KEY;
const projectUrl = import.meta.env.VITE_PROJECT_URL;

if (!anonkey || !projectUrl) {
    throw new Error('Missing Supabase environment variables: VITE_ANON_KEY or VITE_PROJECT_URL');
}

export const supabase = createClient(projectUrl, anonkey);

export interface CardItem {
    id: string;
    title: string;
    description?: string;
    tags: string[];
    count: number;
    expiresAt: string;
}

export interface VocabList {
    id: string;
    title: string;
    description?: string;
    expiresAt: string;
    accessKey: string;
}

export interface VocabItem {
    id: string;
    vocabListId: string;
    word: string;
    meaning: string;
    partOfSpeech?: string;
}

export interface Tag {
    id: string;
    name: string;
    type: 'grade' | 'exam' | 'custom';
}