import React from 'react'
import { connect } from 'react-redux'
import { change } from '../reducers/filterReducer'

const Filter = ( props ) => {
  const handleChange = (event) => {
    props.change(event.target.value)
  }

  const style = {
    marginBottom: 10
  }
  //value={store.getState().filter}
  return (
    <div style={style}>
      filter <input value={props.filter} onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = {
  change
}

const mapStateToProps = (state) => {
  return {
    filter: state.filter
  }
}

const ConnectedFilter = connect(mapStateToProps, mapDispatchToProps)(Filter)
export default ConnectedFilter