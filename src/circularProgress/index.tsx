import React, {useMemo} from 'react';
import {Text, StyleSheet, View} from 'react-native';

import ProgressCircle from '../components/progressCircle';
import useAnimatedValue from '../hooks/useAnimatedValue';
import COLORS from '../utils/colors';
import type {CircularProgressProps} from '../types';
import ProgressValue from '../components/progressValue';

import styles from './styles';

const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  initialValue = 0,
  circleBackgroundColor = COLORS.TRANSPARENT,
  radius = 60,
  duration = 500,
  delay = 0,
  maxValue = 100,
  strokeLinecap = 'round',
  onAnimationComplete = () => null,
  activeStrokeColor = COLORS.GREEN,
  activeStrokeSecondaryColor = null,
  activeStrokeWidth = 10,
  inActiveStrokeColor = COLORS.BLACK_30,
  inActiveStrokeWidth = 10,
  inActiveStrokeOpacity = 1,
  clockwise = true,
  rotation = 0,
  title = '',
  titleStyle = {},
  titleColor,
  titleFontSize,
  progressValueColor,
  progressValueStyle = {},
  progressValueFontSize,
  valuePrefix = '',
  valueSuffix = '',
  showProgressValue = true,
  subtitle = '',
  subtitleStyle = {},
  subtitleColor,
  subtitleFontSize,
  progressFormatter = (v: number) => {
    'worklet';

    return Math.round(v);
  },
  allowFontScaling = true,
  dashedStrokeConfig = {count: 0, width: 0},
  valuePrefixStyle = {},
  valueSuffixStyle = {},
}: CircularProgressProps) => {
  const {animatedCircleProps, animatedTextProps, progressValue} =
    useAnimatedValue({
      initialValue,
      radius,
      maxValue,
      clockwise,
      delay,
      value,
      duration,
      onAnimationComplete,
      activeStrokeWidth,
      inActiveStrokeWidth,
      progressFormatter,
    });

  const styleProps = useMemo(
    () => ({
      radius,
      rotation,
      progressValueColor,
      progressValueFontSize,
      progressValueStyle,
      activeStrokeColor,
      titleStyle,
      titleColor,
      titleFontSize,
      showProgressValue,
      subtitleColor,
      subtitleFontSize,
      subtitleStyle,
    }),
    [
      radius,
      rotation,
      progressValueColor,
      progressValueFontSize,
      progressValueStyle,
      activeStrokeColor,
      titleStyle,
      titleColor,
      titleFontSize,
      showProgressValue,
      subtitleColor,
      subtitleFontSize,
      subtitleStyle,
    ]
  );

  return (
    <View style={styles(styleProps).container}>
      <View style={styles(styleProps).rotatingContainer}>
        <ProgressCircle
          circleBackgroundColor={circleBackgroundColor}
          radius={radius}
          strokeLinecap={strokeLinecap}
          activeStrokeColor={activeStrokeColor}
          activeStrokeSecondaryColor={activeStrokeSecondaryColor}
          activeStrokeWidth={activeStrokeWidth}
          inActiveStrokeColor={inActiveStrokeColor}
          inActiveStrokeWidth={inActiveStrokeWidth}
          inActiveStrokeOpacity={inActiveStrokeOpacity}
          animatedCircleProps={animatedCircleProps}
          dashedStrokeConfig={dashedStrokeConfig}
        />
      </View>
      <View
        style={[
          StyleSheet.absoluteFillObject,
          styles(styleProps).valueContainer,
        ]}>
        {showProgressValue && (
          <View style={styles(styleProps).valueContainerRow}>
            {!!valuePrefix && (
              <Text
                style={[
                  styles(styleProps).input,
                  progressValueStyle,
                  styles(styleProps).fromProps,
                  valuePrefixStyle,
                ]}
                allowFontScaling={allowFontScaling}>
                {valuePrefix}
              </Text>
            )}
            <ProgressValue
              initialValue={initialValue}
              radius={radius}
              activeStrokeColor={activeStrokeColor}
              progressValueColor={progressValueColor}
              progressValueStyle={progressValueStyle}
              progressValueFontSize={progressValueFontSize}
              progressValue={progressValue}
              animatedTextProps={animatedTextProps}
              allowFontScaling={allowFontScaling}
            />
            {!!valueSuffix && (
              <Text
                style={[
                  styles(styleProps).input,
                  progressValueStyle,
                  styles(styleProps).fromProps,
                  valueSuffixStyle,
                ]}
                allowFontScaling={allowFontScaling}>
                {valueSuffix}
              </Text>
            )}
          </View>
        )}
        {title && title !== '' ? (
          <Text
            style={[styles(styleProps).title, titleStyle]}
            numberOfLines={1}
            allowFontScaling={allowFontScaling}>
            {title}
          </Text>
        ) : null}
        {subtitle && subtitle !== '' ? (
          <Text
            style={[
              styles(styleProps).title,
              styles(styleProps).subtitle,
              subtitleStyle,
            ]}
            numberOfLines={1}
            allowFontScaling={allowFontScaling}>
            {subtitle}
          </Text>
        ) : null}
      </View>
    </View>
  );
};

export default CircularProgress;
