import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Drawer} from 'react-native-paper';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/AntDesign';

const DrawerContent = (props) => {
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View>
          <Text>Drawer Content</Text>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section>
        <DrawerItem
          label="Logout"
          icon={({color, size}) => (
            <Icon name="logout" color={color} size={size} />
          )}
        />
      </Drawer.Section>
    </View>
  );
};

export default DrawerContent;
