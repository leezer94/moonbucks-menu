export default class Component {
  $target;
  state;
  props;
  constructor($target, props) {
    this.$target = $target;
    this.props = props;

    this.initialState();
  }

  async initialState() {
    this.render();
  }

  setState(newState) {
    this.state = newState;

    this.render();

    console.log('setState', this.state);
  }

  template() {
    return ``;
  }

  render() {
    this.$target.innerHTML = this.template();
    this.componentDidMount();
  }

  componentDidMount() {}
}
