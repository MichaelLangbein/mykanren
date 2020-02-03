const chai = require('chai');
const expect = chai.expect;
const add = require('../src/main').add;
const subtract = require('../src/main').subtract;


describe('testing main.js', () => {
    it('adding works as expected', () => {
        const sum = add(1, 2);
        expect(sum).to.equal(3);
    });

    it('subtraction works as expected', () => {
        const difference = subtract(3, 2);
        expect(difference).to.equal(1);
    });
});