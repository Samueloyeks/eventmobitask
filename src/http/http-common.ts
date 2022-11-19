import { Octokit } from "octokit";

const octokit = new Octokit({
    auth: process.env.REACT_APP_GITHUB_ACCESS_TOKEN,
    baseURL: process.env.REACT_APP_API_BASE_URL,
});

export default octokit;