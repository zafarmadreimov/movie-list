import React, { useState, useEffect, useContext } from 'react';
import AppInfo from '../app-info/App-info';
import SearchPanel from '../search-panel/search-panel'
import AppFilter from '../app-filter/App-filter';
import MovieList from '../movie-list/movie-list';
import MoviesAddForm from '../movies-add-form/movies-add-form' 
import { Context } from '../context/context';

import './App.css';

const App = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useContext(Context);

    useEffect(() => {
        setIsLoading(true);
        fetch('https://jsonplaceholder.typicode.com/todos?_start=0&_limit=5')
            .then(response => response.json())
            .then(json => {
                const newArr = json.map(item => ({
                    name: item.title,
                    id: item.id,
                    viewers: item.id * 10,
                    favourite: false,
                    like: false,
                }));
                dispatch({ type: 'GET_DATA', payload: newArr });
            })
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false));
    }, [dispatch]);

    return (
        <div className='app font-monospace'>
            <div className='content'>
                <AppInfo />
                <div className='search-panel'>
                    <SearchPanel />
                    <AppFilter />
                </div>
                {isLoading && 'Loading..'}
                <MovieList />
                <MoviesAddForm />
            </div>
        </div>
    );
}

export default App;
