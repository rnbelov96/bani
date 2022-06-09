/* eslint-disable no-param-reassign */
export {};

const leftColor = '#729d39';
const rightColor = '#dee6ee';

const firmEndpointsEl = document.querySelector(
  '.js-firm-endpoints',
) as HTMLDivElement;
const firmEndpointEl = document.querySelector(
  '.js-firm-endpoint',
) as HTMLDivElement;
const terrEndpointEl = document.querySelector(
  '.js-terr-endpoint',
) as HTMLDivElement;
const terrEndpointsEl = document.querySelector(
  '.js-terr-endpoints',
) as HTMLDivElement;

const rangeElList = document.querySelectorAll('.js-range');

const firmRange = document.querySelector('.js-firm-range') as HTMLInputElement;
const terrRange = document.querySelector('.js-terr-range') as HTMLInputElement;

const resultLabelElList = document.querySelectorAll('.js-calc-result');

let result: number;

let firmCurrentStep = 2;
let terrCurrentStep = 3;

const calcResult = () => {
  result = Math.round(
    (Number(firmRange.value) * 236875 + Number(terrRange.value) * 320000) *
      0.157,
  );
  resultLabelElList.forEach(resultLabelEl => {
    resultLabelEl.textContent = result.toLocaleString();
  });
  return result;
};

calcResult();

rangeElList.forEach(el => {
  const rangeEl = el as HTMLInputElement;

  const steps =
    (Number(rangeEl.max) - Number(rangeEl.min)) / Number(rangeEl.step);

  const currentStep =
    (Number(rangeEl.value) - Number(rangeEl.min)) / Number(rangeEl.step);

  rangeEl.style.background = `linear-gradient(to right, ${leftColor} 0%, ${leftColor} ${String(
    (currentStep / steps) * 100,
  )}%, ${rightColor} ${String(
    (currentStep / steps) * 100,
  )}%, ${rightColor} 100%)`;

  firmEndpointsEl.style.left = `${firmCurrentStep * 33.3}%`;
  firmEndpointsEl.style.transform = `translateX(-${firmCurrentStep * 33.3}%)`;
  firmEndpointEl.textContent = String(firmCurrentStep + 1);

  terrEndpointsEl.style.left = `${terrCurrentStep * 20}%`;
  terrEndpointsEl.style.transform = `translateX(-${terrCurrentStep * 20}%)`;
  terrEndpointEl.textContent = String(terrCurrentStep + 1);
});

firmRange.addEventListener('input', e => {
  const rangeEl = e.currentTarget as HTMLInputElement;

  const steps =
    (Number(rangeEl.max) - Number(rangeEl.min)) / Number(rangeEl.step);

  firmCurrentStep =
    (Number(rangeEl.value) - Number(rangeEl.min)) / Number(rangeEl.step);

  firmEndpointsEl.style.left = `${firmCurrentStep * 33.3}%`;
  firmEndpointsEl.style.transform = `translateX(-${firmCurrentStep * 33.3}%)`;
  firmEndpointEl.textContent = String(firmCurrentStep + 1);

  rangeEl.style.background = `linear-gradient(to right, ${leftColor} 0%, ${leftColor} ${String(
    (firmCurrentStep / steps) * 100,
  )}%, ${rightColor} ${String(
    (firmCurrentStep / steps) * 100,
  )}%, ${rightColor} 100%)`;

  calcResult();
});

terrRange.addEventListener('input', e => {
  const rangeEl = e.currentTarget as HTMLInputElement;

  const steps =
    (Number(rangeEl.max) - Number(rangeEl.min)) / Number(rangeEl.step);

  terrCurrentStep =
    (Number(rangeEl.value) - Number(rangeEl.min)) / Number(rangeEl.step);

  terrEndpointsEl.style.left = `${terrCurrentStep * 20}%`;
  terrEndpointsEl.style.transform = `translateX(-${terrCurrentStep * 20}%)`;
  terrEndpointEl.textContent = String(terrCurrentStep + 1);

  rangeEl.style.background = `linear-gradient(to right, ${leftColor} 0%, ${leftColor} ${String(
    (terrCurrentStep / steps) * 100,
  )}%, ${rightColor} ${String(
    (terrCurrentStep / steps) * 100,
  )}%, ${rightColor} 100%)`;

  calcResult();
});
