import Component from '../../core/Component.js';

export class MenuList extends Component {
  constructor(...rest) {
    super(...rest);
  }

  template() {
    const { menu, currentCategory } = this.props;

    const items = menu[currentCategory];

    return `
    ${items
      .map((item, index) => {
        return `
        <li  data-name-id=${index} class="menu-list-item d-flex items-center py-2" >
          <span class="w-100 pl-2 menu-name" >${item}</span>
          <button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button">
          품절
          </button>
          <button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button">
          수정
          </button>
          <button type="button" class="bg-gray-50 text-gray-500 text-sm menu-remove-button">
          삭제
          </button>
        </li>
      `;
      })
      .join('')}
    `;
  }

  componentDidMount() {
    this.$target.addEventListener('click', ({ target }) => {
      if (target.tagName !== 'BUTTON') return;

      if (target.classList.contains('menu-sold-out-button')) {
        const item = target.closest('li').children[0];

        item.classList.toggle('sold-out');
      }

      if (target.classList.contains('menu-edit-button')) {
        const editedName = window.prompt('수정 하실 메뉴명을 입력해 주세요.');

        this.handleMenuItem(this.props, target, editedName);
      }

      if (target.classList.contains('menu-remove-button')) {
        this.handleMenuItem(this.props, target);
      }
    });
  }

  handleMenuItem(state, target, editedName) {
    const { menu, currentCategory, onClickBtn } = state;
    const item = target.closest('li').children[0].textContent;

    onClickBtn(target, menu, currentCategory, item, editedName);
  }

  deleteMenuItem() {}
}
