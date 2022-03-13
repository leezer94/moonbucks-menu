export const PROMPT = Object.freeze({
  RENAME: '수정 하실 메뉴명을 입력해 주세요.',
});
export const ALERT = Object.freeze({
  EMPTY: '메뉴 이름을 입력해 주세요.',
  DUPLICATED: '동일한 메뉴이름이 이미 존재합니다.',
  BLANK: '메뉴 이름에 공백이 포함되어있습니다.',
  SPECIAL_CHARACTER: '메뉴 이름에 특수 문자가 포함되어있습니다.',
  REQUEST_ERROR: '서버와의 통신이 실패하였습니다.',
});

export const CONFIRM = Object.freeze({
  DELETE: '정말 삭제하시겠습니까 ?',
});

export const KEY = Object.freeze({
  ENTER: 'Enter',
});

export const CATEGORIES = Object.freeze({
  ESPRESSO: {
    EMOJI: '☕',
    KR: '에스프레소',
    EN: 'espresso',
  },
  FRAPPUCCINO: {
    EMOJI: '🥤',
    KR: '프라푸치노',
    EN: 'frappuccino',
  },
  BLENDED: {
    EMOJI: '🍹',
    KR: '블렌디드',
    EN: 'blended',
  },
  TEAVANA: {
    EMOJI: '🫖',
    KR: '티바나',
    EN: 'teavana',
  },
  DESERT: {
    EMOJI: '🍰',
    KR: '디저트',
    EN: 'desert',
  },
});

export const LOCALSTORAGE = Object.freeze({
  ITEM: 'cafeMenu',
});

export const MENU = {
  espresso: [],
  frappuccino: [],
  blended: [],
  teavana: [],
  desert: [],
};
