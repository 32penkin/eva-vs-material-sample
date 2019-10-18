import React from 'react';
import {
  ApplicationProvider,
  IconRegistry,
  OverflowMenuItemType,
} from 'react-native-ui-kitten';
import {
  mapping,
  light as theme,
} from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { Login } from './login/login.component';


interface State {
  email: string | undefined;
  password: string | undefined;
  remember: boolean;
}

class App extends React.Component<any, State> {

  public state: State = {
    email: '',
    password: '',
    remember: false,
  };

  private menuItems: OverflowMenuItemType[] = [
    { title: 'Eva' },
    { title: 'Material' }
  ];

  private onMenuItemPress = (index: number): void => {
    console.log(index);
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
        <ApplicationProvider mapping={mapping} theme={theme}>
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

export default App;
