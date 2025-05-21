export interface Article {
    id: number;
    title: string;
    summary: string;
    author: string;
    category: string;
    tags: string[];
    updateTime: string;
    viewCount: number;
    likes?: number;
    coverImage?: string;
    content?: string;
} 