import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

export default class Dialog extends React.Component {

}

// toast
class Toast extends React.Component {
  constructor(props) {
    super(props);

    this.timer = null;

    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    const {time} = this.props;

    this.timer = setTimeout(() => {
      this.closeModal();
    }, time)
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer)
    delete this.timer
  }

  // 关闭弹窗
  closeModal(){
    const div = document.getElementById('toast');

    // 卸载真实DOM
    document.body.removeChild(div);

    // 卸载虚拟DOM（如果不卸载虚拟DOM，不会触发Component.componentWillUnmount）
    ReactDOM.unmountComponentAtNode(div);
  }

  render() {
    const {content} = this.props;

    return (
      <div className='toast-theme'>{content}</div>
    )
  }
}

// alert
class Alert extends React.Component {
  constructor(props) {
    super(props);

    this.handler = this.handler.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  // 关闭弹窗
  closeModal(){
    const div = document.getElementById('alert');

    // 卸载真实DOM
    document.body.removeChild(div);

    // 卸载虚拟DOM（如果不卸载虚拟DOM，不会触发Component.componentWillUnmount）
    ReactDOM.unmountComponentAtNode(div);
  }

  handler(){
    const {okCallback} = this.props;

    okCallback && okCallback();

    this.closeModal();
  }

  render() {
    const {content = '哇哈哈', okText = '确认'} = this.props;

    return (
      <div className='common-container alert-content'>
        <div className='alert-theme'>{content}</div>
        <div className='alert-handler-block'>
          <div className='alert-handler-confirm'
               onClick={() => this.handler('ok')}
          >{okText}</div>
        </div>
      </div>
    )
  }
}

// confirm
class Confirm extends React.Component {
  constructor(props) {
    super(props);

    this.handler = this.handler.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  // 关闭弹窗
  closeModal(){
    const div = document.getElementById('confirm');

    // 卸载真实DOM
    document.body.removeChild(div);

    // 卸载虚拟DOM（如果不卸载虚拟DOM，不会触发Component.componentWillUnmount）
    ReactDOM.unmountComponentAtNode(div);
  }

  handler(field){
    const {okCallback, noCallback} = this.props;

    field === 'ok' && okCallback && okCallback();
    field === 'no' && noCallback && noCallback();

    this.closeModal();
  }

  render() {
    const {content = '哇哈哈', noText = '取消', okText = '确认'} = this.props;

    return (
      <div className='common-container confirm-content'>
        <div className='confirm-theme'>{content}</div>
        <div className='confirm-handler-block'>
          <div className="confirm-handler-cancel"
               onClick={() => this.handler('no')}
          >{noText}</div>
          <div className='confirm-handler-confirm'
               onClick={() => this.handler('ok')}
          >{okText}</div>
        </div>
      </div>
    )
  }
}

Dialog.Toast = function (content, time) {
  const div = document.createElement('div');
  div.className += 'common-container toast-container';
  div.id = 'toast';
  document.body.appendChild(div);

  ReactDOM.render(<Toast content={content} time={time}/>, div)
}

Dialog.Alert = function (content, okCallback) {
  const div = document.createElement('div');
  div.className += 'alert-container';
  div.id = 'alert';
  document.body.appendChild(div);

  ReactDOM.render(<Alert content={content} okCallback={okCallback}/>, div)
}

Dialog.Confirm = function (content, okCallback, noCallback) {
  const div = document.createElement('div');
  div.className += 'confirm-container';
  div.id = 'confirm';
  document.body.appendChild(div);

  ReactDOM.render(<Confirm content={content} okCallback={okCallback} noCallback={noCallback}/>, div)
}
