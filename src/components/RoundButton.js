import React, { Component } from 'react'
import { StyleSheet, View, TouchableHighlight } from 'react-native'

export class RoundButton extends Component {
  render () {
    return (
      <TouchableHighlight {...this.props} style={styles.container} underlayColor='white'>
        <View style={styles.button}>
          {this.props.children}
        </View>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    width: 50,
    height: 50,
    marginTop: -12.5
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#C24363'
  }
})
