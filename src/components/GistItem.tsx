import React, {useEffect, useState, forwardRef} from 'react';
import Box from '@mui/material/Box';
import {Grid} from "@mui/material";
import Constants from "../constants";
import GistFileBadges from "./GistFileBadges";
import {getGistForks} from "../http/gist-service";
import GistForks from "./GistForks";
import LinearProgress from '@mui/material/LinearProgress';
import {IGist} from "../types/gist";

const GistItem = forwardRef(({gist}: { gist: IGist }, ref: any) => {
    const [gistItem, setGistItem] = useState<IGist>(gist);
    const [isError, setIsError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [fetchingForks, setFetchingForks] = useState<boolean>(false);

    const {files} = gistItem;
    let formattedFiles: string[] = [];

    if (files) {
        formattedFiles = Object.values(files)
            .map((file) => file.language || file.type);
    }

    useEffect(() => {
        const getGistItemFork = () => {
            setFetchingForks(true);
            setIsError(false);

            getGistForks(gistItem.id)
                .then(({data}) => {
                    handleOnGetForksSuccess(data)
                })
                .catch((err: Error) => {
                    handleOnGetForksError(err.message)
                })
        }

        if (!gistItem['forks']) {
            getGistItemFork();
        }

    }, [gistItem])

    const handleOnGetForksSuccess = (forks: any[]) => {
        const formattedGistForks = forks.map((fork) => {
            const {git_pull_url, owner} = fork;

            return {
                git_pull_url,
                avatar_url: owner?.avatar_url,
                login: owner?.login,
            }
        })

        setFetchingForks(false);
        setGistItem({...gistItem, forks: formattedGistForks});
    }

    const handleOnGetForksError = (errorMessage: string) => {
        setFetchingForks(false);
        setIsError(true);
        setErrorMessage(errorMessage);
    }

    const gistBody = (
        gistItem &&
        <Box sx={gistItemStyles.wrapper} textAlign="left">
            <Grid container display="flex" alignItems="center">
                <Grid item md={6} sm={12} style={{wordBreak:"break-word"}}>
                    <h3 style={gistItemStyles.idWrapper}>
                        {`ID: ${gistItem.id}`}
                    </h3>
                </Grid>
                <Grid container
                      direction="row"
                      justifyContent={{md: "flex-end"}}
                      item
                      md={6}
                      sm={12}>
                    Created: {gistItem.created_at.split('T')[0]}
                </Grid>
            </Grid>
            <div>{gist.description}</div>
            <GistFileBadges files={formattedFiles}/>
            {
                isError &&
                <p className='center' data-testid="fetch-forks-error">Error: {errorMessage}</p>
            }
            {!isError && (
                gistItem.forks && !fetchingForks ?
                    <GistForks forks={gistItem.forks}/>
                    :
                    <div>
                        fetching forks
                        <LinearProgress/>
                    </div>
            )}
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
    },
    idWrapper: {
        color: Constants.DARK
    }
}

export default GistItem;