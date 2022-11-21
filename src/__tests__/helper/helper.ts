export const GIST = {
    id: 100222345,
    created_at: '2016-12-02T00:00',
    description: 'mock gist',
    files: {
        file1: {
            language: 'JavaScript',
            type: 'JavaScript'
        },
        file2: {
            language: 'HTML',
            type: 'HTML'
        },
    }
}

export const GIST_WITH_FORKS = {
    ...GIST,
    forks: [
        {
            git_pull_url: 'test_fork_url',
            avatar_url: 'test_avatar_url',
            login: 'test_login'
        }
    ]
}