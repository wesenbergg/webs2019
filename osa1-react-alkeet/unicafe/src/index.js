import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = props => {
    return(
        <button onClick={() => props.setteri(props.value+1)}>{props.name}</button>
    )
}

const Statistics = props => {
    let kaikki = props.good+props.neutral+props.bad
    let pos = props.good/kaikki

    if(kaikki === 0) {
        return (
            <>
                <h2>statistics</h2>
                <p>No feedback given</p>
            </>
        )
    }

    return(
        <>
        <h2>statistics</h2>
        <table>
        <Statistic name="good" value={props.good}/>
        <Statistic name="neutral" value={props.neutral}/>
        <Statistic name="bad" value={props.bad}/>
        <Statistic name="kaikki" value={props.kaikki}/>
        <Statistic name="average" value={(props.good-props.bad)/kaikki}/>
        <Statistic name="positive" value={pos}/>
        </table>
        </>
    )
}

const Statistic = props => {
    return(
        <>
        <tr>
            <th>{props.name}</th>
            <th>{props.value}</th>
        </tr>
        </>
    )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <h2>give feedback</h2>
      <Button name="good" value={good} setteri={setGood}/>
      <Button name="neutral" value={neutral} setteri={setNeutral}/>
      <Button name="bad" value={bad} setteri={setBad}/>

      <Statistics good={good} neutral={neutral} bad={bad}/>
    </>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)