import Component from '../core/component.js'
import { enumerate, Handler } from '../core/types.js'
import { noop } from '../core/utils.js'

export class Webview extends Component {
  static props = {
    source: enumerate([ String, Object ]),
    width: Number,
    height: Number,

    onLoad: Handler,
    onReload: Handler,
    onResize: Handler,
    onScroll: Handler,
    onMessage: Handler,
  }
  static defaultProps = {
    width: Infinity,
    height: Infinity,

    onLoad: noop,
    onReload: noop,
    onResize: noop,
    onScroll: noop,
    onMessage: noop,
  }
}
export default Webview
