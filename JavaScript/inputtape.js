let inTape = [];
let inHead = 0;
let inView = 0;

let outTape = [];
let outHead = 0;
let outView = 0;

const $ = s => document.querySelector(s);

function isInt(s){
  return /^-?\d+$/.test(String(s).trim())
}

function renderTape(which){

  let root =
    which === 'in'
      ? $('#inputTape')
      : $('#outputTape');

  let view =
    which === 'in'
      ? inView
      : outView;

  let head =
    which === 'in'
      ? inHead
      : outHead;

  let arr =
    which === 'in'
      ? inTape
      : outTape;

  let cells = root.querySelector('.tapeCells');

  cells.innerHTML = '';

  for(let i=view; i<view+5; i++){

    let div = document.createElement('div');

    div.className =
      'tcell ' + (which==='out' ? 'output' : '');

    div.innerHTML =
      `<span class="idx">${i+1}</span>` +

      (
        which === 'in'

        ? `<input
              data-tapein="${i}"
              value="${arr[i] ?? ''}"
           >`

        : `<b style="line-height:44px">
              ${arr[i] ?? ''}
           </b>`
      );

    cells.appendChild(div);
  }

  let pos = 95 + (head - view) * 79 + 38;

  root.querySelector('.head').style.left =
    Math.max(
      105,
      Math.min(root.clientWidth - 60, pos)
    ) + 'px';
}

document.body.addEventListener('input', e => {

  if(e.target.dataset.tapein !== undefined){

    let i = +e.target.dataset.tapein;

    let v = e.target.value.trim();

    if(v === '' || isInt(v)){

      inTape[i] = v;

      console.log('Taśma wejściowa zapisana.');

    }else{

      e.target.value = inTape[i] ?? '';

      console.log(
        'Do taśmy wejściowej wpisuj tylko liczby całkowite.'
      );
    }
  }
});

function hold(btn, fn){

  let id;

  btn.onmousedown =
  btn.ontouchstart = e => {

    e.preventDefault();

    fn();

    id = setInterval(fn, 120);
  };

  [
    'mouseup',
    'mouseleave',
    'touchend'
  ].forEach(ev =>
    btn.addEventListener(ev,
      () => clearInterval(id)
    )
  );
}

document
  .querySelectorAll('[data-tape]')
  .forEach(b =>

    hold(b, () => {

      let t = b.dataset.tape;

      let act = b.dataset.act;

      if(t === 'in'){

        if(act === 'home')
          inView = 0;

        if(act === 'left')
          inView = Math.max(0, inView - 1);

        if(act === 'right')
          inView++;

        renderTape('in');
      } else {

        if(act === 'home')
          outView = 0;

        if(act === 'left')
          outView = Math.max(0, outView - 1);

        if(act === 'right')
          outView++;

        renderTape('out');
      }
    })
  );

function READ(address){

  if(
    inTape[inHead] === undefined ||
    inTape[inHead] === ''
  ){
    throw 'Pusta komórka taśmy wejściowej.';
  }

  if(!isInt(inTape[inHead])){
    throw 'Taśma wejściowa przyjmuje tylko liczby całkowite.';
  }

  mem.set(address, +inTape[inHead]);

  inHead++;

  if(inHead >= inView + 5)
    inView = inHead;

  renderTape('in');
}

function WRITE(value){
  outTape[outHead] = value;
  outHead++;

  if(outHead >= outView + 5)
    outView = outHead;

  renderTape('out');
}

renderTape('in');
renderTape('out');