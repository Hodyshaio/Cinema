import React from 'react';
import { useState } from 'react';

const SearchBar = props => {

    const [ term, setTerm ] = useState('');

    const onInputChange = (event) => {
        setTerm(event.target.value);
    }
    
    const onSubmitForm = (event) => {
        event.preventDefault();
        if(term !== ' '){
            props.send(term);
        }
        setTerm('');
    }

    return (
        <div className="ui segment">
            <form className="ui form" onSubmit={onSubmitForm}>
                <div className="ui fluid icon input">
                    <input type="text" value={term} onChange={onInputChange}
                        placeholder="Search for a movie"/>
                    <i className="circular search link icon"></i>
                </div>
            </form>
        </div>
    );
}
 
export default SearchBar;