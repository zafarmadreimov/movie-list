import React, { useState, useContext } from 'react';
import { Context } from '../context/context';
import './search-panel.css';

const SearchPanel = () => {
    const [term, setTerm] = useState('');
    const { dispatch } = useContext(Context);

    const updateTermHandler = e => {
        const term = e.target.value.toLowerCase();
        setTerm(term);
        dispatch({ type: 'ON_TERM', payload: term });
    };

    return (
        <input
            type='text'
            className='form-control search-input'
            placeholder="Kinolarni qidirish"
            onChange={updateTermHandler}
            value={term}
        />
    );
}

export default SearchPanel;
