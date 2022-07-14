export default class CountryCheck {
    banned = ["aruba", "jamaica", "bermuda", "bahamas"];

    getStore() {
        return this.banned;
    }

    addCountry(country) {
        country = this.normalizeCountry(country);
        if (country && this.banned.indexOf(country) === -1) {
            this.banned.push(this.normalizeCountry(country));
        }
    }

    deleteCountry(country) {
        country = this.normalizeCountry(country);
        this.banned.splice(this.banned.indexOf(country), 1);
    }

    /**
     * returns true if the country is banned
     */
    isBanned(country) {
        country = this.normalizeCountry(country);
        const isBanned = this.banned.indexOf(country);
        return isBanned > -1;
    }

    normalizeCountry(country) {
        country = !country ? "" : country; //check if string is defined and not null
        country = country.trim().toLowerCase();
        return country;
    }
}