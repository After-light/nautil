import React, { Fragment } from 'react'

export class Observer extends React.Component {
  constructor(props) {
    super(props)

    const dispatch = () => this.forceUpdate()
    const { subscribe } = props

    subscribe(dispatch)
  }
  render() {
    return <Fragment>
      {this.props.children}
    </Fragment>
  }
}
