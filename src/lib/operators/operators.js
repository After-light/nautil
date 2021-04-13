import React from 'react'
import {
  isFunction,
  isString,
} from 'ts-fns'

import Component from '../component.js'
import Observer from '../components/observer.jsx'

export function observe(subscription, unsubscription) {
  return function(C) {
    return class extends Component {
      render() {
        let subscribe = subscription
        let unsubscribe = unsubscription
        // use a special prop to observe
        // i.e. observe('model') => subscribe = this.props.model => subscribe = model.watch('*', dispatch)
        if (isString(subscribe)) {
          subscribe = this.props[subscribe]
        }
        // unsubscribe to be a string supporting, which pick a prop
        // i.e. observe('onSubscribe', 'onUnsubscribe')
        if (isFunction(subscribe) && isString(unsubscribe)) {
          unsubscribe = this.props[unsubscribe]
        }

        return (
          <Observer subscribe={subscribe} unsubscribe={unsubscribe} dispatch={this.update}>
            <C {...this.props} />
          </Observer>
        )
      }
    }
  }
}

/**
 * Add a new prop for some component
 * @param {*} prop
 * @param {function|any} define
 */
export function inject(prop, define) {
  return function(C) {
    return class extends Component {
      render() {
        const { children, ...props } = this.props
        props[prop] = isFunction(define) ? define(this.props) : define
        return <C {...props}>{children}</C>
      }
    }
  }
}

/**
 * Change some component's defaultProps
 * @param {*} component
 * @param {function|object} pollute
 */
export function pollute(component, pollute) {
  return function(C) {
    return class extends Component {
      init() {
        const pollutedProps = isFunction(pollute) ? pollute(this.props) : pollute
        this._pollutedComponents = [
          { component, props: pollutedProps }
        ]
      }
      render() {
        return <C {...this.props} />
      }
    }
  }
}

/**
 * Initialize a Constructor when the component initialize
 * @param {*} prop
 * @param {*} Constructor
 * @param {...any} args the parameters which passed into the class constructor when initialize
 */
export function initialize(prop, Constructor, ...args) {
  return function(C) {
    return class extends Component {
      init() {
        const instance = new Constructor(...args)
        this[prop] = instance
      }
      onUnmount() {
        this[prop] = null
      }
      render() {
        const { children, ...props } = this.props
        props[prop] = this[prop]
        return <C {...props}>{children}</C>
      }
    }
  }
}

/**
 * create a component which is wrapped be nested components
 * @param  {...any} args list of [Component, props]
 */
export function nest(...args) {
  return function(C) {
    return class extends Component {
      render() {
        const { props } = this
        const realContent = <C {...props} />
        let finalContent = realContent

        const items = args.reverse()
        items.forEach((item) => {
          if (!item) {
            return
          }

          const [Component, props] = item
          finalContent = <Component {...props}>{finalContent}</Component>
        })

        return finalContent
      }
    }
  }
}
