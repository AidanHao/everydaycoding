export interface Article {
    articleId: number;
    title: string;
    articleDesc: string;
    content: string;
    articleLabel: string;
    articleType: string;
    coverImg: string;
    publishTime: string;
    viewCount: number;
    commentCount: number;
    likeCount: number;
    authorName: string;
    authorAvatar: string;
    hotScore: number;
}

export interface ArticleResponse {
    code: string;
    data: {
        list: Article[];
        page: number;
        pageSize: number;
    };
    msg: string;
} 