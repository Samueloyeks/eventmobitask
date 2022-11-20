# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more
information.

## Brief documentation

I set up the api client for fetching gists and provided my token from the .env file <strong>(please see
example.env)</strong>.<br/>
Fetch request is initiated via the useGists custom hook which fetches the gists for a particular user with username
provided.

In the App component, i have attached a ref to the rendered git item which updates and sets the ref current
value to the last gist in the array when it is scrolled into view in order to achieve infinite scroll.

```
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
```

Api requests are made for each gist in the GistItem component. When the api call is resolved, the
last 3 forks on the gist are rendered as user avatars with links to them.

```
        getGistForks(gistItem.id)
            .then(({data}) => {
                handleOnGetForksSuccess(data)
            })
            .catch((err: Error) => {
                handleOnGetForksError(err.message)
        })
```
