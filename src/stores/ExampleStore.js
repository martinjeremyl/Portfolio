import { observable, action } from 'mobx'

class ExampleStore {
  @observable foo = 0;

  @action
  increment () {
    this.foo += 1
  }
}

export default new ExampleStore()
