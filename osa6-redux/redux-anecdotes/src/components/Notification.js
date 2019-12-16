import React from 'react'

const Notification = ({ store }) => {
  const style = { border: 'solid', padding: 10, borderWidth: 1 }
  let notification = store.getState().notification
  
  return (
    <div className={notification.type} style={style}>
      {notification.message}
    </div>
  )
}

export default Notification