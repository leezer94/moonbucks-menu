import { CATEGORIES } from '../common/constants/constants.js';
import Component from '../core/Component.js';

export class Nav extends Component {
  constructor(...rest) {
    super(...rest);
  }

  template() {
    return `
      <a href="#" class="text-black">
         <h1 class="text-center font-bold">🌝 문벅스 메뉴 관리</h1>
      </a>
      <nav class="d-flex justify-center flex-wrap">
         <button
            data-category-name="espresso"
            class="cafe-category-name btn bg-white shadow mx-1"
         >
            ☕ ${CATEGORIES.ESPRESSO.KR}
         </button>
         <button
            data-category-name="frappuccino"
            class="cafe-category-name btn bg-white shadow mx-1"
         >
            🥤 ${CATEGORIES.FRAPPUCCINO.KR}
         </button>
         <button
            data-category-name="blended"
            class="cafe-category-name btn bg-white shadow mx-1"
         >
            🍹 ${CATEGORIES.BLENDED.KR}
         </button>
         <button
            data-category-name="teavana"
            class="cafe-category-name btn bg-white shadow mx-1"
         >
            🫖 ${CATEGORIES.TEAVANA.KR}
         </button>
         <button
            data-category-name="desert"
            class="cafe-category-name btn bg-white shadow mx-1"
         >
            🍰 ${CATEGORIES.DESERT.KR}
         </button>
      </nav>
     `;
  }

  componentDidMount() {
    this.$target.addEventListener('click', ({ target }) => {
      if (!target.classList.contains('btn')) return;
      this.handleCurrentCategory(target);
    });
  }

  handleCurrentCategory(target) {
    const { currentCategory } = this.props;

    currentCategory(target);
  }
}
