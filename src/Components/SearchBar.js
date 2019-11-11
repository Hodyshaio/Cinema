import React from 'react';

class SearchBar  extends React.Component {

    state = { term: '' }

    onInputChange = (event) => {
        this.setState({
            term: event.target.value
        })
    }
    onSubmitForm = (event) => {
        event.preventDefault();
        if(this.state.term !== ' '){
            console.log("onSubmitForm()")
            console.log("state => ",this.state.term)
            this.props.send(this.state.term);
        }
        this.setState({
            // to delete the term from input
            term: ''
        })
    }

    render() { 
        return (
            <div className="ui segment">
                <form className="ui form" onSubmit={this.onSubmitForm}>
                    <div className="ui fluid icon input">
                        {/* <label>Moving Search.....</label> */}
                        <input type="text" value={this.state.term} onChange={this.onInputChange}
                         placeholder="Search for a movie"/>
                         <i className="circular search link icon"></i>
                    </div>
                </form>
            </div>
        );
    }
}
 
export default SearchBar;