import { KEY } from '../common/constants/constants.js';
import { $ } from '../common/DOM.js';
import Component from '../core/Component.js';

export class Main extends Component {
  constructor(...rest) {
    super(...rest);
  }

  template() {
    const { categoryName, currentCategory, menu } = this.props;
    const items = Object.keys(menu).map((num) => menu[num]);

    const categoryMenu = categoryName.slice(2, categoryName.length);
    const count = items.length;

    return `
    <div class="wrapper bg-white p-10">
      <div class="heading d-flex justify-between">
        <h2 id="category-title" class="mt-1">
          ${categoryName} 메뉴 관리
        </h2>
        <span class="mr-2 mt-4 menu-count">총 ${count}개</span>
      </div>
      <form id="menu-form">
        <div class="d-flex w-100">
          <label for="menu-name" class="input-label" hidden>
            ${categoryMenu} 메뉴 이름
          </label>
          <input
            type="text"
            id="menu-name"
            name="menuName"
            class="input-field"
            placeholder="메뉴 이름"
            autocomplete="off"
          />
          <button
            data-category-name=${currentCategory}
            type="button"
            name="submit"
            id="menu-submit-button"
            class="input-submit bg-green-600 ml-2"
          >
            확인
          </button>
        </div>
      </form>
      <ul
        data-category-name=${currentCategory}
        id="menu-list"
        class="mt-3 pl-0"
      ></ul>
    </div>
     `;
  }

  componentDidMount() {
    const { addItemsToStore } = this;
    const input = $('#menu-name');

    $('form').addEventListener('submit', (e) => {
      e.preventDefault();
    });

    $('input').addEventListener('keypress', ({ key }) => {
      if (key !== KEY.ENTER) return;

      addItemsToStore(this.props, input.value);
    });

    this.$target.addEventListener('click', ({ target }) => {
      if (target.id !== 'menu-submit-button') return;

      addItemsToStore(this.props, input.value);
    });
  }

  addItemsToStore(props, item) {
    const { addItems } = props;

    addItems(item);
  }
}
