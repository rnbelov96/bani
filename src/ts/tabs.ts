export {};

const tabListEl = document.querySelector('.stages__tab-box');
const tabElList = document.querySelectorAll('.stages__tab');
const stagesListElList = document.querySelectorAll('.stages__list');
const titleListElList = document.querySelectorAll('.stages__list-title');

let currentTab = 0;

tabListEl?.addEventListener('click', e => {
  const clickedEl = (e.target as HTMLParagraphElement) || null;

  if (
    clickedEl.tagName === 'P'
    && !clickedEl.classList.contains('stages__tab_active')
  ) {
    const clickedTabIndex = clickedEl.dataset.tabIndex;
    tabElList[currentTab].classList.remove('stages__tab_active');
    stagesListElList[currentTab].classList.add('visually-hidden');
    titleListElList[currentTab].classList.add('visually-hidden');

    currentTab = Number(clickedTabIndex);
    tabElList[currentTab].classList.add('stages__tab_active');
    stagesListElList[currentTab].classList.remove('visually-hidden');
    titleListElList[currentTab].classList.remove('visually-hidden');
  }
});
