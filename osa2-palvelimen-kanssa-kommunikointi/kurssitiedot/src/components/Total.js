import React from 'react';

const Total = ({exercises}) => {
    const total = exercises.reduce( (s, p) => s + p)

    return (
        <>
        <p>Total of {total} exercises</p>
        </>
    )
}

export default Total