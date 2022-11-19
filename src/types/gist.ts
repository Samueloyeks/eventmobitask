export interface IGistQueryReqParams {
    username: string;
    page?: number;
}

export interface IGistFork {
    git_pull_url: string;
    avatar_url?: string;
    login: string
}