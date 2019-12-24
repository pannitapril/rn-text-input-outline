import React, { Component } from 'react';
import { View, TextInput, Text } from 'react-native';
import PropTypes from 'prop-types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const COLOR_TEXTINPUT_BORDER = 'blue';
const COLOR_TEXTINPUT = '#2B2B2B';
const COLOR_BACKGROUND = '#FFFFFF';
const COLOR_DISABLED_CONTROL = '#A4A4A4';
const FONT_SIZE_TEXTINPUT = 16;

const styles = {
  textInputContainer: {
    alignSelf: 'stretch',
    height: 42,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textInputStyle: {
    color: COLOR_TEXTINPUT,
    fontSize: 16,
    flex: 1,
  },
  container: {
    alignSelf: 'stretch',
    borderColor: COLOR_DISABLED_CONTROL,
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: 15,
    marginBottom: 17,
    height: 52,
    justifyContent: 'center',
  },
  labelContainer: {
    flexDirection: 'row',
    maxWidth: '55%',
    marginLeft: -3,
    marginTop: -10,
    justifyContent: 'center',
  },
  labelText: {
    backgroundColor: COLOR_BACKGROUND,
    marginLeft: 3,
    color: COLOR_TEXTINPUT,
    fontSize: FONT_SIZE_TEXTINPUT,
  },
  horizontalLine: {
    height: 1,
    flex: 1,
    marginLeft: 3,
    marginTop: 0.5,
    alignSelf: 'center',
    backgroundColor: COLOR_DISABLED_CONTROL,
  },
};

export default class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secureTextEntry: props.secureTextEntry,
      isFocused: false,
    };
  }

    onPressShowPassword = () => {
      this.setState(prevState => ({ secureTextEntry: !prevState.secureTextEntry }));
    }

    renderIconRight = () => {
      const {
        revealPasswordIcon, secureTextEntry, iconName, iconLocation,
      } = this.props;

      if (revealPasswordIcon && secureTextEntry) {
        return (
          <MaterialCommunityIcons
            name={this.state.secureTextEntry ? 'lock' : 'lock-open'}
            size={20}
            color={COLOR_DISABLED_CONTROL}
            onPress={this.onPressShowPassword}
          />
        );
      } if (iconName && iconLocation === 'right') {
        return (
          <MaterialCommunityIcons
            name={iconName}
            size={20}
            color={COLOR_DISABLED_CONTROL}
            onPress={this.onPressShowPassword}
          />
        );
      }
      return null;
    };

    renderIconLeft = () => {
      const {
        revealPasswordIcon, secureTextEntry, iconName, iconLocation,
      } = this.props;

      if (iconName && iconLocation === 'left' && !revealPasswordIcon && !secureTextEntry) {
        return (
          <MaterialCommunityIcons
            name={iconName}
            size={20}
            color={COLOR_DISABLED_CONTROL}
            onPress={this.onPressShowPassword}
          />
        );
      }
      return null;
    };

    renderBorderColor = () => {
      const { borderColor, containerStyle } = this.props;
      if (this.state.isFocused) {
        return {
          line: [styles.horizontalLine, { backgroundColor: borderColor }],
          border: [
            styles.container,
            { borderColor },
            containerStyle,
          ],
        };
      } return {
        line: styles.horizontalLine,
        border: [styles.container, containerStyle],
      };
    }

    renderLabel = () => {
      const { value, labelTextStyle, borderColor } = this.props;

      if (value !== '' || this.state.isFocused) {
        return (
          <View style={styles.labelContainer}>
            <Text
              numberOfLines={1}
              style={[styles.labelText, labelTextStyle]}
            >
              {this.props.label}
            </Text>
            <View style={this.renderBorderColor(borderColor).line} />
          </View>
        );
      }
      return null;
    }

    onFocusHandler = () => {
      this.setState(prevState => ({ isFocused: !prevState.isFocused }));
      this.props.onFocusHandler();
    }

    onBlurHandler = () => {
      this.setState(prevState => ({ isFocused: !prevState.isFocused }));
      this.props.onBlurHandler();
    }

    render() {
      const {
        contentContainerStyle, contentStyle,
      } = this.props;
      return (
        <View style={this.renderBorderColor().border}>
          {this.renderLabel()}
          <View style={[styles.textInputContainer, contentContainerStyle]}>
            {this.renderIconLeft()}
            <TextInput
              underlineColorAndroid="transparent"
              style={[styles.textInputStyle, contentStyle]}
              secureTextEntry={this.state.secureTextEntry}
              onFocus={this.onFocusHandler}
              onBlur={this.onBlurHandler}
              {...this.props}
            />
            {this.renderIconRight()}
          </View>
        </View>
      );
    }
}

const StyleShape = PropTypes.objectOf(PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number,
]));

Input.propTypes = {
  secureTextEntry: PropTypes.bool,
  revealPasswordIcon: PropTypes.bool,
  borderColor: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  iconLocation: PropTypes.oneOf(['left', 'right']),
  iconName: PropTypes.string,
  containerStyle: StyleShape,
  contentContainerStyle: StyleShape,
  contentStyle: StyleShape,
  labelTextStyle: StyleShape,
  onFocusHandler: PropTypes.func,
  onBlurHandler: PropTypes.func,
};

Input.defaultProps = {
  secureTextEntry: false,
  revealPasswordIcon: true,
  value: '',
  label: '',
  iconLocation: 'right',
  iconName: '',
  containerStyle: {},
  contentContainerStyle: {},
  contentStyle: {},
  labelTextStyle: {},
  borderColor: COLOR_TEXTINPUT_BORDER,
  onFocusHandler: () => {},
  onBlurHandler: () => {},
};
