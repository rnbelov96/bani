/* eslint-disable no-param-reassign */
export {};

const animationNameList = ['zoomIn', 'fadeIn', 'backInDown'];
const animationNumber = 2;

const openedModalList: Element[] = [];

const modalFormInfoList = [
  {
    title: 'Получите ответы на вопросы у эксперта',
    button: 'Заказать звонок',
  },
  {
    title: 'Оставьте заявку и получите бизнес-план и презентацию франшизы',
    button: 'Получить',
  },
  {
    title: 'Подождите, проект действительно может вас заинтересовать. Примите решение после общения с экспертом',
    button: 'Заказать консультацию',
  },
];

const closeModal = (modalEl: HTMLDivElement) => {
  modalEl.style.opacity = '0';
  modalEl.style.overflowY = 'inherit';
  modalEl.style.pointerEvents = 'none';
  document.body.style.overflowY = 'auto';
  document.body.style.paddingRight = '0px';
  modalEl.children[0].classList.remove(`animate__${animationNameList[animationNumber]}`);
};

const openModal = (modalEl: HTMLDivElement) => {
  if (window.innerWidth > document.body.clientWidth) {
    document.body.style.paddingRight = `${window.innerWidth - document.body.clientWidth}px`;
  }
  modalEl.style.opacity = '1';
  modalEl.style.overflowY = 'auto';
  modalEl.style.pointerEvents = 'auto';
  document.body.style.overflowY = 'hidden';
  modalEl.children[0].classList.add(`animate__${animationNameList[animationNumber]}`);
};

const modalElList = document.querySelectorAll('.modal');
const [formModalEl, policyModalEl, youtubeModalEl] = modalElList;

// Для каждого модального видео создать 2 таких переменных
const youtubeModalWrapperEl = youtubeModalEl?.querySelector(
  '.modal__center-wrapper',
) as HTMLDivElement;
let isYoutubeModalOpened = false;

const formTitleEl = formModalEl.querySelector('.js-modal-form-title') as HTMLSpanElement;
const formBtnEl = formModalEl.querySelector('.js-modal-form-btn') as HTMLButtonElement;
const formBtnHidden = formModalEl.querySelector('.js-modal-btn-hidden') as HTMLInputElement;
const formTitleHidden = formModalEl.querySelector('.js-modal-title-hidden') as HTMLInputElement;

const modalWrapperElList = document.querySelectorAll('.modal__center-wrapper');
modalElList.forEach(modalEl => {
  modalEl.addEventListener('click', (e: Event) => {
    if (e.target === e.currentTarget || [...modalWrapperElList].includes(e.target as Element)) {
      const clickedModal = e.currentTarget as HTMLDivElement;
      // Если модальных видео несколько, проверить каждое
      if (clickedModal === youtubeModalEl) {
        const iframe = clickedModal.querySelector('iframe');
        if (iframe) {
          const iframeSrc = iframe.src;
          iframe.src = iframeSrc;
        }
      }
      closeModal(clickedModal);
    }
  });
});

const closeModalElList = document.querySelectorAll('.modal__close');
closeModalElList.forEach(closeEl => {
  closeEl.addEventListener('click', () => {
    closeModal(openedModalList[0] as HTMLDivElement);
    openedModalList.shift();
  });
});

// Найти кнопки и прописать события
const policyBtnElList = document.querySelectorAll('.js-policy');
policyBtnElList.forEach(el => {
  el.addEventListener('click', () => {
    openedModalList.unshift(policyModalEl);
    openModal(policyModalEl as HTMLDivElement);
  });
});

const callbackBtnElList = document.querySelectorAll('.js-callback');
callbackBtnElList.forEach(btn => {
  btn.addEventListener('click', () => {
    openedModalList.unshift(formModalEl);
    formTitleEl.textContent = modalFormInfoList[0].title;
    formBtnEl.textContent = modalFormInfoList[0].button;
    formBtnHidden.value = modalFormInfoList[0].title;
    formTitleHidden.value = modalFormInfoList[0].button;
    openModal(formModalEl as HTMLDivElement);
  });
});

const presentBtnElList = document.querySelectorAll('.js-present');
presentBtnElList.forEach(btn => {
  btn.addEventListener('click', () => {
    openedModalList.unshift(formModalEl);
    formTitleEl.textContent = modalFormInfoList[1].title;
    formBtnEl.textContent = modalFormInfoList[1].button;
    formBtnHidden.value = modalFormInfoList[1].title;
    formTitleHidden.value = modalFormInfoList[1].button;
    openModal(formModalEl as HTMLDivElement);
  });
});

let isLeaveModalOpened = false;

document.addEventListener('mouseleave', e => {
  if (e.clientY < 10 && !isLeaveModalOpened) {
    if (formTitleEl && formBtnEl && formBtnHidden && formTitleHidden) {
      isLeaveModalOpened = true;
      openedModalList.unshift(formModalEl);
      formTitleEl.innerHTML = modalFormInfoList[2].title;
      formBtnEl.textContent = modalFormInfoList[2].button;
      formBtnHidden.value = modalFormInfoList[2].button;
      formTitleHidden.value = modalFormInfoList[2].title;
      openModal(formModalEl as HTMLDivElement);
    }
  }
});

// Для каждого модального окна с видео прописать такой обработчик
const youtubeBtnCallEl = document.querySelector('.js-youtube');
youtubeBtnCallEl?.addEventListener('click', () => {
  if (!isYoutubeModalOpened) {
    isYoutubeModalOpened = true;
    youtubeModalWrapperEl.innerHTML = `
      <iframe
        class="modal__video"
        width="1520"
        height="855"
        src="https://www.youtube.com/embed/2OEL4P1Rz04"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    `;
  }
  openedModalList.unshift(youtubeModalEl);
  openModal(youtubeModalEl as HTMLDivElement);
});
