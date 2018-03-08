import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export class ModalButtonComponent extends Component {
  render () {
    const { onPress, label } = this.props

    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.button}>
          <Text>{label}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    backgroundColor: 'hotpink',
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'rgba(0, 0, 0, 0.1)'
  }
})
