import React from 'react';

const Pagination = props => {

    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(props.totalMovies / props.moviesPerPage); i++){
        pageNumbers.push(i);
    }

    return (
        <nav aria-label="Page navigation example">
            <ul className='pagination justify-content-end'>
            <a className='page-link disabled'>&laquo;</a>
                {pageNumbers.map(number => (
                    <li key={number} className='page-item'>
                        <a onClick={() => props.paginate(number)} href='!#' className='page-link'>
                        {number}
                        </a>
                    </li>
                 ))}
            <a className='page-link disabled'>&raquo;</a>
            </ul>
        </nav>
    );
}

export default Pagination;