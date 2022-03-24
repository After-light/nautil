import { Component } from './component.js'
import { createContext, useContext, useMemo } from 'react'
import { RouterRootProvider, useRouteLocation } from '../router/router.jsx'
import { I18nProvider } from '../i18n/i18n.jsx'
import { Ty, ifexist } from 'tyshemo'
import { useShallowLatest } from '../hooks/shallow-latest.js'

const bootstrapperContext = createContext()
export function createBootstrap(options) {
  const { router, i18n } = options
  return function(C) {
    return function Bootstrapper(props) {
      const parent = useContext(bootstrapperContext)
      if (parent) {
        throw new Error('You should must use createBootstrap for your root application component only once.')
      }

      const { Provider } = bootstrapperContext
      return (
        <Provider value={true}>
          <RouterRootProvider value={router}>
            <I18nProvider value={i18n}>
              <C {...props} />
            </I18nProvider>
          </RouterRootProvider>
        </Provider>
      )
    }
  }
}

export function importAsyncComponent(options) {
  const { prefetch, source, pending } = options

  let loadedComponent = null

  class ModuleComponent extends Component {
    state = {
      component: loadedComponent,
    }

    prefetchLinks = []

    componentDidMount() {
      if (!loadedComponent) {
        // 拉取组件
        source(this.props)
          .then((mod) => {
            if (mod[Symbol.toStringTag] === 'Module') {
              return mod.default
            }
            return mod
          })
          .then((component) => {
            if (typeof component === 'function') {
              this.setState({ component })
            }
            loadedComponent = component
          })
        // 预加载
        if (prefetch) {
          const urls = prefetch(this.props)
          urls.forEach((url) => {
            const link = document.createElement('link')
            link.rel = 'prefetch'
            link.as = 'fetch'
            link.href = url
            document.head.appendChild(link)
            this.prefetchLinks.push(link)
          })
        }
      }
    }

    componentWillUnmount() {
      if (this.prefetchLinks.length) {
        this.prefetchLinks.forEach((link) => {
          document.head.removeChild(link)
        })
      }
    }

    render() {
      if (!this.state.component && !pending) {
        return null
      }

      if (!this.state.component && pending) {
        return pending(this.props)
      }

      const LoadedComponent = this.state.component

      return <LoadedComponent {...this.props} />
    }
  }

  return ModuleComponent
}

export function createAsyncComponent(source) {
  return importAsyncComponent({ source })
}

const navigatorContext = createContext([])

export function importModule(options) {
  const { prefetch, source, pending, name } = options

  let loadedComponent = null
  let loadedNavigator = null

  class ModuleComponent extends Component {
    state = {
      component: loadedComponent,
      navigator: loadedNavigator,
    }

    prefetchLinks = []

    __init() {
      if (name) {
        this.name = name
      }
    }

    componentDidMount() {
      if (!loadedComponent) {
        // 拉取组件
        Promise.resolve(source(this.props))
          .then((mod) => {
            const { default: component, navigator } = mod
            loadedComponent = component
            loadedNavigator = navigator
            this.setState({ component, navigator })
          })
        // 预加载
        if (prefetch && document) {
          const urls = prefetch(this.props)
          urls.forEach((url) => {
            const link = document.createElement('link')
            link.rel = 'prefetch'
            link.as = 'fetch'
            link.href = url
            document.head.appendChild(link)
            this.prefetchLinks.push(link)
          })
        }
      }
    }

    componentWillUnmount() {
      if (this.prefetchLinks.length && document) {
        this.prefetchLinks.forEach((link) => {
          document.head.removeChild(link)
        })
      }
    }

    Final = () => {
      const previousNaivgators = useContext(navigatorContext)
      const previous = useShallowLatest(previousNaivgators)
      const { navigator: useNavigator, component } = this.state
      const { abs } = useRouteLocation()
      const navigator = useNavigator ? useNavigator(this.props) : {}
      const nav = useShallowLatest(navigator)
      const navi = useMemo(() => {
        if (!nav.path) {
          return {
            ...nav,
            path: abs,
          }
        }
        return nav
      }, [nav, abs])
      const navigators = useMemo(() => [...previous, navi], [navi, previous])

      if (!component && !pending) {
        return null
      }

      if (!component && pending) {
        return pending(this.props)
      }

      const { Provider } = navigatorContext
      const LoadedComponent = component

      return (
        <Provider value={navigators}>
          <LoadedComponent {...this.props} />
        </Provider>
      )
    }

    render() {
      const { navigator, component } = this.state
      if (!component) {
        return null
      }

      const { Final } = this
      return <Final />
    }
  }

  return ModuleComponent
}

export function useModuleNavigator() {
  const navigators = useContext(navigatorContext)
  if (process.env.NODE_ENV !== 'production') {
    Ty.expect(navigators).to.be([{
      title: ifexist(String),
      path: String,
    }])
  }
  return navigators
}
