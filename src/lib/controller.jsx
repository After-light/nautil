import React from 'react'
import { Model } from './model.js'
import { Store } from './store/store.js'
import { each, getConstructorOf, isInheritedOf, isFunction, isInstanceOf, isObject, throttle } from 'ts-fns'
import Component from './component.js'
import { Stream } from './stream.js'
import { Service } from './service.js'
import { DataService } from './services/data-service.js'
import { evolve } from './operators/operators.js'

/**
 * class SomeController extends Constroller {
 *   static vote = VoteModel
 *
 *   static vote$(stream) {
 *     stream.subscribe(() => this.vote.count ++ )
 *   }
 *
 *   VoteButton(props) {
 *     return <Button onHit={this.vote$}>Vote</Button>
 *   }
 *
 *   VoteCount(props) {
 *     return <Text>{this.vote.count}</Text>
 *   }
 * }
 */
export class Controller {
  constructor() {
    this.observers = []

    let activeComponents = 0

    const emitters = []
    this.update = throttle(() => {
      emitters.forEach(fn => fn())
      this.onUpdate()
    }, 16)

    const Constructor = getConstructorOf(this)
    const streams = []
    each(Constructor, (Item, key) => {
      if (Item && isInheritedOf(Item, DataService)) {
        this[key] = Item.getService()
        this.observe((dispatch) => {
          this[key].subscribe(dispatch)
          return () => this[key].unsubscribe(dispatch)
        })
      }
      else if (Item && isInheritedOf(Item, Service)) {
        this[key] = Item.getService()
      }
      else if (Item && isInheritedOf(Item, Model)) {
        this[key] = new Item()
        this.observe(this[key])
      }
      else if (Item && (Item === Store || isInheritedOf(Item, Store))) {
        this[key] = new Item()
        this.observe(this[key])
      }
      else if (isFunction(Item) && key[key.length - 1] === '$') {
        const stream$ = new Stream()
        this[key] = stream$
        streams.push([Item, stream$])
      }
    })
    // register all streams at last, so that you can call this.stream$ directly in each function.
    streams.forEach(([fn, stream$]) => fn.call(this, stream$))

    const controller = this
    const protos = Constructor.prototype
    each(protos, ({ value }, key) => {
      if (key === 'constructor') {
        return
      }

      // Fn() {}
      // get Fn() { return class extends Component {} }
      if (!isFunction(value) && !isInstanceOf(value, Component)) {
        return
      }

      const charCode = key.charCodeAt(0)
      // if not uppercase, make it as a method
      if (charCode < 65 || charCode > 90) {
        this[key] = value.bind(this)
        return
      }

      const Gen = isInstanceOf(value, Component) ? value : value.bind(this)

      this[key] = class extends Component {
        onInit() {
          emitters.push(this.weakUpdate)
          if (!activeComponents) {
            controller.observers.forEach(({ start }) => start())
            controller.onStart()
          }
          activeComponents ++
        }
        onUnmount() {
          emitters.forEach((fn, i) => {
            if (fn === this.weakUpdate) {
              emitters.splice(i, 1)
            }
          })
          activeComponents --
          if (!activeComponents) {
            controller.onEnd()
            controller.observers.forEach(({ stop }) => stop())
          }
        }
        render() {
          const attrs = { ...this.props }
          delete attrs.stylesheet
          return <Gen {...attrs} className={this.className} style={this.style} />
        }
      }
    }, true)

    each(this, (value, key) => {
      if (isObject(value) && value.$$type === 'turner' && value.component && value.collect) {
        const C = value.component
        class G extends Component {
          render() {
            const attrs = { ...this.props }
            delete attrs.stylesheet
            return <C {...attrs} className={this.className} style={this.style} />
          }
        }
        this[key] = this.turn(G, value.collect.bind(this))
      }
    })

    // developers should must extends Controller and overwrite `init` method to initailize
    this.init()
  }

  turn(component, collect) {
    if (!this.update) {
      return {
        $$type: 'turner',
        component,
        collect,
      }
    }

    return evolve(collect)(component)
  }

  observe(observer) {
    if (isInstanceOf(observer, Store)) {
      const subscription = {
        start: () => observer.subscribe(this.update),
        stop: () => observer.unsubscribe(this.update),
      }
      this.observers.push(subscription)
    }
    else if (isInstanceOf(observer, Model)) {
      const subscription = {
        start: () => {
          observer.watch('*', this.update, true)
          observer.watch('!', this.update)
        },
        stop: () => {
          observer.unwatch('*', this.update)
          observer.unwatch('!', this.update)
        },
      }
      this.observers.push(subscription)
    }
    else if (isFunction(observer)) {
      let unsubscribe = null
      const subscription = {
        start: () => {
          unsubscribe = observer(this.update)
        },
        stop: () => {
          if (isFunction(unsubscribe)) {
            unsubscribe(this.update)
            unsubscribe = null
          }
        },
      }
      this.observers.push(subscription)
    }
    else if (isObject(observer)) {
      const { subscribe, unsubscribe } = observer
      const subscription = {
        start: () => subscribe(this.update),
        stop: () => isFunction(unsubscribe) ? unsubscribe(this.update) : null,
      }
      this.observers.push(subscription)
    }
  }

  init() {}
  onStart() {}
  onUpdate() {}
  onEnd() {}
}
