import { PureComponent } from 'react';
import ReactDOM from 'react-dom';

type Props = {
  children: any
};

export default class VPPortal extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    document.body.appendChild(this.el);
  }

  componentWillUnmount() {
    document.body.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}
