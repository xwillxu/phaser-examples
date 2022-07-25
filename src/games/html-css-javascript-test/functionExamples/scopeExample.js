// CASE 1: Works

const x = 1;

function a() {
    const y = 2;
    output(y);
}

function b() {
    const z = 3;
    output(z);
}

function output(value) {
    const para = document.createElement('p');
    document.body.appendChild(para);
    para.textContent = `Value: ${value}`;
}

output(x)
a()
b()

// CASE 2: Works

const w = 1;

function a() {
    const s = 2;
    output(w);
}

function b() {
    const d = 3;
    output(w);
}

function output(value) {
    const para = document.createElement('p');
    document.body.appendChild(para);
    para.textContent = `Value: ${value}`;
}

output(x)
a()
b()

// CASE 3: ERROR

const arrowUp = 1;

function a() {
    const arrowRight = 2;
    output(arrowLeft);
}

function b() {
    const arrowLeft = 3;
    output(arrowRight);
}

function output(value) {
    const para = document.createElement('p');
    document.body.appendChild(para);
    para.textContent = `Value: ${value}`;
}

output(x)
a()
b()