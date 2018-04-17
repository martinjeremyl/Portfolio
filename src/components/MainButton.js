import React, { Component } from 'react'

class MainButton extends Component {
    render() {
        const { modifiers, value } = this.props
        return (
            <button
                style={{
                    backgroundColor: '#ff6b6b',
                    borderRadius: 10,
                    borderColor: '#ff6b6b',
                    width: 200,
                }}
                className={`btn btn-primary ${modifiers}`} {...this.props}>
                {value}
            </button>
        )
    }
}

MainButton.defaultProps = {
    value: ''
}

export default MainButton
