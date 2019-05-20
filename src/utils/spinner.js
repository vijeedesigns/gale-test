import React, { Component } from "react";

export default class Spinner extends Component {
    state = {
        spinnerValue: 1
    };

    setSpinnerValue = event => {
        const spinnerValue = event.target.value;
        this.setState(
            {
                spinnerValue
            },
            () => this.props.onChange(this.state.spinnerValue)
        );
    };

    changeSpinnerValue = (increase = true) => {
        const { spinnerValue } = this.state;
        this.setState(
            {
                spinnerValue: increase
                    ? spinnerValue + 1
                    : spinnerValue < 2
                    ? 1
                    : spinnerValue - 1
            },
            () => this.props.onChange(this.state.spinnerValue)
        );
    };

    render() {
        const { spinnerValue } = this.state;
        return (
            <div className="spinner">
                <div
                    className="spinner-decrease"
                    onClick={() => this.changeSpinnerValue(false)}
                >
                    -
                </div>
                <div className="spinner-field-container">
                    <input
                        type="number"
                        value={spinnerValue}
                        onChange={event => this.setSpinnerValue(event)}
                        className="spinner-field"
                    />
                </div>
                <div
                    className="spinner-increase"
                    onClick={() => this.changeSpinnerValue()}
                >
                    +
                </div>
            </div>
        );
    }
}
