const program = [
    { op: 'LOAD', arg: 10 },
    { op: 'ADD', arg: 5 },
    { op: 'STORE', arg: 2 },
    { op: 'HALT', arg: null }
];

let state = { pc: 0, acc: 0, mem: Array(20).fill(0) };

// Inicjalizacja widoku
function init() {
    const memGrid = document.getElementById('memory-grid');
    state.mem.forEach((val, i) => {
        memGrid.innerHTML += `<div class="cell" id="mem-${i}">M[${i}]<br><span>${val}</span></div>`;
    });
    
    const progView = document.getElementById('program-view');
    program.forEach((line, i) => {
        progView.innerHTML += `<div class="line" id="line-${i}">${i}: ${line.op} ${line.arg || ''}</div>`;
    });
}

async function animateValue(fromId, toId, value) {
    const fromEl = document.querySelector(fromId);
    const toEl = document.querySelector(toId);
    const rectFrom = fromEl.getBoundingClientRect();
    const rectTo = toEl.getBoundingClientRect();

    const flyer = document.createElement('div');
    flyer.className = 'flying-data';
    flyer.innerText = value;
    flyer.style.left = rectFrom.left + 'px';
    flyer.style.top = rectFrom.top + 'px';
    document.body.appendChild(flyer);

    // Wymuszenie reflow dla animacji
    flyer.offsetWidth; 

    flyer.style.left = rectTo.left + 'px';
    flyer.style.top = rectTo.top + 'px';

    return new Promise(resolve => {
        setTimeout(() => {
            flyer.remove();
            resolve();
        }, 600);
    });
}

async function step() {
    if (state.pc >= program.length) return;

    const line = program[state.pc];
    
    // UI: Podświetl linię
    document.querySelectorAll('.line').forEach(el => el.classList.remove('active'));
    document.getElementById(`line-${state.pc}`).classList.add('active');
    
    document.getElementById('ui-instr').innerText = line.op;
    document.getElementById('ui-arg').innerText = line.arg;

    if (line.op === 'LOAD') {
        state.acc = line.arg; // uproszczenie: ładujemy literał
        await animateValue(`#line-${state.pc}`, '#ui-acc', state.acc);
    } 
    else if (line.op === 'ADD') {
        state.acc += line.arg;
        await animateValue(`#line-${state.pc}`, '#ui-acc', `+${line.arg}`);
    }
    else if (line.op === 'STORE') {
        state.mem[line.arg] = state.acc;
        await animateValue('#ui-acc', `#mem-${line.arg}`, state.acc);
        document.querySelector(`#mem-${line.arg} span`).innerText = state.acc;
    }

    document.getElementById('ui-acc').innerText = `ACC: ${state.acc}`;
    state.pc++;
}

init();