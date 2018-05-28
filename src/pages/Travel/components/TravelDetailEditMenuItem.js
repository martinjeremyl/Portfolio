import React from 'react'

const TravelDetailEditMenuItem = ({ onClick, children }) => (
  <div
    style={{
      display: 'flex',
      flex: '1 0 33%',
      alignSelf: 'center'
    }}
    onClick={onClick}
  >
    <div
      style={{
        color: '#fff',
        fontSize: 25,
        margin: '10% auto 0% auto',
        textAlign: 'center'
      }}
    >
      {children}
    </div>
  </div>
)

export default TravelDetailEditMenuItem
