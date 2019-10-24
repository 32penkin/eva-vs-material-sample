import React from 'react';
import {
  ApplicationProvider,
  IconRegistry,
  ThemeType,
} from 'react-native-ui-kitten';
import {
  mapping,
  light as evaLightTheme,
} from '@eva-design/eva';
import { default as materialThemeShell } from './material.theme.json';
import { default as materialMappingShell } from './material.mapping.json';
import { Login } from '../../components/login.component';
import { MaterialIconsPack } from './material-icons';

const materialTheme: ThemeType = {
  ...evaLightTheme,
  ...materialThemeShell,
};

interface State {
  email: string | undefined;
  password: string | undefined;
  remember: boolean;
}

export class LoginMaterialContainer extends React.Component<any, State> {

  public state: State = {
    email: '',
    password: '',
    remember: false,
  };

  private onMenuItemPress = (index: number): void => {

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
        <IconRegistry icons={MaterialIconsPack}/>
        <ApplicationProvider
          mapping={mapping}
          theme={materialTheme}>
          <Login
            email={this.state.email}
            password={this.state.password}
            remember={this.state.remember}
            menuData={[]}
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
