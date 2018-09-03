import React from 'react';
import MaskContainer from '../Mask/index';
import './index.css';

class BaseStruct extends React.Component {
  constructor(props) {
    super(props);

    this.handler = this.handler.bind(this);
  }

  handler(field){
    const {noCallback, okCallback} = this.props;

    field === 'ok' && okCallback && okCallback();
    field === 'no' && noCallback && noCallback();
  }

  render() {
    const {content = '哇哈哈', noText = '取消', okText = '确认'} = this.props;

    return (
      <MaskContainer>
        <div className='confirm-container'>
          <div className='confirm-content'>
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

    render() {
      const {show} = this.props;

      if(!!show){
        return (
          <WrappedComponent {...this.props}/>
        )
      }

      return null;
    }
  }
}

const Confirm = HOC(BaseStruct);

export default Confirm;