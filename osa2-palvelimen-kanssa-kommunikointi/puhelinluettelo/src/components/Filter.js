import React from 'react'

const Filter = ({ showFilter, setShowFilter}) => {
    const handleFilterChange = e => setShowFilter(e.target.value)

    return(
        <>
        <div>
          filter: <input value={showFilter} onChange={handleFilterChange}/>
        </div>
        </>
    )
}

export default Filter