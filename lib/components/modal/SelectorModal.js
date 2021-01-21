import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Animated,
  Easing,
  Dimensions,
  Platform,
  TouchableOpacity,
} from 'react-native'

const { width, height } = Dimensions.get('window')
const [left, top] = [0, 0]

export default class ModalSelector extends Component {
  constructor (props) {
    super(props)
    this.state = {
      slideY: new Animated.Value(height),
      fadeInOut: new Animated.Value(0),
      hide: true,
      content: null,
      contentHeight: 0,
      height,
      cancelTouchHide: false,
      softKeyHeight: 0,
    }
    this.callback = function () {
    }//回调方法
  }

  async componentDidMount () {
    this.setState({
      height: height,
      softKeyHeight: Platform.select({
        ios: 0,
        android: height,
      }),
    })
  }

  refreshComponent (component) {
    this.setState({
      content: component,
    })
  }

  render () {
    const {
      height,
      containerStyle,
      softKeyHeight,
      hide,
      fadeInOut,
      slideY,
      content,
    } = this.state

    const {
      disabledTouchCancel,
      maskOpacity,
      backgroundColor,
    } = this.props || {}

    if (hide) {
      return (<View/>)
    } else {
      return (
        <TouchableOpacity
          style={[styles.container, { height }, containerStyle]}
          disabled={disabledTouchCancel}
          activeOpacity={1}
          onPress={this.cancel.bind(this)}>
          <Animated.View style={[styles.mask, { height },
            { opacity: fadeInOut },
            { opacity: maskOpacity }]
          }>
          </Animated.View>

          <Animated.View style={{
            backgroundColor: backgroundColor || 'white',
            transform: [{ translateY: slideY }],
          }}>
            {content}
          </Animated.View>
        </TouchableOpacity>
      )
    }
  }

  isShow () {
    return !this.state.hide
  }

  //显示动画
  in () {
    const {
      height,
      offset,
      contentHeight,
      fadeInOut,
      slideY,
    } = this.state
    let _slideY = Platform.select({
      ios: 0,
      android: 0,
    })

    if (this.center) {
      _slideY = Platform.select({
        ios: height / 2.0,
        android: height / 2.0,
      })
    }

    Animated.parallel([
      Animated.timing(fadeInOut, {
        toValue: 0.6, // 目标值
        duration: 300, // 动画时间
        easing: Easing.linear, // 缓动函数
        useNativeDriver: true,
      }),
      Animated.timing(slideY, {
        toValue: _slideY - (offset ? offset : 0),
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start()
  }

  //隐藏动画
  out (event) {
    const {
      height,
      fadeInOut,
      slideY,
    } = this.state
    Animated.parallel([
      Animated.timing(fadeInOut, {
        toValue: 0, // 目标值
        duration: 300, // 动画时间
        easing: Easing.linear, // 缓动函数
        useNativeDriver: true,
      }),
      Animated.timing(slideY, {
        toValue: height,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start((result) => {
      if (result.finished) {
        this.setState({ hide: true }, () => {
          event && typeof event === 'function' && event()
        })
      }
    })
  }

  //取消
  cancel (event) {
    const { onCancel } = this.props
    const { cancelTouchHide, hide } = this.state
    if (!hide && !cancelTouchHide) {
      onCancel && onCancel()
      this.out(event)
    }
  }

  hide (event) {
    if (!this.state.hide) {
      this.out(event)
    }
  }

  showOnTop ({
    component,
    height,
    cancelable,
  }) {
    if (!this.state.hide) {
      return
    }

    if (!component) {
      return
    }

    this.setState({
      hide: false,
      containerStyle: {
        justifyContent: 'flex-start',
        alignItems: 'center',
      },
      content: component,
      contentHeight: height,
      cancelTouchHide: !cancelable,
    }, () => this.in())
  }

  showOnBottom ({
    component,
    height,
    cancelable,
    offset,
  }) {
    if (!this.state.hide) {
      return
    }

    if (!component) {
      return
    }

    this.setState({
      hide: false,
      containerStyle: {
        justifyContent: 'flex-end',
        paddingBottom: 44,
      },
      offset,
      content: component,
      contentHeight: height,
      cancelTouchHide: !cancelable,
    }, () => this.in())
  }

  show (component, height, callback, cancelTouchHide) {
    if (this.state.hide) {
      if (component) {
        this.setState({
          hide: false,
          content: component,
          contentHeight: height,
          cancelTouchHide,
        }, () => {
          this.in()
        })
      }
    }
  }

  showOnCenter ({ component, height, cancelable, offset }) {
    if (!this.state.hide) {
      return
    }

    if (!component) {
      return
    }

    this.center = true

    this.setState({
      hide: false,
      containerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      offset,
      content: component,
      contentHeight: height,
      cancelTouchHide: !cancelable,
    }, () => {this.in()})
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: width,
    left: left,
    top: top,
    backgroundColor: 'transparent',
  },
  mask: {
    backgroundColor: '#000000',
    position: 'absolute',
    width: width,
    left: left,
    top: top,
  },
  content: {
    position: 'absolute',
    backgroundColor: 'transparent',
    flex: 1,
  },
})
