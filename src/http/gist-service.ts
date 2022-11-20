import octokit from "./http-common";
import {IGistQueryReqParams} from '../types/gist'

const getUserGists = async (params: IGistQueryReqParams, options = {}) => {
    const {username = "", page = 1} = params;

    const response: any = await octokit.request('GET /users/{username}/gists{?since,per_page,page}', {
        username,
        per_page: 20,
        page
    })

    return response.data;
}

const getGistForks = (gist_id: number) => {
    // octokit.request('GET /gists/{gist_id}/forks{?per_page,page}', {
    //     gist_id,
    //     per_page: 3,
    //     page: 1,
    // }).then((response) => {
    //     onSuccess(response.data)
    // }).catch((err: Error) => {
    //     onError(err.message)
    // })

    return octokit.request('GET /gists/{gist_id}/forks{?per_page,page}', {
        gist_id,
        per_page: 3,
        page: 1,
    })
}

export {getUserGists, getGistForks}