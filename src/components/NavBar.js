import { Component } from "react";

export const ENTRY = "Entry";
export const MANAGE = "Manage";
export const VIEW = "View";
export const DEBUG = "Debug";

/**
 * Simple navigation bar / menu
 * Pages: Entry, Manage, View
 */
export default class NavBar extends Component {
    setPage(page) {
        this.props.setPage(page);
    }

    render() {
        return (
            <div>
                <div className="menu-item" onClick={() => this.setPage(ENTRY)}>Enter Credit Card</div>
                <div className="menu-item" onClick={() => this.setPage(MANAGE)}>Manage Countries</div>
                <div className="menu-item" onClick={() => this.setPage(VIEW)}>View Captured Cards</div>
                <div className="menu-item" onClick={() => this.setPage(DEBUG)}>Dummy Data</div>
            </div>
        )
    }
}