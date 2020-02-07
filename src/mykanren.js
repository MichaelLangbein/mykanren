/**
 * Variables:
 *  - a variable is *fresh* when it has no association.
 * 
 * Substitutions:
 *  - a substitution is a frame: [{x: 1, y: 'v', z: x}]
 * 
 * Goals: (functions ending in 'G')
 *  - a goal is a function nameG: subs -> subs[] 
 *    That is a function that maps one substitution to a stream of zero or more substitutions.
 * 
 * Relations: (functions ending in 'o')
 *  - a relation is a function that takes 0 or more variables and returns a goal:
 */

 class Var {
     constructor(name) {
         this.name = name;
     }
     inspect () {
         return `var ${this.name}`;
     }
 }

function isVar(x) {
    return x instanceof Var;
}

function walk(variable, sub) {
    const value = sub.get(variable);
    if (!value) { // variable not found: return fresh variable.
        return variable;
    } else if (isVar(value)) { // value itself a variable: recurse.
        return walk(value, sub);
    } else {
        return value;
    }
}

function* trueG(sub) {
    yield sub;
}

function* falseG(sub) {
    yield new Map();
}

function* unifyG(a, b, sub) {
    if (isVar(a)) a = walk(a, sub);
    if (isVar(b)) b = walk(b, sub);
    if (a == b) {
        yield sub;
    } else if (isVar(a)) {
        sub.set(a, b);
        yield sub;
    } else if (isVar(b)) {
        sub.set(b, a);
        yield sub;
    } else {
        yield new Map();
    }
}

function trueo() {
    return (subs) => {
        return trueG(subs);
    }
}

function falseo() {
    return (subs) => {
        return falseG(subs);
    }
}

function unifyo(a, b) {
    return (subs) => {
        return unifyG(a, b, subs);
    }
}

function* doRun(goals, sub) {
    const goal1 = goals[0];
    const restGoals = goals.slice(1);
    for (const newsub of goal1(sub)) {
        if (restGoals.length > 0) {
            for (const newnewsubst of doRun(restGoals, newsub)) {
                yield newnewsubst;
            }
        } else {
            yield newsub;
        }
    }
}

function* reify(variable, subs) {
    for (const sub of subs) {
        const value = walk(variable, sub);
        const newSub = new Map();
        if (!isVar(value)) {
            newSub.set(variable, value);
        }
        yield newSub;
    }
}

function take(n, generator) {
    const out = [];
    let i = 0;
    for (const val of generator) {
        out.push(val);
        i++;
        if (n > 0 && i > n) break;
    }
    return out;
}

function runN(n, x, goals) {
    let sub = new Map();
    const subs = doRun(goals, sub);
    const results = reify(x, subs);
    return take(n, results);
}

function run(x, goals) {
    return runN(0, x, goals);
}


module.exports = {
    Var, trueo, falseo, unifyo, runN, run
};