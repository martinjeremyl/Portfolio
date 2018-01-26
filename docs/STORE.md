# Store

Les stores sont les fichiers dans lesquels on manipulera les données.
Les attributs que l'on souhaite observer (dont la mofication entrainera un re-render) seront précédés de l'annotation `@observer`<br>
L'annotation `@computed` sera utilisée pour précéder les getters<br>
L'annotation `@action` précède les méthodes modifiant les attributs observés<br>

```js
// @flow
import { observable, action, computed } from 'mobx'
import { someType, anotherType } from 'app/types/example.type'

class MyStore {
    @observable myArray: someType = []
    @observable someNumber: anotherType = 0

    @computed get myGetter() {
        return this.myArray
    }

    @action myAction() {
        this.someNumber++
    }
}

export default new MyStore()

```