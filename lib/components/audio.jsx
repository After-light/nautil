import Component from '../core/component.js'
import { enumerate } from '../core/types.js'
import { noop } from '../core/utils.js'

export class Audio extends Component {
  static validateProps = {
    source: enumerate(String, Object),
    width: Number,
    height: Number,

    onPlay: Function,
    onPause: Function,
    onStop: Function,
    onDrag: Function,
    onResume: Function,
    onReset: Function,
    onReload: Function,
    onLoad: Function,
    onTick: Function,
    onVolume: Function,
  }
  static defaultProps = {
    width: Infinity,
    height: 30,

    onPlay: noop,
    onPause: noop,
    onStop: noop,
    onDrag: noop,
    onResume: noop,
    onReload: noop,
    onLoad: noop,
    onTick: noop,
    onVolume: noop,
  }
}
export default Audio
