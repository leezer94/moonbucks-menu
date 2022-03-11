import Component from './core/Component.js';
import { $ } from './common/DOM.js';
import { Nav } from './components/Nav.js';
import { Main } from './components/Main.js';
import { setLocalStroage, getLocalStorage } from './common/localStorage.js';
import { MENU } from './common/constants/constants.js';
import { MenuList } from './components/Main/MenuList.js';

export default class App extends Component {
  constructor(...rest) {
    super(...rest);
  }

  async initialState() {
    this.initialLocalStorage();

    this.setState({
      currentCategory: 'espresso',
      categoryName: '☕ 에스프레소',
      menu: getLocalStorage('cafeMenu'),
    });
  }

  initialLocalStorage() {
    const store = getLocalStorage('cafeMenu');
    if (!store) setLocalStroage('cafeMenu', MENU);
  }

  template() {
    return `
     <div class="d-flex justify-center mt-5 w-100">
         <div class="w-100">
            <header class="my-4"></header>
            <main class="main-container mt-10 d-flex justify-center"></main>
         </div>
     </div>
     `;
  }

  componentDidMount() {
    const { handleCategory, handleMenuItems, handleMenuList, handleMenuBtn } =
      this;

    new Nav($('header'), {
      currentCategory: handleCategory.bind(this),
      categoryName: handleCategory.bind(this),
    });

    new Main($('main'), {
      ...this.state,
      addItems: handleMenuItems.bind(this),
    });

    new MenuList($('ul'), {
      ...this.state,
      appendItems: handleMenuList.bind(this),
      onClickBtn: handleMenuBtn.bind(this),
    });
  }

  handleCategory(target) {
    const currentTarget = target.dataset.categoryName;

    this.setState({
      ...this.state,
      currentCategory: currentTarget,
      categoryName: target.textContent.trim(),
    });
  }

  handleMenuItems(state, item) {
    const { menu, currentCategory } = state;

    menu[currentCategory].push(item);

    this.setState({
      ...this.state,
    });

    setLocalStroage('cafeMenu', menu);
  }

  handleMenuList() {
    this.setState({
      ...this.state,
    });
  }

  handleMenuBtn(target, menu, currentCategory, itemToedit, editedName) {
    const array = menu[currentCategory];

    if (target.classList.contains('menu-remove-button')) {
      array.splice(array.indexOf(itemToedit), 1);
    } else if (target.classList.contains('menu-edit-button')) {
      array.splice(array.indexOf(itemToedit), 1, editedName);
    }

    this.setState({
      ...this.state,
    });

    setLocalStroage('cafeMenu', menu);
  }
}
