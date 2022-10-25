import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'

import Home from '../screens/Home'
import Necesidades from '../screens/Necesidades'
import Seguridad from '../screens/Seguridad'
import Perfil from '../screens/Perfil'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const Tab = createMaterialBottomTabNavigator()

const MainTab = () => {
    return (
        <Tab.Navigator
            initialRouteName='MainTab'
            activeColor='#ffffff'
            inactiveColor='#D1D1D1'
            shifting={true}
            barStyle={{
                backgroundColor: "#DF0E01",
                position: "relative",
                overflow: "visible",
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
            }}
        >
            <Tab.Screen
                name="MainTab"
                component={Home}
                options={{
                    tabBarLabel: 'Inicio',
                    tabBarIcon: ({ color }) => {
                        return <MaterialCommunityIcons name="home" size={26} color={color}></MaterialCommunityIcons>
                    }
                }}
            />
            <Tab.Screen
                name="Seguridad"
                component={Seguridad}
                options={{
                    tabBarLabel: 'Seguridad',
                    tabBarIcon: ({ color }) => {
                        return <MaterialCommunityIcons name="plus-circle-outline" size={26} color={color}></MaterialCommunityIcons>
                    }
                }}
            />
            <Tab.Screen
                name="Necesidades"
                component={Necesidades}
                options={{
                    tabBarLabel: 'Necesidades',
                    tabBarIcon: ({ color }) => {
                        return <MaterialCommunityIcons name="playlist-check" size={26} color={color}></MaterialCommunityIcons>
                    }
                }}
            />
            <Tab.Screen
                name="Perfil"
                component={Perfil}
                options={{
                    tabBarLabel: 'Perfil',
                    tabBarIcon: ({ color }) => {
                        return <MaterialCommunityIcons name="account" size={26} color={color}></MaterialCommunityIcons>
                    }
                }}
            />
        </Tab.Navigator>
    )
}
export default MainTab