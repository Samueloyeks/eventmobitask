import {useState, useEffect} from 'react'
import {getUserGists} from '../http/gist-service';

const defaultErrorObj = {
    cause: undefined, name: "", stack: "", message: ""
}
const useGists = (username: string = "", page: number = 1) => {
    const [gists, setGists] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isError, setIsError] = useState<boolean>(false)
    const [error, setError] = useState<Error>(defaultErrorObj);
    const [hasNextPage, setHasNextPage] = useState<boolean>(false)


    useEffect(() => {
        setIsLoading(true)
        setIsError(false)
        setError(defaultErrorObj)

        const controller = new AbortController()
        const {signal} = controller

        if (username.trim() !== "") {
            if(page === 1){
                setGists([]);
            }

            getUserGists({username, page}, {signal})
                .then(data => {
                    setGists(prev => [...prev, ...data])
                    setHasNextPage(Boolean(data.length))
                    setIsLoading(false)
                })
                .catch(e => {
                    setIsLoading(false)
                    if (signal.aborted) return
                    setIsError(true)
                    setError({...error, message: e.message})
                })
        } else {
            setHasNextPage(false)
            setIsLoading(false)
        }

        return () => controller.abort()

    }, [page, username])

    return {isLoading, isError, error, gists, hasNextPage}
}

export default useGists