/* eslint-disable curly */
import React from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import ActionSheet, {SheetManager} from 'react-native-actions-sheet';
import {View} from 'react-native';
const ExampleScreen = () => {
  return (
    <ActionSheet>
      <View>
        <Text>dsf</Text>
      </View>
    </ActionSheet>
  );
};

export default ExampleScreen;

const styles = StyleSheet.create({
  btn: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: 10,
    borderRadius: 0,
    width: '100%',
    borderWidth: 2,
    borderColor: 'white',
  },
  safeareview: {
    flex: 1,
    backgroundColor: '#e63946',
    padding: 12,
    paddingVertical: 20,
    alignItems: 'center',
    marginHorizontal: 12,
  },
  btnTitle: {
    color: 'white',
    fontWeight: 'bold',
  },
});
