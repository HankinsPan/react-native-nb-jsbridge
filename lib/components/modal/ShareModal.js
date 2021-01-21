import React, { PureComponent } from 'react'

import {
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native'

import {
  actStyles,
  actsStyles,
  shareStyles,
  icFriend,
  icNetwork,
  commonStyles,
  shareActions,
} from './ShareSelector.style'

export const SHARE_ACTIONS = [
  { name: '分享到:', type: 'title' },
  { name: '微信好友', type: 'vertical', icon: icFriend },
  { name: '朋友圈', type: 'vertical', icon: icNetwork },
  { name: '取消', type: 'cancel' },
]

class Act extends PureComponent {
  constructor (props) {
    super(props)

    const {
      checked,
    } = this.props

    this.state = {
      checked,
    }
  }

  onAction = () => {
    const {
      action,
      onAction,
    } = this.props

    onAction(action)
  }

  onCheck = () => {
    const {
      onCheck,
    } = this.props

    const {
      checked,
    } = this.state
    this.setState({
      checked: !checked,
    })

    onCheck(!checked)
  }

  render () {
    const {
      name,
      type,
      icon,
      style,
    } = this.props.action

    switch (type) {
      case 'cancel':
        return <TouchableOpacity
          activeOpacity={.8}
          style={[actStyles.container, actStyles.center]}
          onPress={this.onAction}>
          <Text style={[actStyles.text, style]}>{name}</Text>
        </TouchableOpacity>
      case 'vertical':
        return <TouchableOpacity
          activeOpacity={.8}
          style={shareStyles.actions}
          onPress={this.onAction}>
          <View style={shareStyles.icon}>
            <Image source={icon}/>
          </View>
          <Text style={[commonStyles.text, { marginTop: 12 }]}>{name}</Text>
        </TouchableOpacity>
      case 'title':
        return <View style={shareStyles.titleWrapper}>
          <Text style={shareStyles.title}>{name}</Text>
        </View>
      default:
        return <TouchableOpacity
          activeOpacity={.8}
          style={[actStyles.container]}
          onPress={this.onAction}>
          <View style={actStyles.icon}>
            <Image source={icon}/>
          </View>
          <Text style={commonStyles.text}>{name}</Text>
        </TouchableOpacity>
    }
  }
}

export default class ShareSelector extends PureComponent {
  constructor (props) {
    super(props)
  }

  onAction = (action) => {
    const {
      onAction,
    } = this.props

    onAction(action)
  }

  render () {
    const {
      containerStyle,
      actions = shareActions,
    } = this.props
    return <View style={[actsStyles.container, containerStyle]}>
      <View style={shareStyles.wrapper}>
        {
          actions
            .slice(1, actions.length - 1)
            .map((action, i) =>
              <Act
                key={i} action={action}
                onAction={this.onAction}
              />,
            )
        }
      </View>
      <View style={{ height: 8, backgroundColor: '#f7f7f7' }}/>
      <Act action={actions[actions.length - 1]} onAction={this.onAction}/>
    </View>
  }
}
