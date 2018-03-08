import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Modal from 'react-native-modal'
import { ModalButtonComponent } from './ModalButtonComponent'

export class ModalComponent extends Component {
  render () {
    const {
      isModalVisible,
      onCancel,
      onConfirm,
      message,
      confirmLabel,
      closeModal
    } = this.props

    return (
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={closeModal}
      >
        <View style={styles.container}>
          <Text>{message}</Text>
          <View style={styles.buttonContainer}>
            <ModalButtonComponent
              label='Annuler'
              onPress={onCancel}
            />
            <ModalButtonComponent
              label={confirmLabel}
              onPress={onConfirm}
            />
          </View>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    maxHeight: 300,
    paddingTop: 22,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'rgba(0, 0, 0, 0.1)'
  },
  buttonContainer: {
    flex: 1,
    maxHeight: 50,
    flexDirection: 'row'
  }
})
