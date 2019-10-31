import React from 'react';
import Part from './Part.js';

const Content = ({ parts }) => {
    const rows = () => 
        parts.map( (part) => 
            <Part key={part.id} part={part}/>
        )
    
    return (
        <>
        {rows()}
        </>
    )
}

export default Content