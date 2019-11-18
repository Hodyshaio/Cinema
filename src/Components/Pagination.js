import React from 'react';

const Pagination = props => {
    console.log("Pagination => props => ",props);
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(props.totalMovies / props.moviesPerPage); i++) {
        console.log("into the for => ",props)
        pageNumbers.push(i);
        console.log("after the for => ",props)
    }
    console.log("Pagination => I'm Here 1 => ",props);
    return (
        console.log("Pagination => I'm Here 2 => ",props),
        <nav className="ui pagination secondary menu">
            <ul className="paginationI">
            {console.log("Pagination => I'm Here 3 => ",props)}
                { console.log("Pagination => I'm Here 4 => ",pageNumbers.length),
                    pageNumbers.map(number => (
                    console.log("into the pageNumbers"),
                    <li key={number} className="item">
                        {console.log("into the li")}
                        <a onClick={() => props.paginate(number)} href="!#" className="item">{number}</a>
                        {console.log("after the a")}
                    </li>
                )) }
            </ul>
            <div>1 2 3 </div>
        </nav>
    );
}

export default Pagination;