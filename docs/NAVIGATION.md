# Navigation

Pour la navigation on utilise la librairie [React Native Router Flux](https://github.com/aksonov/react-native-router-flux) basée sur [React Navigation](https://reactnavigation.org/docs/intro/).
Il ne faut pas hésiter a switcher d'une documentation à l'autre pour comprendre le fonctionnement

## Le fichier src/router.js

Dans ce fichier on viens enregistrer les écrans ou portions d'écran entre lesquelles on pourra naviguer.

```jsx
import Screen1 from "~/components/Screen1";
import Screen2 from "~/components/Screen2";
import Screen3 from "~/components/Screen3";

export default () => (
  <Router>
    <Stack key="root">
      <Scene key="screen1" component={Screen1} title="Screen1" />
      <Scene key="screen2" component={Screen2} title="Screen2" />
      <Scene key="screen3" component={Screen3} title="Screen3" />
    </Stack>
  </Router>
);
```

## Un composant permettant la navigation

```jsx
import React, { Component } from "react";
import { View, Button } from "react-native";
import { Actions } from "react-native-router-flux";

class ExampleComponent extends Component {
  render() {
    return (
      <View>
        <Button
          title="Aller a l'écran 2"
          onPress={() => {
            Actions.screen2();
          }}
        />
      </View>
    );
  }
}

export default ExampleComponent;
```
