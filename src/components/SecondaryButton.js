import React, { Component } from 'react'

class SecondaryButton extends Component {
    render() {
        const { modifiers, value } = this.props
        return (
            <button
                style={{
                    backgroundColor: '#48dbfb',
                    borderRadius: 10,
                    borderColor: '#48dbfb',
                    width: 200,
                }}
                className={`btn btn-secondary ${modifiers}`} {...this.props}>
                {value}
            </button>
        )
    }
}

SecondaryButton.defaultProps = {
    value: ''
}

export default SecondaryButton
