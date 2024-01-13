/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {Pressable, StatusBar, StyleSheet, useColorScheme} from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

function App() {
  const tabs = ['system', 'light', 'dark'];
  const systemTheme = useColorScheme();

  const [tabTheme, setTabTheme] = useState('system');
  const [theme, setTheme] = useState<string>(systemTheme || 'light');

  useEffect(() => {
    if (tabTheme === 'system') {
      setTheme(systemTheme || 'light');
    }
  }, [systemTheme, tabTheme]);

  const indicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX:
            tabTheme === 'light'
              ? withTiming(100)
              : tabTheme === 'dark'
              ? withTiming(200)
              : withTiming(0),
        },
      ],
      backgroundColor:
        theme === 'light' ? withTiming('#fff') : withTiming('#000'),
    };
  });

  const backgroundStyle = useAnimatedStyle(() => {
    return {
      backgroundColor:
        theme === 'light' ? withTiming('#fff') : withTiming('#000'),
    };
  });
  const tabStyle = useAnimatedStyle(() => {
    return {
      backgroundColor:
        theme === 'light' ? withTiming('#F4F4F4') : withTiming('#1C1C1C'),
    };
  });
  const textStyle = useAnimatedStyle(() => {
    return {
      color: theme === 'light' ? withTiming('#000') : withTiming('#E5E5E5'),
    };
  });

  const roundStyle = useAnimatedStyle(() => {
    return {
      backgroundColor:
        theme === 'light' ? withTiming('#FFFA7E') : withTiming('#E5E5E5'),
    };
  });

  const coverStyle = useAnimatedStyle(() => {
    return {
      width: theme === 'light' ? withTiming(0) : withSpring(150),
      backgroundColor:
        theme === 'light' ? withTiming('#fff') : withTiming('#000'),
    };
  });

  const themeChange = (theme: string) => {
    setTabTheme(theme);
    if (theme !== 'system') {
      setTheme(theme);
    }
  };

  return (
    <Animated.View style={[styles.container, backgroundStyle]}>
      <StatusBar
        animated
        backgroundColor={theme === 'light' ? '#fff' : '#000'}
        barStyle={theme === 'light' ? 'dark-content' : 'light-content'}
      />
      <Animated.View style={[styles.round, roundStyle]}>
        <Animated.View style={[styles.moonCover, coverStyle]} />
      </Animated.View>
      <Animated.View style={[styles.tab, tabStyle]}>
        {tabs.map((item, index) => (
          <Pressable
            onPress={() => themeChange(item)}
            style={styles.tabItem}
            key={index.toString()}>
            <Animated.Text style={[styles.tabText, textStyle]}>
              {item}
            </Animated.Text>
          </Pressable>
        ))}
        <Animated.View style={[styles.indicator, indicatorStyle]} />
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  round: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#FFFA7E',
    alignItems: 'flex-end',
    overflow: 'hidden',
  },
  tab: {
    width: 310,
    height: 55,
    padding: 5,
    flexDirection: 'row',
    borderRadius: 30,
    backgroundColor: '#F4F4F4',
    marginTop: 30,
  },
  tabItem: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  indicator: {
    width: 100,
    height: '100%',
    borderRadius: 30,
    backgroundColor: '#fff',
    position: 'absolute',
    zIndex: -1,
    top: 5,
    left: 5,
  },
  tabText: {
    textTransform: 'capitalize',
    fontSize: 16,
  },
  moonCover: {
    width: 150,
    aspectRatio: 1,
    borderRadius: 75,
    transform: [{translateX: 20}, {translateY: -20}],
    backgroundColor: '#000',
  },
});

export default App;
