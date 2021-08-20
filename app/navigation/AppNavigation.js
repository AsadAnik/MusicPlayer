import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import AudioList from '../screens/AudioList.js';
import Player from '../screens/Player';
import PlayList from '../screens/PlayList';
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();

// App Navigation..
const AppNavigation = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name={'AudioList'}
                component={AudioList}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Ionicons name="headset" size={size} color={color} />
                    ),
                    headerTitle: 'All Music',
                    headerStatusBarHeight: 10,
                }}

            />

            <Tab.Screen
                name={'Player'}
                component={Player}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <FontAwesome5 name="compact-disc" size={size} color={color} />
                    ),
                    headerShown: false
                }}
            />

            <Tab.Screen
                name={'PlayList'}
                component={PlayList}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <MaterialIcons name="library-music" size={size} color={color} />
                    )
                }}
            />
        </Tab.Navigator>
    );
};

export default AppNavigation;
