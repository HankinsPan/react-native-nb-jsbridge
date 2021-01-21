import {
  Platform,
  StyleSheet,
  Dimensions,
} from 'react-native';

import image from '../../../assets/image'

const ios = Platform.OS === 'ios';

export {
  ios,
};

const {
  width: viewPortWidth,
  height: viewPortHeight,
} = Dimensions.get('window');

const selectorContainerHeight = viewPortHeight;

export {
  viewPortHeight,
  selectorContainerHeight,
};

const {
  friend: icFriend,
  network: icNetwork,
  poster: icPoster,
} = image.share;

export {
  icFriend,
  icNetwork,
  icPoster,
};

export const shareActions = [
  { name: '微信好友', type: 'FRIEND', icon: icFriend },
  { name: '朋友圈', type: 'NETWORK', icon: icNetwork },
];

export const commonStyles = StyleSheet.create({
  text: {
    fontSize: 12,
    color: '#969696',
  },
});

export const actStyles = StyleSheet.create({
  container: {
    width: viewPortWidth,
    paddingVertical: 13,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  icon: {
    marginRight: 13,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: '#333333',
  },
});

export const actsStyles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingBottom: 20,
  },
  wrapper: {
    width: viewPortWidth,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 10,
  },
  text: {
    fontSize: 18,
    color: '#333333',
  },
});

export const shareStyles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleWrapper: {
    width: viewPortWidth,
    height: 37,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e8e8e8',
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actions: {
    paddingVertical: 20,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 12,
    color: '#b4b4b4',
  },
  leadsTitle: {
    fontSize: 12,
    color: '#F35300',
    marginLeft: 10,
  },
  icon: {
    width: 50,
    height: 50,
  },
});
