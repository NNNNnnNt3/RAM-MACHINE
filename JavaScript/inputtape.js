  const cells = document.querySelectorAll('#inputTape .cell');
  let activeIndex = 1;
  
  function updateActive() {
    cells.forEach((cell, idx) => {
      if (idx === activeIndex) {
        cell.classList.add('active');
      } else {
        cell.classList.remove('active');
      }
    });
  }
  
  function moveLeft() {
    if (activeIndex > 0) {
      activeIndex--;
      updateActive();
    }
  }
  
  function moveRight() {
    if (activeIndex < cells.length - 1) {
      activeIndex++;
      updateActive();
    }
  }
  
  function moveHome() {
    activeIndex = 0;
    updateActive();
  }
  
  document.querySelector('[data-act="left"]').addEventListener('click', moveLeft);
  document.querySelector('[data-act="right"]').addEventListener('click', moveRight);
  document.querySelector('[data-act="home"]').addEventListener('click', moveHome);
  
  updateActive();
