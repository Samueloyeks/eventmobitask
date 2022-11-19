import React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import {IGistFork} from "../types/gist";
import Box from "@mui/material/Box";


const GistForks = ({forks}: { forks: IGistFork[] }) => {

    return (
        <Box textAlign="right" gap={2}>
            {forks.length > 0 && <h4>Forks</h4>}
            <Stack direction="row" spacing={2} sx={{t: 3}} justifyContent="flex-end">
                {
                    forks.map((fork) =>
                        <a key={fork.git_pull_url}
                           style={forksStyles.avatarWrapper}
                           href={fork.git_pull_url}
                           rel="noreferrer"
                           target="_blank"
                        >
                            <Avatar alt={fork.login}
                                    src={fork.avatar_url || fork.login}/>
                        </a>
                    )
                }
            </Stack>
        </Box>
    )
}

const forksStyles = {
    avatarWrapper: {
        cursor: 'pointer'
    }
}

export default GistForks;