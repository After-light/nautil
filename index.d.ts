/* eslint-disable no-dupe-class-members */
/* eslint-disable no-unused-vars */

import * as TySheMo from 'tyshemo'
import * as React from 'react'

import type {
  Component as ReactComponent,
  ReactChildren,
  ErrorInfo,
  ReactElement,
  ComponentType,
  ComponentClass,
  FunctionComponent,
  ReactNode,
  ReactChild,
} from 'react'

import { Model } from 'tyshemo'

export { TySheMo, React }

export {
  useState,
  useEffect,
  useContext,
  useReducer,
  useCallback,
  useMemo,
  useRef,
  useLayoutEffect,
  Fragment,
  createElement,
  cloneElement,
  Children,
  createRef,
  isValidElement,
  PureComponent,
  createContext,
  Suspense,
  lazy,
  memo,
  forwardRef,
} from 'react'

export {
  Ty,
  Dict,
  Tupl,

  /**
   * @deprecated
   */
  Tuple,

  List,
  Enum,
  Range,
  Mapping,
  SelfRef,
  Shape,

  ifexist,
  nonable,
  Any,
  None,
  Numeric,
  Int,

  Model,
  Meta,
  Validator,
  Factory,
  AsyncGetter,
  MemoGetter,
  createMeta,

  meta,
  state,
  enhance,
  layoff,
} from 'tyshemo'

export declare function produce<T>(fn: (data: T) => (T | void)): T

export declare class Stream {
  subscribe(subscribe: (value?: any) => void): Function
  dispatch(): void
}

type AnyObj = { [key: string]: any }
type Proxy = AnyObj
interface Constructor<T> {
  new (...args: T[])
}

interface OverrideInfo {
  stylesheet?: string[] | AnyObj[]
  props?: AnyObj
  deprecated?: string[]
}

export type NautilComponent<T = any> = new () => Component<T> // for example Section, Text, Button which are generated by `Section extends Component`
type JSXComponent<T = any> = NautilComponent<T> | ComponentType<T> // all allowed component types
type ComponentGenerator<T = any> = (C: JSXComponent) => NautilComponent<T> | ComponentClass<T>
export type NautilElement = ReactElement | ReactNode | ReactChild | ReactChildren | null | undefined

export declare class Component<P = AnyObj, S = AnyObj> extends ReactComponent<P, S> {
  $state: S
  $attrs: P
  attrs: Readonly<P>

  style: AnyObj
  className: string | undefined
  children: ReactChildren

  css(classNames: string | string[]): string

  hook<T>(getter: () => T): () => T
  hook<T, R>(hook: () => T, getter: (arg: T) => R): () => R
  hook<T, R extends (...args: any[]) => void, G extends (arg: T) => R>(hook: () => T, getter: G): R
  hook(...fns: Function[]): Function

  subscribe(name: string, affect: (stream: Stream) => Stream): this
  unsubscribe(name: string, affect: (stream: Stream) => Stream): this
  dispatch(name: string, data: AnyObj): this

  update(): Promise<void>
  update(force: true): Promise<void>
  update(value: AnyObj): Promise<void>
  update(key: keyof S, value: any): Promise<void>
  update(fn: <K extends keyof S>(state: Pick<S, K>) => (void | Pick<S, K>)): Promise<void>
  weakUpdate(): Promise<void>
  forceUpdate(): Promise<void>
  nextTick(fn: () => void, ...args: any[]): void
  nextTick(delay: number, fn: () => void, ...args: any[]): void

  init(): void
  onInit(): void
  onMounted(): void
  shouldUpdate(nextProps: P, nextState: AnyObj): boolean
  onNotUpdate(nextProps: P, nextState: AnyObj): void
  onUpdated(prevProps: P, prevState: AnyObj): void
  onUnmount(): void
  onCatch(error: ErrorInfo): void
  onParseProps(props: P): AnyObj
  onDigested(): void
  shouldAffect(props: P): any
  onAffect(): void
  onAffected(): void
  /**
   * @deprecated removed, use shouldAffect instead
   */
  detectAffect(): never

  static extend<T>(this: Constructor<T>, override: OverrideInfo | ((nextProps: AnyObj) => OverrideInfo)): Component & T
  static implement<T>(this: Constructor<T>, protos: any): Component & T

  static defaultStylesheet: string[] | AnyObj[]
  static props: AnyObj | (() => AnyObj)
  static css: { [key: string]: AnyObj | string } | ((info: { attrs: AnyObj, style: object | undefined, className: string | undefined }, instance: Component) => { [key: string]: AnyObj | string })
}

export declare function createTwoWayBinding(data: AnyObj, updator?: (value: AnyObj, keyPath: Array<string | symbol>, data: any) => void, formalized?: boolean): Proxy

export declare function isShallowEqual(obj1: any, obj2: any, isEqual: (obj1: any, obj2: any) => boolean): boolean

export declare function isRef(value: any): boolean

export declare function noop(): void

export declare function useTwoWayBinding(props: AnyObj, updator: (value: AnyObj, keyPath: Array<string | symbol>, data: any) => boolean, formalized?: boolean): Proxy

export declare function useTwoWayBindingState(state: AnyObj): Proxy

export declare function useUniqueKeys(items: any[]): string[]

export declare function useModel<T extends Model>(Model: new () => T): T

export declare function useModelReactor<T>(models: Model | Model[], compute: (...args: any[]) => T, ...args: any[]): T

export declare function useController<T extends Controller>(Controller: new () => T): T

export declare function applyController<T extends Controller>(Controller: new () => T): {
  useController: () => T
}

export declare function useService<T extends Service>(Serv: new () => T): T

export declare function useShallowLatest(obj: any): any

export declare function useForceUpdate(): Function

export declare function useDataSource<T, U extends any[]>(source: Source<T, U>, ...params: U): [T, (...args: any[]) => Promise<T>, boolean]

export declare function useLazyDataSource<T, U extends any[]>(source: Source<T, U>, ...params: U): [T, (...args: any[]) => Promise<T>, boolean]

export declare function observe(subscription: string | Function | { subscribe: Function }, unsubscription: string | Function | { unsubscribe: Function }): ComponentGenerator

export declare function evolve(collect: (nextprops: AnyObj) => AnyObj): ComponentGenerator

export declare function inject(prop: string, define: (props: AnyObj) => AnyObj): ComponentGenerator

export declare function pollute(component: NautilComponent, pollute: AnyObj | ((props: AnyObj) => AnyObj)): ComponentGenerator

export declare function decorate(HOC: JSXComponent, fields: string[], renderProp?: string): ComponentGenerator

export declare function initialize<T>(prop: string, Constructor: Constructor<T>, ...args: T[]): ComponentGenerator

export declare function nest(...args: [JSXComponent, AnyObj][]): ComponentGenerator

export declare function pipe(wrappers: ComponentGenerator[]): ComponentGenerator

interface AsyncProps extends AnyObj {
  await: () => Promise<any>
  then?: (data: any) => NautilElement
  cacth?: (error: Error) => NautilElement
  pending?: NautilElement
}
export declare class Async extends Component<AsyncProps> {}

interface ForProps<T = any> extends AnyObj {
  /**
   * from start, contains start
   */
  start: number
  /**
   * to end, contains end
   */
  end: number
  step?: number
  /**
   * map current number to be another value M
   */
  map?: (i: number) => T
  /**
   * function to use M and current number to generate a unique key (string)
   * if it is a string, M should must be an object, unique key will use the prop value of M
   */
  unique?: string | ((data: T, i: number) => string)
  /**
   * @example
   * <For start={1} end={5} render={i => <span>{i}</span>}
   */
  render?:
    | ((i: number) => NautilElement)
    /**
     * @example
     * const data = [
     *   { id, title },
     * ]
     * <For
     *  start={1}
     *  end={10}
     *  map={i => data[i]}
     *  unique="id"
     *  render={(item) => <span>{item.title}</span>}
     * />
     */
    | ((data: T, i?: number, uniqueKey?: string) => NautilElement)
}
export declare class For extends Component<ForProps> {}

interface EachProps<T = any> extends AnyObj {
  of: any[] | AnyObj
  /**
   * map data to be another value M
   */
   map?: (data: any[] | AnyObj) => T[] | AnyObj
   /**
    * function to use item or prop to generate a unique key (string)
    * if it is a string, M should must be an object, unique key will use the prop value of M
    */
   unique?: string | ((value: T, key: number | string) => string)
   /**
    * @example
    * const data = [
    *   { id, title },
    * ]
    * <Each
    *   of={data}
    *   unique={(item, index) => item.id}
    *   render={(item, index, key) => <span key={key}>{item.title}</span>}
    * />
    */
   render?: (value: T, key?: number | string, uniqueKey?: string) => NautilElement
}
export declare class Each extends Component<EachProps> {}

interface IfProps extends AnyObj {
  is: boolean
  render?: () => NautilElement
}
export declare class If extends Component<IfProps> {}

interface ElseProps extends AnyObj {
  render?: () => NautilElement
}
export declare class Else extends Component<ElseProps> {}

export declare class ElseIf extends Component<IfProps> {}

interface ObserverProps extends AnyObj {
  subscribe: (dispatch: Function) => Function | void
  unsubscribe?: (dispatch: Function) => void
  render?: () => NautilElement
}
export declare class Observer extends Component<ObserverProps> {}

interface PrepareProps extends AnyObj {
  ready: Boolean
  pending: NautilElement
  render?: () => NautilElement
}
export declare class Prepare extends Component<PrepareProps> {}

interface StaticProps extends AnyObj {
  shouldUpdate: () => boolean
  render?: () => NautilElement
}
export declare class Static extends Component<StaticProps> {}

interface SwitchProps extends AnyObj {
  of: any
}
export declare class Switch extends Component<SwitchProps> {}

interface CaseProps extends AnyObj {
  is: any
  default?: boolean
  break?: boolean
  render?: () => NautilElement
}
export declare class Case extends Component<CaseProps> {}

type Handler = Function | Stream | Function[]
interface SectionProps extends AnyObj {
  onHit?: Handler
  onHitStart?: Handler
  onHitMove?: Handler
  onHitEnd?: Handler
  onHitCancel?: Handler
  onHitOutside?: Handler
}
export declare class Section extends Component<SectionProps> {}

export declare class Text extends Component {}

interface ButtonProps extends AnyObj {
  type?: string
  onHit?: Handler
  onHitStart?: Handler
  onHitEnd?: Handler
}
export declare class Button extends Component<ButtonProps> {}

interface LineProps extends AnyObj {
  width?: number | `${number}%`
  thick?: number
  color?: string
}
export declare class Line extends Component<LineProps> {}

interface FormProps extends AnyObj {
  onChange?: Handler
  onReset?: Handler
  onSubmit?: Handler
}
export declare class Form extends Component<FormProps> {}

interface SelectProps extends AnyObj {
  options: Array<{
    text: string
    value: any
    disabled?: boolean
  }>
  placeholder?: string
  value?: any
  onChange?: Handler
}
export declare class Select extends Component<SelectProps> {}

interface CheckItemProps extends AnyObj {
  chekced?: boolean
  onChange?: Handler
  onCheck?: Handler
  onUncheck?: Handler
}
export declare class Checkbox extends Component<CheckItemProps> {}
export declare class Radio extends Component<CheckItemProps> {}

interface InputProps extends AnyObj {
  type: 'text' | 'number' | 'email' | 'tel' | 'url'
  placeholder?: string
  value: string | number
  onChange?: Handler
  onFocus?: Handler
  onBlur?: Handler
  onSelect?: Handler
}
export declare class Input extends Component<InputProps> {}

interface TextareaProps extends AnyObj {
  value: string
  line: number
  placeholder?: string
  onChange?: Handler
  onFocus?: Handler
  onBlur?: Handler
  onSelect?: Handler
}
export declare class Textarea extends Component<TextareaProps> {}

interface ImageProps extends AnyObj {
  source: string | { uri: string }
  width: string | number
  height: string | number
  maxWidth?: string | number
  maxHeight?: string | number
  onLoad?: Handler
}
export declare class Image extends Component<ImageProps> {}

export declare class Audio extends Component {}
export declare class Video extends Component {}
export declare class Webview extends Component {}

export declare class ListSection extends Component {}
export declare class ScrollSection extends Component {}
export declare class SwipeSection extends Component {}

export declare class Store {
  constructor(initState?: any)

  state: any
  $state?: AnyObj
  initState(): any

  update(updator: any): void
  update(updator: (prevState: any) => (any | void)): void
  getState(): any
  resetState(): void
  setState(state: AnyObj): void

  subscribe(callback: (next: any, prev: any) => void): void
  unsubscribe(callback: Function): void
}

export declare class Provider extends Component<{ store: Store }> {}

interface ConsumerProps<T = Store> extends AnyObj {
  map?: (store: Store) => T
  watch?: string | string[]
  render?: (data: T | Store) => NautilElement
}
export declare class Consumer extends Component<ConsumerProps> {}

export declare function connect(mapToProps: (store: Store) => AnyObj, watch: string | string[]): ComponentGenerator

export declare function useStore(watch: string | string[]): Store

export declare function applyStore(store: Store): {
  useStore: (watch: string | string[]) => Store,
  connect: (mapToProps: (store: Store) => AnyObj, watch: string | string[]) => ComponentGenerator,
}

export declare function createStream(fn: (stream: Stream) => Stream): Stream

declare class PrimitiveBase {
  init(): void
  destroy(): void

  offer<T>(getter: () => T): T

  new<T extends this>(): T

  static instance<T>(this: Constructor<T>): PrimitiveBase & T
  static implement<T>(this: Constructor<T>, protos: any): PrimitiveBase & T
}

export declare class Service extends PrimitiveBase {
}

export declare class Controller extends PrimitiveBase {
  subscribe(fn: Function): void
  unsubcribe(fn: Function): void

  observe(observer: Store | Model | Function): {
    stop: Function,
  }
}

export declare class View<P = AnyObj, S = AnyObj> extends Component<P, S> {
  reactive(component: JSXComponent | Function, collect?: (nextprops: AnyObj) => AnyObj): NautilComponent
  static Persist<T extends View>(this: Constructor<T>, Cons: (new () => Controller|Store)[]): View & Constructor<T>
}

/**
 * @alias View
 */
export type Container = View

interface Source<T, U> {
  value: T
  params: U
}
interface SourceRunner {
  (): void
  stop(): void
  value: any
}

export declare class DataService extends Service {
  source<T, U extends any[]>(get: (...args: U) => T | Promise<T>, value: T): Source<T, U>
  compose<T, U extends any[]>(get: (...args: U) => T): Source<T, U>
  action<T, U extends any[]>(act: (...args: U) => any | Promise<any>): Source<T, U>

  query<T, U extends any[]>(source: Source<T, U> | string, ...params: U): [T, (...args: any[]) => Promise<T>]
  release(sources: any[] | any): void

  get<T, U extends any[]>(source: Source<T, U> | string, ...params: U): T
  request<T, U extends any[]>(source: Source<T, U> | string, ...params: U): Promise<T>

  subscribe(fn: Function): void
  unsubscribe(fn: Function): void

  setup(run: Function): SourceRunner

  affect(invoke: Function, deps?: any[]): void
  select(compute: Function, deps: any[]): any
  apply<T, U extends any[]>(get: (...args: U) => T | Promise<T>, value: T): [T, (...args: any[]) => Promise<T>]
  ref<T>(value: T): { value: T }

  static source<T, U extends any[]>(get: (...args: U) => T | Promise<T>, value: T): Source<T, U>
  static compose<T, U extends any[]>(get: (...args: U) => T): Source<T, U>
  static action<T, U extends any[]>(act: (...args: U) => any | Promise<any>): Source<T, U>

  static query<T, U extends any[]>(source: Source<T, U> | string, ...params: U): [T, (...args: any[]) => Promise<T>]
  static release(sources: any[] | any): void

  static get<T, U extends any[]>(source: Source<T, U> | string, ...params: U): T
  static request<T, U extends any[]>(source: Source<T, U> | string, ...params: U): Promise<T>

  static setup(run: Function): SourceRunner

  static affect(invoke: Function, deps?: any[]): void
  static select(compute: Function, deps: any[]): any
  static apply<T, U extends any[]>(get: (...args: U) => T | Promise<T>, value: T): [T, (...args: any[]) => Promise<T>]
  static ref<T>(value: T): { value: T }
}

export function isDataSource(source: any): boolean

export declare class QueueService extends Service {
  options(): AnyObj
  push(defer: Function, callback?: Function, fallback?: Function, cancel?: Function): Promise<any>
  stop(err?: Error): this
  clear(): this
  cancel(defer: Function): this
  end(): this
  start(): this
  destroy(): void

  on(type: string, fn: (err: Error) => void): this
  off(type: string, fn: (err: Error) => void): this
}

export declare class SerialQueueService extends QueueService {}
export declare class ParallelQueueService extends QueueService {}
export declare class ShiftQueueService extends QueueService {}
export declare class SwitchQueueService extends QueueService {}

export type RouteOptions = {
  path: string
  component: JSXComponent
  default?: boolean
  exact?: boolean
  params?: {
    [key: string]: true | string
  }
  props?: {
    [key: string]: true | string
  }
} | {
  name: string
  component: JSXComponent
  default?: boolean
  exact?: boolean
  params?: {
    [key: string]: true | string
  }
  props?: {
    [key: string]: true | string
  }
  /**
   * works for Stack.Screen
   */
  screenOptions?: AnyObj
} | {
  path: string
  redirect: string
}

export type RouterOptions = {
  routes: Array<RouteOptions>
  mapping?: BootstrapOptions['router']['mapping']
  /**
   * only works in mobile (web mobile or native mobile),
   * if set 'stack', it will use Staci.Navigator in native
   */
  transition?: 'stack'
  /**
   * works for createStackNavigator
   */
  navigatorOptions?: AnyObj
  /**
   * works for Stack.Navigator
   */
  navigatorProps?: AnyObj
  /**
   * only works in navtive platform, used in nested navigators, make navigate based on this navigators
   */
  baseScreenPath?: string[]
}
export declare class Router {
  constructor(options: RouterOptions)
  Outlet: JSXComponent
}

export declare type Link = FunctionComponent<{
  to: string
  replace: boolean
  open: boolean
  params: AnyObj
} & AnyObj>

export declare function useRouteNavigate(): (target: string, params: AnyObj, type?: boolean | 'replace' | 'open') => void

export declare function useLocation(): {
  pathname: string
  search: string
  hash: string
  query: AnyObj
  url: string
}

export declare function useHistoryListener(listener: (url: string) => void): void

export declare function useRouteParams(): AnyObj

export declare function useRouteMatch(): (pattern: string | RegExp) => boolean

export declare function useRouteLocation(): {
  path: string
  abs: string
  deep: { router: Router, route: RouteOptions, state: any }[]
  params: AnyObj
}

export declare function useRoutePrefetch(): (to: string) => void

export declare function useRouteState(path: string, exact?: boolean): {
  isActive: () => boolean
  setActive: (params?: AnyObj) => void
  setInactive: () => void
}

export declare function Route(props: { path: string, exact?: boolean, render: (params?: AnyObj) => NautilElement }): NautilElement

export declare function createRouteComponent<T = any>(
  path: string,
  create: (context: {
    useInactiveComponent: () => () => void
    useActiveComponent: () => (params?: AnyObj) => void
    useIsComponentActive: () => boolean
    useComponentParams: () => AnyObj
    Link: NautilComponent<{
      replace: boolean
      open: boolean
      params: AnyObj
    } & AnyObj>
  }) => NautilComponent<T>,
  exact?: boolean,
): {
  useInactiveComponent: () => () => void
  useActiveComponent: () => (params?: AnyObj) => void
  useIsComponentActive: () => boolean
  useComponentParams: () => AnyObj
  Link: NautilComponent<{
    replace: boolean
    open: boolean
    params: AnyObj
  } & AnyObj>
  Component: NautilComponent<T>
}

export declare function usePermanentNavigate(): (routeName: string, params: object, replace: boolean) => void

export declare class Storage {
  static getItem(key: string): Promise<any>
  static setItem(key: string, value: any): Promise<undefined>
  static delItem(key: string): Promise<undefined>
  static clear(): Promise<undefined>
}

export declare class I18n {
  constructor(options: {
    resources?: AnyObj,
    language?: string | (new () => LanguageDetector),
  })
  setLang(lang: string): void
  setRes(resources: AnyObj, namespace?: string): void
  on(key: string, fn: Function): void
  off(key: string, fn: Function): Function
  t(key: string | string[], params?: AnyObj): string
  define(define: (t: Function) => AnyObj): AnyObj
  apply(key: string | string[]): string
  getKey(key: string, data: AnyObj): string
  getValue(key: string, data: AnyObj): any
  getLocaleNumber(num: number, options: any): string
  getLocaleDate(date: Date | string | number, options: any): string
  getLocaleCurrency(num: number, currency: string, options: any): string
  getLocaleTimezoneOffset(): number
  getLocaleTimezoneOffsetSTD(): number
  getLocaleDateByUTC(utc: string | Date | number): Date
  getUTCDate(): Date
}

export declare class LanguageDetector {
  static getLang(): string | Promise<string>
}

export declare function useLanguage(): [string, (lng: string) => void]

export declare function useI18n(i18n: I18n, lng?: string): I18n

export declare function useTranslate(i18n: I18n, lng?: string): (key: string | string[], params?: AnyObj) => string

interface IModuleOptions {
  source: () => Promise<{
    default: JSXComponent

    /**
     * support hooks
     */
    navigator?: (props: AnyObj) => {
      title?: string
      path?: string
      params?: AnyObj
    }
    /**
     * support hooks
     */
    context?: (props: AnyObj) => AnyObj
    /**
     * support hooks
     */
    ready?: (props: AnyObj) => boolean
  }>
  pending?: () => NautilElement
  prefetch?: (props: any) => string[]
  /**
   * whether to use module's navigator
   */
  navigator?: boolean
  /**
   * provide shared value for useModuleContext
   */
  context?: AnyObj,
}
export declare function importModule(options: IModuleOptions): JSXComponent

export declare function createAsyncComponent(fn: () => Promise<{ default: JSXComponent }>): JSXComponent

interface BootstrapOptions {
  router: {
    mode: string
    mapping?: {
      /**
       * only string supported in web,
       * only string[] supported in native
       */
      [name: string]: string | string[]
    }
    /**
     * only works in native platform, whether to use NavigationContainer to wrap in bootstrap,
     * if you set false, you should must import { NavigationContainer } from 'react-nativation' to wrap your application
     */
     ignoreNavigationContainer?: boolean
     /**
      * only works in navtive platform, used in nested navigators, make navigate based on this navigators
      */
     rootScreenPath?: string[]
     /**
      * works for NavigationContainer
      */
     navigationContainerProps?: AnyObj
  }
  i18n: {
    lang: string | AnyObj
  }
  context?: AnyObj
}
export declare function createBootstrap(options: BootstrapOptions): (C: JSXComponent) => JSXComponent

interface AnimationProps {
  show: boolean
  enter: string
  leave: string
  loop?: boolean
  onEnterStart?: Handler
  onEnterUpdate?: Handler
  onEnterStop?: Handler
  onLeaveStart?: Handler
  onLeaveUpdate?: Handler
  onLeaveStop?: Handler
}
export declare class Animation extends Component<AnimationProps> {}

interface INavigator {
  title: string
  path: string
  params?: AnyObj
}
export declare function useModuleNavigator(): INavigator[]

export declare function useModuleI18n(): I18n

export declare function useModuleParams(): AnyObj
