import {
  createAppContainer,
} from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { LoginEvaContainer } from '../containers/eva/loginEva.container';
import { LoginMaterialContainer } from '../containers/material/loginMaterial.container';

const AppNavigator = createBottomTabNavigator({
  ['Eva']: LoginEvaContainer,
  ['Material']: LoginMaterialContainer,
}, {
  tabBarOptions: {
    style: {
      maxHeight: 70,
    },
    labelStyle: {
      fontSize: 14,
      fontWeight: '400',
    },
  },
});

export const Router = createAppContainer(AppNavigator);
