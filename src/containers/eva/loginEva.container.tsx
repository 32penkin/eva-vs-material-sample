import React from 'react';
import {
  ApplicationProvider,
  IconRegistry,
  OverflowMenuItemType,
  ThemeType,
} from 'react-native-ui-kitten';
import {
  mapping,
  light as evaLightTheme,
  dark as evaDarkTheme,
} from '@eva-design/eva';
import { default as materialThemeShell } from '../material/material.theme.json';
import { default as materialMapping } from '../material/material.mapping.json';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { Login } from '../../components/login.component';

const materialTheme: ThemeType = {
  ...evaLightTheme,
  ...materialThemeShell,
};

interface ThemesType {
  'Eva Light': ThemeType,
  'Eva Dark': ThemeType,
}

const Themes: ThemesType = {
  'Eva Light': evaLightTheme,
  'Eva Dark': evaDarkTheme,
};

type ThemeKey = keyof ThemesType;

interface Infrastructure {
  theme: ThemeKey;
  customMapping: any;
}

interface State {
  email: string | undefined;
  password: string | undefined;
  remember: boolean;
  infrastructure: Infrastructure;
}

export class LoginEvaContainer extends React.Component<any, State> {

  public state: State = {
    email: '',
    password: '',
    remember: false,
    infrastructure: {
      theme: 'Eva Light',
      customMapping: {},
    },
  };

  private menuItems: OverflowMenuItemType[] = Object.keys(Themes)
    .map((item: string) => ({ title: item }));

  private onMenuItemPress = (index: number): void => {
    const theme: string = this.menuItems[index].title;
    // @ts-ignore
    this.setState({ infrastructure: { theme: theme }});
  };


  private onEmailChange = (email: string | undefined): void => {
    this.setState({ email });
  };
  private onPasswordChange = (password: string | undefined): void => {
    this.setState({ password });
  };

  private onRememberPress = (remember: boolean): void => {
    this.setState({ remember });
  };

  public render(): React.ReactNode {
    return (
      <React.Fragment>
        <IconRegistry icons={EvaIconsPack}/>
        <ApplicationProvider
          mapping={mapping}
          customMapping={this.state.infrastructure.customMapping}
          theme={Themes[this.state.infrastructure.theme]}>
          <Login
            email={this.state.email}
            password={this.state.password}
            remember={this.state.remember}
            menuData={this.menuItems}
            onMenuItemPress={this.onMenuItemPress}
            onEmailChange={this.onEmailChange}
            onPasswordChange={this.onPasswordChange}
            onRememberMePress={this.onRememberPress}
            onSignInPress={() => {}}
            onForgotPasswordPress={() => {}}
          />
        </ApplicationProvider>
      </React.Fragment>
    );
  }
}
