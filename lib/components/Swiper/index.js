/**
 * @describe: Swiper Component
 *
 * @props:
 *    @width: swiper和图片区域的宽度，默认屏幕可视区域宽度
 *    @height: swiper和图片区域的高度，默认屏幕可视区域宽度 * 0.56
 *
 *    @showPointer: 是否展示指示器， 默认不展示
 *    @pointerSize: 指示器默认尺寸，默认6px
 *    @pointerSizeActive: 指示器激活后的尺寸，默认8px
 *
 *    @pointerColor: 指示器默认颜色，默认#fff
 *    @pointerColorActive: 指示器激活后的颜色，默认#ee5870
 *
 *    @pointPosition: 指示器的位置，默认“center”，其他取值“flex-start”、“flex-end”
 * */

import React from 'react';
import './index.css';

// dot 样式辅助函数
const assistStyl = (current, index, styl) => {
  if(current === index) return styl;
}

export default class Swiper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentIndex: 0,  // 轮播图的索引，默认是第一张
    }

    // 获取滚动区域的宽度、高度、图片资源
    const {width, height} = this.props;
    this.swiperWidth = width || document.documentElement.clientWidth;
    this.swiperHeight = height || this.swiperWidth * 0.56;
    this.swiperLen = this.props.children.length;
    this.rollDirection = true;  // 轮播的方向，默认向右
    this.autoSwitch = true;  // 切换方式的标志，默认为自动切换

    this.swiperREF = React.createRef();

    this.determine = this.determine.bind(this);
    this.carousel = this.carousel.bind(this);
    this.$touchStart = this.$touchStart.bind(this);
    this.$touchMove = this.$touchMove.bind(this);
    this.$touchEnd = this.$touchEnd.bind(this);
  }

  // 滚动
  carousel() {
    const {currentIndex} = this.state;
    // - windowWidth标识向右滑动windowWidth的距离
    this.swiperDOM.style.transform = 'translateX(' + -this.swiperWidth * currentIndex + 'px)';
  }

  // 判定
  determine() {
    // 加一个状态标志，避免手动切换和定时器切换同步
    // 当手动切换是，跳过一轮自动切换
    if(!this.autoSwitch) {
      return null;
    }

    if (this.rollDirection) {
      this.setState(
        prevState => ({currentIndex: prevState.currentIndex + 1}),
        () => {
          const {currentIndex} = this.state;

          // 执行滚动
          this.carousel();

          // 入如果滚动到最后一页
          if (currentIndex === this.swiperLen - 1) {
            // 改变滚动的方向
            this.rollDirection = false;  // 轮播的方向，向左
          }
        }
      )
    } else {
      this.setState(
        prevState => ({currentIndex: prevState.currentIndex - 1}),
        () => {
          const {currentIndex} = this.state;

          // 执行滚动
          this.carousel();

          // 入如果滚动到第一页
          if (currentIndex === 0) {
            // 改变滚动的方向
            this.rollDirection = true;  // 轮播的方向，向右
          }
        }
      )
    }
  }

  // 获取开始滑动，触点在x轴的位置
  $touchStart(e){
    this.startX = e.touches[0].pageX;
  }

  // 滑动的偏移量
  $touchMove(e){
    const offset = e.touches[0].pageX - this.startX;

    // 向左滑动
    if(offset > 0){
      // 设置轮播切换的方向，向右滑动
      this.rollDirection = false;
    } if(offset < 0){
      // 设置轮播切换的方向，向左滑动
      this.rollDirection = true;
    }
  }

  $touchEnd(){
    // 手动轮播至下一页
    this.determine()

    // 设置轮播动作途径，如果是自动切换，autoSwitch为true，否则为false
    this.autoSwitch = false;

    // 跳过当前一轮自动切换，下一轮重置
    // 这种做法有问题，下一次自动轮序需要等待6000
    this.switchStateTimer = setTimeout(() => this.autoSwitch = true , 3000)
  }

  componentDidMount() {
    this.swiperDOM = this.swiperREF.current;

    this.timer = setInterval(() => this.determine(), 3000);
  }

  componentWillUnmount() {
    this.timer && clearInterval(this.timer);
    delete this.timer;

    this.switchStateTimer && clearTimeout(this.switchStateTimer);
    delete this.switchStateTimer;
  }

  render() {
    const {showPointer, pointerSize, pointerSizeActive, pointerColor, pointerColorActive, pointPosition = 'center'} = this.props;
    const {currentIndex} = this.state;

    // pointer 公共样式
    const dotStylCommon = {
      borderColor: '#9c9c9c',
      borderWidth: 1,
      marginRight: 5,
      marginLeft: 5,
    }

    // pointer 未激活的样式
    const dotStylDefault = {
      width: pointerSize || 6,
      height: pointerSize || 6,
      borderRadius: (pointerSize / 2) || (6 / 2),
      backgroundColor: pointerColor || '#fff',
    }

    // pointer 激活后的样式
    const dotStylActive = {
      width: pointerSizeActive || 8,
      height: pointerSizeActive || 8,
      borderRadius: pointerSizeActive / 2 || (8 / 2),
      backgroundColor: pointerColorActive || '#ee5870',
    }

    return (
      <div className='swiper-container'
           onTouchStart={this.$touchStart}
           onTouchMove={this.$touchMove}
           onTouchEnd={this.$touchEnd}
           style={{width: this.swiperWidth, height: this.swiperHeight}}
      >
        <div className='swiper-content'
             style={{width: this.swiperWidth * this.swiperLen, height: this.swiperHeight}}
             ref={this.swiperREF}
        >
          {
            React.Children.map(this.props.children, (item, index) => (
              <div style={{width: this.swiperWidth, height: this.swiperHeight}}
                   key={index}
              >{item}</div>
            ), null)
          }
        </div>

        {
          !!showPointer && <div className='swiper-dot'
                                style={{justifyContent: pointPosition}}
          >
            {
              React.Children.map(this.props.children, (item, index) => (
                <div style={{...dotStylCommon, ...dotStylDefault, ...assistStyl(currentIndex, index, dotStylActive)}}
                     key={item + 'swiper-dot' + index}
                ></div>
              ), null)
            }
          </div>
        }
      </div>
    )
  }
}

// Swiper.propTypes = {
//   width: PropTypes.number,
//   height: PropTypes.number,
//
//   showPointer: PropTypes.bool,
//   pointerSize: PropTypes.number,
//   pointerSizeActive: PropTypes.number,
//
//   pointerColor: PropTypes.string,
//   pointerColorActive: PropTypes.string,
//
//   pointPosition: PropTypes.string,
// }