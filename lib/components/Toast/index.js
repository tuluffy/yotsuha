import React from 'react';
import MaskContainer from '../Mask';
import './index.css';

class BaseStruct extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {time, close} = this.props;

    this.timer = setTimeout(() => {
      close();
    }, time)
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
    delete this.timer;
  }

  render() {
    const {text} = this.props;

    return (
      <MaskContainer>
        <div className="toast-container">
          <div className='theme'>{text}</div>
        </div>
      </MaskContainer>
    )
  }
}

function HOC(WrappedComponent) {
  return class extends WrappedComponent {
    constructor(props) {
      super(props);
    }

    componentDidMount() {
    }

    render() {
      const {show} = this.props;

      if (!!show) {
        super.componentDidMount();
        return super.render();
      } else {
        super.componentWillUnmount();
        return null;
      }

    }
  }
}

const Toast = HOC(BaseStruct);

export default Toast;