import octokit from "./http-common";
import {IGistQueryReqParams} from '../types/gist'

const getUserGists = async (params: IGistQueryReqParams, options={}) => {
    const {username = "",  page = 1} = params;

    const response: any = await octokit.request('GET /users/{username}/gists{?since,per_page,page}', {
        username,
        per_page: 20,
        page
    })

    return response.data;
}

const getGistForks = async (gist_id: number) => {

   try{
       const { data: gistForks }: any = await octokit.request('GET /gists/{gist_id}/forks{?per_page,page}', {
           gist_id,
           per_page: 3,
           page: 1,
       })

       return gistForks;

   } catch(err: any){
        return []
   }
}

export {getUserGists, getGistForks}