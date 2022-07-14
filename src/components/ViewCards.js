import React, { Component } from "react";

/**
 * View list of captured cards
 */
export default class ViewCards extends Component {
    constructor(props) {
        super(props);
        this.cardStore = this.props.cardStore.getStore();
    }

    render() {
        return (
            <div>
                <div>Captured Cards </div>
                {
                    this.cardStore.map((card, index) => (
                        <div className="grid">
                            <div>{card.Number} | {card.Name} | {card.Expiry} | {card.CVC}</div>
                        </div>
                    ))
                }
            </div>
        )
    }
}