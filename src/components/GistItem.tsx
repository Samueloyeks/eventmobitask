import React, {useEffect, useState, forwardRef} from 'react';
import Box from '@mui/material/Box';
import {Grid} from "@mui/material";
import Constants from "../constants";
import GistFileBadges from "./GistFileBadges";
import {getGistForks} from "../http/gist-service";
import GistForks from "./GistForks";
import LinearProgress from '@mui/material/LinearProgress';

const GistItem = forwardRef(({gist}: { gist: any }, ref: any) => {
    const [gistItem, setGistItem] = useState<any>(gist);
    let fileTypes: string[] = [];
    const {files} = gistItem;

    if (files) {
        fileTypes = Object.values(files).map((file: any) => file.language || file.type);
    }

    useEffect(() => {
        const getGistItemFork = () => {
            getGistForks(gistItem.id)
                .then((forks: any[]) => {
                    forks = forks.map(fork => {
                        const {git_pull_url, owner} = fork;

                        return {
                            git_pull_url,
                            avatar_url: owner.avatar_url
                        }
                    })

                    setGistItem({...gistItem, forks});
                }).catch(() => {
                setGistItem({...gistItem, forks: []});
            })
        }

        if (!gistItem['forks']) {
            getGistItemFork();
        }
    }, [gistItem])

    const gistBody = (
        gistItem &&
        <Box sx={gistItemStyles.wrapper} textAlign="left">
            <Grid container display="flex" alignItems="center">
                <Grid item md={6} sm={12}><h3>{gistItem.id}</h3></Grid>
                <Grid container
                      direction="row"
                      justifyContent={{md: "flex-end"}}
                      item
                      md={6}
                      sm={12}>
                    Created: {gistItem.created_at.split('T')[0]}
                </Grid>
            </Grid>
            <GistFileBadges fileTypes={fileTypes}/>
            {
                gistItem.forks ?
                    <GistForks forks={gistItem.forks}/>
                    :
                    <div>
                        fetching forks
                        <LinearProgress/>
                    </div>
            }
        </Box>
    )

    return ref
        ? <div ref={ref}>{gistBody}</div>
        : <div>{gistBody}</div>

})

const gistItemStyles = {
    wrapper: {
        p: 2,
        m: 2,
        borderColor: Constants.PRIMARY,
        color: Constants.PRIMARY,
        borderWidth: 2,
        borderStyle: 'solid',
        marginBottom: 2,
        borderRadius: 2,
        background: Constants.SECONDARY,
        display: 'flex',
        flexDirection: 'column',
        gridGap: 16
    },
    gistInfo: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
    }
}

export default GistItem;