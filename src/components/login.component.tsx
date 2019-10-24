import React from 'react';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {
  Button,
  ThemeType,
  CheckBox,
  Text,
  Layout,
  LayoutElement,
  withStyles,
  ThemedComponentProps,
  Icon,
  IconElement,
  OverflowMenu,
  OverflowMenuItemType,
} from 'react-native-ui-kitten';
import { ValidationInput } from './validationInput.component';
import {
  EmailValidator,
  PasswordValidator,
} from '../core/validators';

interface ComponentProps {
  email: string | undefined;
  password: string | undefined;
  remember: boolean;
  menuData: OverflowMenuItemType[];
  onMenuItemPress: (index: number) => void;
  onEmailChange: (value: string | undefined) => void;
  onPasswordChange: (value: string | undefined) => void;
  onRememberMePress: (value: boolean) => void;
  onSignInPress: () => void;
  onForgotPasswordPress: () => void;
}

interface State {
  menuVisible: boolean;
}

type Props = ComponentProps & ThemedComponentProps;

class LoginComponent extends React.Component<Props, State> {

  public state: State = {
    menuVisible: false,
  };

  private setMenuVisible = (): void => {
    const menuVisible: boolean = !this.state.menuVisible;

    this.setState({ menuVisible });
  };

  private renderMenuIcon = (): IconElement => {
    const { themedStyle } = this.props;

    return (
      <Icon
        name='menu'
        {...themedStyle.menuIcon}
        style={themedStyle.menuIcon}
      />
    );
  };

  public render(): LayoutElement {
    const { themedStyle } = this.props;

    return (
      <React.Fragment>
        <SafeAreaView style={themedStyle.headerContainer}>
          <OverflowMenu
            visible={this.state.menuVisible}
            placement='bottom end'
            onBackdropPress={this.setMenuVisible}
            onSelect={this.props.onMenuItemPress}
            data={this.props.menuData}>
            <TouchableOpacity
              activeOpacity={0.9}
              style={themedStyle.menuButton}
              onPress={this.setMenuVisible}>
              {this.renderMenuIcon()}
            </TouchableOpacity>
          </OverflowMenu>
          <Text
            style={themedStyle.signInLabel}
            category='h5'>
            SIGN IN TO YOUR ACCOUNT
          </Text>
        </SafeAreaView>
        <Layout
          style={themedStyle.container}
          level='1'>
          <View style={themedStyle.inputsContainer}>
            <ValidationInput
              label='Email'
              placeholder='Enter Email'
              style={themedStyle.input}
              validator={EmailValidator}
              value={this.props.email}
              onChangeText={this.props.onEmailChange}
            />
            <ValidationInput
              label='Password'
              placeholder='Enter Password'
              style={themedStyle.input}
              secureTextEntry={true}
              validator={PasswordValidator}
            />
            <CheckBox
              style={themedStyle.checkbox}
              text='Remember Me'
              checked={this.props.remember}
              onChange={this.props.onRememberMePress}
            />
          </View>
          <Button onPress={this.props.onSignInPress}>
            SIGN IN
          </Button>
        </Layout>
      </React.Fragment>
    );
  }
}

export const Login = withStyles(LoginComponent, (theme: ThemeType) => ({
  container: {
    flex: 2,
    justifyContent: 'space-between',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  headerContainer: {
    flex: 1,
    backgroundColor: theme['color-primary-default'],
  },
  signInLabel: {
    color: 'white',
    alignSelf: 'center',
    marginTop: 40,
  },
  menuButton: {
    alignSelf: 'flex-end',
    width: 30,
    margin: 16,
  },
  menuIcon: {
    tintColor: 'white',
    width: 28,
    height: 28,
  },
  input: {
    marginVertical: 6,
  },
  checkbox: {
    marginTop: 6,
  },
}));
