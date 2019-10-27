import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = {
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10
        },
        {
          name: 'Using props to pass data',
          exercises: 7
        },
        {
          name: 'State of a component',
          exercises: 14
        }
      ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts}/>
      <Total sum={course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises}/>
    </div>
  )
}

const Header = props => {
    return(
        <>
            <h1>{props.course}</h1>
        </>
    )
}

const Content = props => {
    return(
        <>
        <Part part={props.parts[0].name} exercise={props.parts[0].exercises}/>
        <Part part={props.parts[1].name} exercise={props.parts[1].exercises}/>
        <Part part={props.parts[2].name} exercise={props.parts[2].exercises}/>
        </>
    )
}

const Total = props => {
    return(
        <>
        <p>Number of exercises {props.sum}</p>
        </>
    )
}

const Part = props => {
    return(
        <>
        <p>{props.part} {props.exercise}</p>
        </>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))