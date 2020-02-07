const kanren = require('../src/mykanren');
const Var = kanren.Var;
const run = kanren.run;
const unifyo = kanren.unifyo;
const trueo = kanren.trueo;
const falseo = kanren.falseo;




describe('testing mykanren.js', () => {

    it('unifyo works as expected', () => {
        
        const x = new Var('x');
        const y = new Var('y');
        const r1 = new Map();
        r1.set(x, 1);

        const results1 = run(x, [
            unifyo(x, 1)
        ]);
        expect(results1).toEqual([r1]);

        const results2 = run(x, [
            unifyo(1, x)
        ]);
        expect(results2).toEqual([r1]);

        const results3 = run(x, [
            unifyo(1, x),
            unifyo(x, 2)
        ]);
        expect(results3).toEqual([new Map()]);

        const results4 = run(x, [
            unifyo(x, y),
            unifyo(y, 1)
        ]);
        expect(results4).toEqual([r1]);

    });


});