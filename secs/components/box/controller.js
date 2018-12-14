import { Controller } from 'nautil'

export default class BoxController extends Controller {
  onClickItem(observable) {
    return observable.switchMap(item => this.$emit('select', item))
  }
}
