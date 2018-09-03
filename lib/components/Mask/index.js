import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const modalRoot = document.getElementById('mask-root');

export default class MaskContainer extends React.Component {
  constructor(props) {
    super(props);

    this.el = document.createElement('div');
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(
      <div className='mask-container'>
        {
          this.props.children
        }
      </div>,
      this.el,
    );
  }
}