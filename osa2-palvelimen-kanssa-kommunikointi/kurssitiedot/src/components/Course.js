import React from 'react';
import Header from './Header.js';
import Content from './Content.js';
import Total from './Total.js'


const Course = ({ course }) => {
    const exercises = () => course.parts.map(part => part.exercises)

    return(
        <>
        <Header course={course.name} />
        <Content parts={course.parts}/>
        <Total exercises={exercises()}/>
        </>
    )
}

export default Course