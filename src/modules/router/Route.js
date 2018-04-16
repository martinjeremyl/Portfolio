import React from 'react'
import pathToRegexp from 'path-to-regexp'

import Context from './Context'

export default function Route (props) {
  return (
    <Context.Consumer>
      {context => {
        const re = pathToRegexp(props.path)
        if (re.test(context.path)) {
          return props.children
        }
      }}
    </Context.Consumer>
  )
}
