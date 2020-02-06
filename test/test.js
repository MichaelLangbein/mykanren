const chai = require('chai');
const expect = chai.expect;
const kanren = require('../src/mykanren');
const run = kanren.run;
const unifyo = kanren.unifyo;


describe('testing mykanren.js', () => {
    it('unifyo works as expected', () => {
        
        const results1 = run('x', [
            unifyo('x', 1)
        ]);
        expect(results1).to.eql([{key: 'x', val: 1}]);

        const results2 = run('x', [
            unifyo(1, 'x')
        ]);
        expect(results2).to.eql([{key: 'x', val: 1}]);

    });
});