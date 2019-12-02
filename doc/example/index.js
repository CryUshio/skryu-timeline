const Timeline = window.timeline;

const mainContent = document.querySelector('.main-content');
const section1 = document.querySelector('.section-1');
const section1Btn = document.querySelector('.section-1 .section-btn');
const section2 = document.querySelector('.section-2');
const section3 = document.querySelector('.section-3');
const section3Btn = document.querySelector('.section-3 button.section-btn');

const timeline1 = new Timeline();
const timeline2 = new Timeline();

const click1 = () => {
  console.info('skr: click1');
  timeline1.trigger('click1');
};
const click2 = () => {
  console.info('skr: click2');
  timeline1.trigger('click2');
};
const click3 = () => {
  console.info('skr: click3');
  timeline1.trigger('click3');
};

timeline2
  .add({
    handler: () => {
      section3.classList.add('fade-out');
      mainContent.setAttribute('style', '');
    },
    wait: 1000,
  })
  .add({
    handler: () => {
      mainContent.className = 'main-content';
      section1.className = 'main-section section-1';
      section2.className = 'main-section section-2';
      section3.className = 'main-section section-3';
    },
  })
  .callback(() => {
    console.info('skr: timeline2 reset timeline1');
    timeline1.reset().run();
    timeline2.reset();
  });

timeline1
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
    wait: 1000,
  })
  .add({
    handler: () => {
      section1Btn.addEventListener('click', click1);
      section1Btn.classList.add('show');
    },
    wait: 1000,
  })
  .action({
    actionName: 'click1',
    handler: () => {
      section1Btn.removeEventListener('click', click1);
      section1Btn.classList.remove('show');
      mainContent.classList.add('step-1');
      section1.classList.add('fade-out');
    },
    wait: 1000,
  })
  .callback(() => {
    console.info('skr: callback');
  })
  .add({
    handler: () => {
      section2.classList.add('fade-in');
    },
    wait: 1000,
  })
  .add({
    handler: () => {
      section2.addEventListener('click', click2);
    },
  })
  .action({
    actionName: 'click2',
    handler: () => {
      section2.classList.add('fade-out-1');
    },
    wait: 1500,
  })
  .action({
    actionName: 'click2',
    handler: () => {
      section2.removeEventListener('click', click2);
      section2.classList.add('fade-out-2');
    },
    wait: 1000,
  })
  .add({
    handler: () => {
      section3.classList.add('fade-in');
    },
    wait: 1000,
  })
  .add({
    handler: () => {
      section3Btn.addEventListener('click', click3);
    },
  })
  .action({
    actionName: 'click3',
    handler: () => {
      section3Btn.removeEventListener('click', click3);
      timeline2.run();
    },
  })
  .callback(() => {
    console.info('The end.');
  })
  .run();
