import React, { Component } from "react";
import Payment from "payment";
import Cards from "react-credit-cards";
import 'react-credit-cards/es/styles-compiled.css';
import CreditCardInfo from "../model/CreditCardInfo";

/**
 * Credit Card input processor, 
 * with pretty credit card that changes according to number
 * with cc number and country validation
 */
export default class CreditInput extends Component {
    constructor(props) {
        super(props);
        this.state = { number: "", name: "", expiry: "", cvc: "", focus: "", error: "", message: "" };
        this.countryCheck = this.props.countryCheck;
    }

    componentDidMount() {
        Payment.formatCardNumber(this.getCardInput());
    }

    validateCard(e) {
        e.preventDefault();
        this.setState({ error: "" });
        var valid = Payment.fns.validateCardNumber(this.state.number);

        if (!valid) {
            this.showError("Please enter a valid credit card number");
            return false;
        }

        valid = Payment.fns.validateCardCVC(this.state.cvc);
        if (!valid) {
            this.showError("Please enter a valid CVC number");
            return false;
        }

        //check if card is banned
        var banned = this.countryCheck.isBanned(this.getCountryInput().value);
        if (banned) {
            this.showError("This service is not available in your country");
            return false;
        }

        if (this.state.number && this.state.name && this.state.expiry && this.state.cvc && this.state.country) {
            this.storeCard();
        } else {
            this.showMessage("Please enter all the required information");
        }
    }

    storeCard() {
        let card = new CreditCardInfo(this.state.number, this.state.name, this.state.expiry, this.state.cvc);
        if (this.props.cardStore.addCard(card)) {
            this.showMessage("Successfully captured card");
            setTimeout(() => {
                this.clear();
            }, 1000);
        } else {
            this.showError("Already captured");
        }
    }

    clear() {
        this.setState({ number: "", name: "", expiry: "", cvc: "", focus: "", error: "", message: "" });
    }

    showMessage(message) {
        this.setState({ message: message });
    }

    showError(message) {
        this.setState({ error: message });
    }

    getCountryInput() {
        return document.getElementById('country');
    }

    getCardInput() {
        return document.getElementById('cc-num');
    }

    render() {
        return (
            <div className="card-container">
                <Cards
                    number={this.state.number}
                    name={this.state.name}
                    expiry={this.state.expiry}
                    cvc={this.state.cvc}
                    focused={this.state.focus}
                />
                <form autoComplete="on">
                    <input required type='tel' id="cc-num" name="number" placeholder="Card number"
                        value={this.state.number}
                        onChange={e => this.setState({ number: e.target.value })}
                        onFocus={e => this.setState({ focus: e.target.name })}></input>
                    <input required type='text' name="name" placeholder="Name"
                        value={this.state.name}
                        onChange={e => this.setState({ name: e.target.value })}
                        onFocus={e => this.setState({ focus: e.target.name })}
                    ></input>
                    <input required type='text' name="expiry" placeholder="MM/YY"
                        value={this.state.expiry}
                        onChange={e => this.setState({ expiry: e.target.value })}
                        onFocus={e => this.setState({ focus: e.target.name })}
                    ></input>
                    <input required type='tel' name="cvc" placeholder="cvc"
                        value={this.state.cvc}
                        onChange={e => this.setState({ cvc: e.target.value })}
                        onFocus={e => this.setState({ focus: e.target.name })}
                    ></input>
                    <input required type='text' id="country" name="country" placeholder="Country"
                        value={this.state.country}
                        onChange={e => this.setState({ country: e.target.value })}
                        onFocus={e => this.setState({ focus: e.target.name })}
                    ></input>
                    <button className="button" onClick={(e) => this.validateCard(e)}>Submit</button>
                    {this.state.error && <label className="error">{this.state.error}</label>}
                    {this.state.message && <label className="success">{this.state.message}</label>}
                </form>
            </div>
        )
    }
}