function divisors_of_free_term(term) {
    var resp = [];
    if (term < 0) {
        term = -term;
    }
    for (var i = 1; i <= parseInt(term); i++) {
        if (term % i === 0) {
            resp.push(i);
            resp.push(-i);
        }
    }
    return resp;
}

function solve_by_root(ratio, root) {
    var power = ratio.length - 1;
    var resp = 0;

    for (var i = 0; i <= power; i++) {
        resp = resp + ratio[i] * Math.pow(root, power - i);
    }

    return resp === 0;
}

function solve_roots(ratio, roots) {
    var true_roots = [];
    for (var i = 0; i < roots.length; i++) {
        if (solve_by_root(ratio, roots[i])) {
            true_roots.push(roots[i]);
        }
    }
    return true_roots;
}

function horner_row(ratio, root) {
    var resp = [root];
    if (root === null) {
        resp = resp.concat(ratio);
    } else {
        var p_val = ratio[1];
        resp.push(p_val);
        for (var item = 2; item < ratio.length; item++) {
            p_val = root * p_val + ratio[item];
            resp.push(p_val);
        }
    }
    return resp;
}

function quadratic(ratio) {
    var a = ratio[0];
    var b = ratio[1];
    var c = ratio[2];
    var d = Math.pow(b, 2) - 4 * a * c;
    var x1 = (-b + Math.sqrt(d)) / (2 * a);
    var x2 = (-b - Math.sqrt(d)) / (2 * a);
    return [x1, x2];
}

function horner(ratio) {
    var posible_roots = divisors_of_free_term(ratio[ratio.length - 1]);
    var true_roots = solve_roots(ratio, posible_roots);
    if (true_roots.length === 0) {
        console.log("Данное уравнение не возможно решить теореме Безу т.к. при подстановке делителей свободного члена уравнения в уравнение ни один из вариантов не оказался верен.");
        return [];
    }
    console.log(true_roots);
    var cur_row = horner_row(ratio, null);
    console.log(cur_row);
    var i = 0;
    while (cur_row.length !== 4) {
        cur_row = horner_row(cur_row, true_roots[i]);
        console.log(cur_row);
        cur_row = cur_row.slice(0, -1) || cur_row;
        i += 1;
        if (i === true_roots.length) {
            i = 0;
        }
    }

    var true_roots2 = quadratic(cur_row.slice(1));
    true_roots = true_roots.concat(true_roots2);
    var roots = Array.from(new Set(true_roots));
    roots.sort();
    return roots;
}


// var inp = prompt("Введите (через запятую) список коэфициентов: ").split(",");
// var Eq = inp.map(parseFloat);
// var roots = horner(Eq);
// console.log("Корни уравнения =", roots);
function main() {
    var element1 = document.getElementById("tab-btn-1").value || 0;
    var element2 = document.getElementById("tab-btn-2").value || 0;
    var element3 = document.getElementById("tab-btn-3").value || 0;
    var element4 = document.getElementById("tab-btn-4").value || 0;
    var element5 = document.getElementById("tab-btn-5").value || 0;
    var element6 = document.getElementById("tab-btn-6").value || 0;
    Eq = [element1, element2, element3, element4, element5, element6].map(parseFloat);
    console.log(Eq);
    let n = 0;
    while (Eq[n] === 0) {
        Eq.splice(n, 1);
    }
    console.log(Eq);
    var roots = horner(Eq);
    console.log("Корни уравнения =", roots);
    document.getElementById("Answer").innerHTML = "Корни уравнения = " + roots.join(", ");
}
