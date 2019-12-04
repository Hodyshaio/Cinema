import React from 'react';

const Pagination = props => {

    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(props.totalMovies / props.moviesPerPage); i++){
        pageNumbers.push(i);
    }

    return (
        <nav aria-label="Page navigation example">
            <ul className='pagination justify-content-center'>
                {pageNumbers.map(number => (
                    <button onClick={() => props.paginate(number)} key={number} className='ui circular olive button icon btnPagination'>
                        <a className="page-a">
                            {number}
                        </a>
                    </button>
                ))}
            </ul>
        </nav>
    );
}

export default Pagination;