import React, {useState, KeyboardEvent, useRef, useCallback} from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import SearchIcon from '@mui/icons-material/Search';
import CircularProgress from '@mui/material/CircularProgress';
import {Button} from "@mui/material";
import Constants from "./constants";
import useGists from './hooks/useGists'
import GistItem from "./components/GistItem";


const App = () => {
    const [inputVal, setInputVal] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    let {
        isLoading,
        isError,
        error,
        gists,
        hasNextPage
    } = useGists(username, page);

    const intObserver = useRef<IntersectionObserver | undefined>()
    const lastGistRef = useCallback((gist: any) => {
        if (isLoading) return

        if (intObserver.current) intObserver.current.disconnect()

        intObserver.current = new IntersectionObserver(gists => {
            if (gists[0].isIntersecting && hasNextPage) {
                setPage(prev => prev + 1)
            }
        })

        if (gist) intObserver.current.observe(gist)
    }, [isLoading, hasNextPage])

    const gistList = gists.map((gist, i) => {
        if (gists.length === i + 1) {
            return <GistItem ref={lastGistRef} key={i} gist={gist}/>
        }
        return <GistItem key={gist.id} gist={gist}/>
    })


    const handleOnKeyDown = (e: KeyboardEvent<HTMLElement>) => {
        if (e.key === 'Enter') {
            handleTriggerFetchGists()
        }
    }

    const handleTriggerFetchGists = () => {
        setPage(1);
        setUsername(inputVal)
    }

    return (
        <Box textAlign="center" style={appStyles.wrapper}>
            <h1 id="top">Enter github username to fetch gists</h1>
            <Container maxWidth="lg">
                <Box sx={appStyles.boxStyle}>
                    <OutlinedInput
                        fullWidth
                        data-testid="username-input"
                        value={inputVal}
                        onChange={(e) => setInputVal(e.target.value)}
                        onKeyDown={(e) => handleOnKeyDown(e)}
                        startAdornment={
                            <InputAdornment position="start">
                                <SearchIcon style={appStyles.searchIcon}/>
                            </InputAdornment>}
                        style={appStyles.searchInput}
                    />
                    <Button
                        variant="contained"
                        data-testid="search-button"
                        disabled={inputVal.trim() === "" || isLoading}
                        style={appStyles.searchButton}
                        onClick={handleTriggerFetchGists}
                    >
                        Search
                    </Button>
                </Box>
                {!isLoading && username.trim() !== "" && !isError &&
                    <p className='center'>Showing results for "{username}"</p>
                }
                {
                    isError ?
                        <p className='center'>Error: {error.message}</p>
                        :
                        gistList
                }
            </Container>
            {isLoading &&
                <div>
                    <p className="center">Loading Gists...</p>
                    <CircularProgress/>
                </div>
            }
        </Box>
    )
}

const appStyles = {
    wrapper: {
        color: Constants.PRIMARY,
    },
    boxStyle: {
        p: '10px 0',
        display: 'flex',
        justifyContent: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 1,
        background: Constants.DARK,
    },
    searchIcon: {
        color: Constants.PRIMARY
    },
    searchInput: {
        color: Constants.PRIMARY
    },
    searchButton: {
        color: Constants.PRIMARY,
        marginLeft: 10,
    },
    scrollToTopLink: {
        color: Constants.PRIMARY,
        textDecoration: 'none',
        margin: 5,
    }
}

export default App;
