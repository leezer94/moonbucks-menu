import { PROMPT } from '../../common/constants/constants.js';
import Component from '../../core/Component.js';

export class MenuList extends Component {
  constructor(...rest) {
    super(...rest);
  }

  template() {
    const { menu } = this.props;

    const items = Object.keys(menu).map((num) => menu[num].name);

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
      const { menu } = this.props;
      const { handlesoldOutBtn, handleDeleteBtn, handleUpdateBtn, props } =
        this;
      const item = target.closest('li').children[0];
      let id;

      menu.map((target) => {
        if (target.name === item.textContent) id = target.id;
      });

      if (target.classList.contains('menu-sold-out-button')) {
        handlesoldOutBtn(props, id);
      }

      if (target.classList.contains('menu-edit-button')) {
        const editedName = window.prompt(PROMPT.RENAME);

        handleUpdateBtn(props, id, editedName);
      }

      if (target.classList.contains('menu-remove-button')) {
        const confirmation = window.confirm('정말 삭제하시겠습니까 ?');

        if (confirmation) handleDeleteBtn(props, id);
      }
    });
  }

  handleDeleteBtn(state, id) {
    const { onClickDelete } = state;

    onClickDelete(id);
  }

  handlesoldOutBtn(state, id) {
    const { onClickSoldOut } = state;

    onClickSoldOut(id);
  }

  handleUpdateBtn(state, id, editedName) {
    const { onClickEdit } = state;

    onClickEdit(id, editedName);
  }
}
