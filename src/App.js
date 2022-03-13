import Component from './core/Component.js';
import { $ } from './common/DOM.js';
import { Nav } from './components/Nav.js';
import { Main } from './components/Main.js';
import { MenuList } from './components/Main/MenuList.js';
import { menuApi } from './common/api/api.js';

export default class App extends Component {
  constructor(...rest) {
    super(...rest);
  }

  async initialState() {
    this.setState({
      ...this.props,
      categoryName: '☕ 에스프레소',
    });
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
    const {
      handleCategory,
      handleMenuItems,
      handleMenuList,
      handleUpdatebtn,
      handleSoldOutBtn,
      handleDeleteBtn,
    } = this;

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
      onClickEdit: handleUpdatebtn.bind(this),
      onClickSoldOut: handleSoldOutBtn.bind(this),
      onClickDelete: handleDeleteBtn.bind(this),
    });
  }

  async handleCategory(target) {
    const currentTarget = target.dataset.categoryName;

    const store = await menuApi.getMenuListByCategory(currentTarget);

    this.setState({
      ...this.state,
      currentCategory: currentTarget,
      categoryName: target.textContent.trim(),
      menu: store,
    });
  }

  async handleMenuList() {
    const { currentCategory } = this.props;

    const store = await menuApi.getMenuListByCategory(currentCategory);

    this.setState({
      ...this.state,
      menu: store,
    });
  }

  async handleMenuItems(item) {
    const { currentCategory } = this.state;

    await menuApi.addItem(currentCategory, item);

    const store = await menuApi.getMenuListByCategory(currentCategory);

    this.setState({
      ...this.state,
      menu: store,
    });
  }

  async handleSoldOutBtn(id) {
    const { currentCategory } = this.state;

    await menuApi.toggleSoldOut(currentCategory, id);

    const store = await menuApi.getMenuListByCategory(currentCategory);

    this.setState({
      ...this.state,
      menu: store,
    });
  }

  async handleUpdatebtn(id, editedName) {
    const { currentCategory } = this.state;

    await menuApi.editMenuItem(currentCategory, id, editedName);

    const store = await menuApi.getMenuListByCategory(currentCategory);

    this.setState({
      ...this.state,
      menu: store,
    });
  }

  async handleDeleteBtn(id) {
    const { currentCategory } = this.state;

    await menuApi.deleteItem(currentCategory, id);

    const store = await menuApi.getMenuListByCategory(currentCategory);

    this.setState({
      ...this.state,
      menu: store,
    });
  }
}

// 체크리스트

// - [] 웹 서버를 띄운다
// - [] 서버에 새로운 메뉴가 추가될 수 있게 요청한다.
// - [] 카테고리별 메뉴 리스트 불러오기
// - [] 서버에 저장되어있는 메뉴가 수정될 수 있도록 요청한다.
// - [] 서버에 메뉴가 토글 될 수 있도록 요청한다.
// - [] 서버에 메뉴가 삭제 될 수 있도록 요청한다.

// 리팩토링
// - [] localStroage에 저장하는 로직은 지운다.

// TODO 사용자 경험
//
