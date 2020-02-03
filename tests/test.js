const chai = require('chai');
const expect = chai.expect;
const add = require('../src/main').add;


describe('testing main.js', () => {
    it('adding works as expected', () => {
        const sum = add(1, 2);
        expect(sum).to.equal(3);
    });
});