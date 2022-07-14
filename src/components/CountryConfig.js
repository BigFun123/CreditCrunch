import React, { Component } from "react";

/**
 * Configures banned countries
 */
export default class CountryConfig extends Component {
    constructor(props) {
        super(props);
        this.state = { newCountry: "" };
        this.store = this.props.countryCheck;
    }

    /**
     * Adds a new country if it does not exist in the store
     */
    addCountry() {
        let item = this.state.newCountry;
        this.store.addCountry(item);
        this.setState({ newCountry: "" }); //redraw
    }

    deleteCountry(country) {
        this.store.deleteCountry(country);
        this.setState({}); //redraw
    }

    render() {
        return (
            <div>
                <div>Banned Countries</div>
                {
                    this.store.getStore().map((item, index) => (
                        <div className="grid">
                            <div className="delete-button"
                                onClick={(e) => this.deleteCountry(item)}>-</div>
                            <div className="country-item">{item}</div>
                        </div>
                    ))
                }
                <div className="grid">
                    <input className="country-item" onChange={(e) => this.setState({ newCountry: e.target.value })} value={this.state.newCountry}></input>
                    <div className="add-button" onClick={() => { this.addCountry() }}>+</div>
                </div>
            </div>

        )
    }
}