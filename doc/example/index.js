const Timeline = window.timeline;

const mainContent = document.querySelector('.main-content');
const mainBtn = document.querySelector('.main-btn');
const section1 = document.querySelector('.section-1');
const section2 = document.querySelector('.section-2');
const section3 = document.querySelector('.section-3');

const timeline1 = new Timeline()
  .add({
    handler: () => {
      mainContent.setAttribute('style', 'background-color: rgba(0, 0, 0, .5)');
    },
    wait: 1200,
  })
  .add({
    handler: () => {
      section1.classList.add('fade-in');
    },
  })
  .add({
    handler: () => {
      mainBtn.classList.remove('main-btn--hidden');
    },
    wait: 1000,
  })
  .action({
    actionName: 'click1',
    handler: () => {
      mainContent.classList.add('step-1');
      section1.classList.add('fade-out');
    },
    wait: 1000,
  })
  .callback(() => {
    console.info('skr: callback');
  })
  .run();

function next() {
  console.info('skr: click next');
  timeline1.trigger('click1');
}

mainBtn.addEventListener('click', () => next());
