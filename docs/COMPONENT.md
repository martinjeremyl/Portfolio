# Composants

- Ceci représente la structure de base de tout composant dans notre application
- En fonction des cas certains composants auront ou non un state et/ou des props
- Dans le render il faut utiliser le destructuring a bon escient (=> si plus de 1 props)

  
<br>Composant stateless (ces composants comme le suggère leur nom n'ont pas de state, ils peuvent recevoir des props et les afficher)

```js
// @flow

import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { TypeProps } from 'app/types/example.type.js'

class MyComponent extends Component<TypeProps> {
    render() {
        const { exampleProps1, exampleProps2 } = this.props

        return (
            <View>
                <Text>Des props : {exampleProps1} {exampleProps2}</Text>
            </View>
        )
    }
}

export default MyComponent
```

<br>Composant dit "observer" (ici le store mobx est passé dans les props)

```js
// @flow

import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { observer } from 'mobx-react' 
import { TypeProps, TypeState } from 'app/types/example.type.js'

@observer
class MyComponent extends Component<TypeProps, TypeState> {
    state = {
        exampleNumber: 0,
        exampleString: "",
        exampleArray: []
    }

    render() {
        const { exampleNumber, exampleString, exampleArray } = this.state
        const { exampleProps1, exampleProps2 } = this.props.store

        return (
            <View>
                <Text>Des props : {exampleProps1} {exampleProps2}</Text>
                <Text>State du composant {exampleNumber} {exampleString} {exampleArray}</Text>
            </View>
        )
    }
}

export default MyComponent
```
