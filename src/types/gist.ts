export interface IGist {
    id: number,
    created_at: string,
    files: IGistFile,
    forks?: IGistFork[]
}

export interface IGistFile {
    [key: string]: IGistFileValue,
}

export interface IGistFileValue {
    language: string,
    type: string
}

export interface IGistQueryReqParams {
    username: string;
    page: number;
}

export interface IGistFork {
    git_pull_url: string;
    avatar_url?: string
    login?: string
}