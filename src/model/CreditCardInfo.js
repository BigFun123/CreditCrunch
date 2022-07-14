
export default class CreditCardInfo {
    Number;
    Name;
    Expiry;
    CVC;
    constructor(inNumber, inName, inExpiry, inCVC ) {
        this.Number = inNumber;
        this.Name = inName;
        this.Expiry = inExpiry;
        this.CVC = inCVC;
    }
}