let memory = { 0: 0 }; // m(0) to akumulator [cite: 301]
let inputPtr = 0;
let outputTape = [];
let pc = 0; // Program Counter
let instructions = [];
let labels = {};

function resetMachine() {
    memory = { 0: 0 };
    inputPtr = 0;
    outputTape = [];
    pc = 0;
    document.getElementById('outputTape').innerText = "";
    document.getElementById('status').innerText = "Status: Zresetowano";
    updateUI();
}

function parseCode() {
    const code = document.getElementById('codeEditor').value;
    const lines = code.split('\n');
    instructions = [];
    labels = {};

    lines.forEach((line, index) => {
        line = line.split(';')[0].trim(); // Usuwanie komentarzy [cite: 134]
        if (!line) return;

        const parts = line.split(/\s+/);
        let label = null, op = "", arg = "";

        if (parts[0].endsWith(':')) {
            label = parts[0].slice(0, -1);
            labels[label] = instructions.length;
            op = parts[1];
            arg = parts[2];
        } else {
            op = parts[0];
            arg = parts[1];
        }
        instructions.push({ op: op.toUpperCase(), arg, originalLine: index });
    });
}

function getValue(arg) {
    if (arg.startsWith('=')) return parseInt(arg.slice(1)); // =X 
    if (arg.startsWith('^')) { // ^X (adresowanie pośrednie) 
        let addr = parseInt(arg.slice(1));
        let pointer = memory[addr] || 0;
        return memory[pointer] || 0;
    }
    return memory[parseInt(arg)] || 0; // X (adresowanie bezpośrednie) 
}

function setMemory(addrArg, val) {
    let addr;
    if (addrArg.startsWith('^')) {
        let ptr = parseInt(addrArg.slice(1));
        addr = memory[ptr] || 0;
    } else {
        addr = parseInt(addrArg);
    }
    memory[addr] = val;
}

function stepProgram() {
    if (pc === 0) parseCode();
    if (pc >= instructions.length) return;

    const instr = instructions[pc];
    const status = document.getElementById('status');
    pc++;

    switch (instr.op) {
        case 'LOAD': memory[0] = getValue(instr.arg); break;
        case 'STORE': setMemory(instr.arg, memory[0]); break;
        case 'ADD': memory[0] += getValue(instr.arg); break;
        case 'SUB': memory[0] -= getValue(instr.arg); break;
        case 'MULT': memory[0] *= getValue(instr.arg); break;
        case 'DIV': memory[0] = Math.floor(memory[0] / getValue(instr.arg)); break;
        case 'READ': 
            let inputs = document.getElementById('inputTape').value.split(/\s+/);
            if (inputPtr < inputs.length) {
                setMemory(instr.arg, parseInt(inputs[inputPtr++]));
            } else {
                status.innerText = "Błąd: Brak danych na taśmie!";
                return;
            }
            break;
        case 'WRITE': 
            outputTape.push(getValue(instr.arg)); 
            break;
        case 'JUMP': pc = labels[instr.arg]; break;
        case 'JGTZ': if (memory[0] > 0) pc = labels[instr.arg]; break;
        case 'JZERO': if (memory[0] === 0) pc = labels[instr.arg]; break;
        case 'HALT': pc = instructions.length; break;
    }

    updateUI();
}

function runProgram() {
    resetMachine();
    parseCode();
    let safetyCounter = 0;
    while (pc < instructions.length && safetyCounter < 10000) {
        stepProgram();
        safetyCounter++;
    }
}

function updateUI() {
    document.getElementById('outputTape').innerText = outputTape.join(", ");
    const tbody = document.querySelector('#memoryTable tbody');
    tbody.innerHTML = "";
    Object.keys(memory).sort((a,b) => a-b).forEach(addr => {
        let row = `<tr><td>${addr}</td><td>${memory[addr]}</td></tr>`;
        tbody.innerHTML += row;
    });
}
