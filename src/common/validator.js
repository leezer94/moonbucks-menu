import { $ } from './DOM.js';
import { getLocalStorage } from './localStorage.js';

export const isValidMenuName = (state) => {
  const input = $('#menu-name');
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  const store = getLocalStorage('cafeMenu');
  const { currentCategory } = state;

  if (!input.value) {
    return '메뉴 이름을 입력해 주세요.';
  }
  if (input.value.includes(' ')) {
    return '메뉴 이름에 공백이 포함되어있습니다.';
  }
  if (specialChars.test(input.value)) {
    return '메뉴 이름에 특수 문자가 포함되어있습니다.';
  }

  if (store[currentCategory].includes(input.value)) {
    return '동일한 메뉴이름이 이미 존재합니다.';
  }
};

export const alertMessage = (errorMessage) => {
  let isValid = false;

  if (errorMessage) {
    window.alert(errorMessage);

    isValid;
  } else {
    isValid = true;
  }

  return isValid;
};
