export default class CardStore {
    cards = [];

    /**
     * @param {CreditCardInfo} card 
     * @returns 
     */
    addCard(card) {
        if (!this.cards.find(
            (qc)=>qc.Number === card.Number)
            ) {
            this.cards.push(card);
            return true;
        } else {
            return false;
        }
    }

    getStore() {
        return this.cards;
    }
}