const kanren = require('../src/mykanren');
const Variable = kanren.Variable;
const run = kanren.run;
const unifyo = kanren.unifyo;
const trueo = kanren.trueo;
const falseo = kanren.falseo;




describe('testing mykanren.js', () => {

    it('unifyo works as expected', () => {
        
        const x = new Variable('x');
        const y = new Variable('y');

        const results1 = run(x, [
            unifyo(x, 1)
        ]);
        expect(results1).toEqual([1]);

        const results2 = run(x, [
            unifyo(1, x)
        ]);
        expect(results2).toEqual([1]);

        const results3 = run(x, [
            unifyo(1, x),
            unifyo(x, 2)
        ]);
        expect(results3).toEqual([]);

        const results4 = run(x, [
            unifyo(x, y),
            unifyo(y, 1)
        ]);
        expect(results4).toEqual([1]);

    });


});