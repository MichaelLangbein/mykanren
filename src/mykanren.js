/**
 * *G: a goal. 
 * *o: a relation. 
 * 
 */


function isVar(x) {
    return typeof x === 'string';
}

function findInSubsts(vrbl, substs) {
    for (const frame of substs) {
        if (frame.key == vrbl) {
            return frame.val;
        }
    }
}

function walk(variable, substs) {
    const value = findInSubsts(variable, substs);
    if (!value) { // variable not found: return fresh variable.
        return variable;
    } else if (isVar(value)) { // value itself a variable: recurse.
        return walk(value, substs);
    } else {
        return value;
    }
}

function trueG(substs) {
    return substs;
}

function falseG(substs) {
    return false;
}

function unifyG(a, b, substs) {
    var a = walk(a, substs);
    var b = walk(b, substs);
    if (a == b) {
        return substs;
    } else if (isVar(a)) {
        substs.push({key: a, val: b});
        return substs;
    } else if (isVar(b)) {
        substs.push({key: a, val: b});
        return substs;
    } else {
        return false;
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

function run(variable, goals) {
    let subs = [];
    for (let goal of goals) {
        subs = goal(subs);
    }
    return subs;
}


module.exports = {
    trueo, falseo, unifyo, run
};