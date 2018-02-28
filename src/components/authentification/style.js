import { StyleSheet } from 'react-native'

export const backgroundColorButton = '#C2285B'

export const placeholderTextColor = 'grey'

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#303030',
    alignItems: 'stretch',
    paddingHorizontal: 20
  },
  field: {
    flex: 1,
    margin: 2,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  textInput: {
    flex: 2,
    marginHorizontal: 10,
    paddingLeft: 10,
    paddingVertical: 10,
    color: 'white'
  },
  buttons: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'space-around',
    margin: 10
  },
  label: {
    flex: 1,
    color: 'white'
  },
  button: {
    flex: 1
  },
  error: {
    color: '#f00',
    textAlign: 'right',
    marginRight: 30
  },
  logo: {
    flex: 2,
    resizeMode: 'contain'
  },
  avatar: {
    width: 100,
    height: 100,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 50
  }
})
