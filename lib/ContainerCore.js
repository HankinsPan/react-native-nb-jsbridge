import React, { Component } from 'react'
import {
  Platform,
  Dimensions,
  SafeAreaView,
} from 'react-native'

import createInvoke from 'react-native-webview-invoke/native'

import {
  ModalSelector,
  ShareSelector
} from './components/modal'

import image from '../assets/image'

const {
  friend: icFriend,
  network: icNetwork,
  poster: icPoster,
} = image.share

const { width, height } = Dimensions.get('window');

export const SHARE_ACTIONS = [
  { name: '分享到:', type: 'title' },
  { name: '微信好友', type: 'vertical', icon: icFriend },
  { name: '朋友圈', type: 'vertical', icon: icNetwork },
  { name: '取消', type: 'cancel' },
]

class ContainerCore extends Component {
  invoke = createInvoke(() => this.webref);
  constructor (props) {
    super(props);

    if (this.renderBody) {
      this.renderBody = this.renderBody.bind(this);
    }
    this.state = {};
  }

  initial (params) {
    if (!params) {
      return;
    }

    const {
      pubInvoke,
      subCallback,
    } = params || {};

    (pubInvoke && pubInvoke.length)
      ? pubInvoke.forEach((invokes, index) => {
        const { onHandle, fn } = invokes || {};
        this.invokeFactory(onHandle, fn);
      }) : null;

    this.state.subCallback = subCallback;
  }

  invokeFactory (onHandle = '', fn) {
    this.invoke.define(onHandle, fn);
  }

  onModalSelectorCancel () {}

  showShareSheet ({
    text,
    img,
    url,
    title,
    actions = SHARE_ACTIONS,
    shareActions,
  }, statusBarHide) {
    this.shareData = {
      text,
      img,
      url,
      title,
    }
    this.selector.showOnBottom({
      component: (
        <ShareSelector
          actions={shareActions ? shareActions : SHARE_ACTIONS}
          onAction={(action) => this.onShareAction(action)}
        />
      ),
      height,
      offset: Platform.select({
        android: 0,
        ios: 0,
      }),
      cancelable: true,
    })
  }

  onShareAction (action) {
    const {
      icon,
      type,
    } = action

    if (type == 'cancel') {
      this.selector.cancel()
      this.onModalSelectorCancel()
      return
    }

    switch (icon) {
      case icNetwork: {
        this.selector.cancel()
        this.onShareWechat('朋友圈')
        // if (ios) {
        //   this.onShareWechat('朋友圈')
        //   // Linking.canOpenURL('weixin://').then(supported => {
        //   //   if (supported) {
        //   //     this.onShareWechat('朋友圈')
        //   //   } else {
        //   //     this.showToast('请安装微信程序后再进行分享')
        //   //   }
        //   // })
        // } else {
        //   this.onShareWechat('朋友圈')
        // }
        return
      }
      case icFriend: {
        this.selector.cancel()
        this.onShareWechat('微信好友')
        // if (ios) {
        //   this.onShareWechat('微信好友')
        //   // Linking.canOpenURL('weixin://').then(supported => {
        //   //   if (supported) {
        //   //     this.onShareWechat('微信好友')
        //   //   } else {
        //   //     this.showToast('请安装微信程序后再进行分享')
        //   //   }
        //   // })
        // } else {
        //   this.onShareWechat('微信好友')
        // }
      }
    }
  }

  async onShareWechat (shareType) {
    await this.state.subCallback();
    // Share.share({...this.shareData, shareType})
  }

  render () {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        {
          (this.renderBody ? this.renderBody() : null)
        }
        <ModalSelector
          ref={r => this.selector = r}
          maskOpacity={0.5}
          backgroundColor='transparent'
          onCancel={() => this.onModalSelectorCancel()}
        />
      </SafeAreaView>
    )
  }
}

export default ContainerCore
