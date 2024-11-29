import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home/home';
import BancoD from '../screens/BancoD/BancoD';
import Servidor from '../screens/Servidor/server';

import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';

const Tab = createBottomTabNavigator();

const Rotas = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen 
            name="Home" 
            component={HomeScreen}
            options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                    <Entypo name="home" size={24} color="black" />
                ),
            }}
            />
            <Tab.Screen 
            name="Banco" 
            component={BancoD}
            options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                    <Feather name="search" size={24} color="black" />
                ),
            }}
             />
            <Tab.Screen
            name="Upload"
            component={Servidor}
            options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                    <Feather name="upload" size={24} color="black" />
                ),
            }}
            />

        </Tab.Navigator>
    );
};

export default Rotas;