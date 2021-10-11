import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { useReduxDevToolsExtension } from '@react-navigation/devtools'
import { Text } from 'react-native'
import { HomeRoutes, HomeTabs, MainRoutes, MainStack } from './routes'
import { useReduxSelector } from '../redux'
import { selectIsRunning } from '../redux/ducks/appState'

import SplashScreen from '../screens/SplashScreen'
import AppLoadingScreen from '../screens/AppLoadingScreen'
import SettingsScreen from '../screens/SettingsScreen'
import HomeScreen from '../screens/HomeScreen'
import HomeScreenB from '../screens/HomeScreenB'
import HomeScreenC from '../screens/HomeScreenC'
import StageScreen from '../screens/StageScreen'
import { navigationRef } from './rootNavigatoin'

const Home = () => (
    <HomeTabs.Navigator
        screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused }) => {
                let iconName

                if (route.name === HomeRoutes.HomeA) {
                    iconName = focused ? '🔴' : '🔺'
                } else if (route.name === HomeRoutes.HomeB) {
                    iconName = focused ? '🔵' : '🔹'
                } else if (route.name === HomeRoutes.HomeC) {
                    iconName = focused ? '⚫' : '◾'
                }

                // You can return any component that you like here!
                return <Text>{iconName}</Text>
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
        })}
    >
        <HomeTabs.Screen name={HomeRoutes.HomeA} component={HomeScreen} />
        <HomeTabs.Screen name={HomeRoutes.HomeB} component={HomeScreenB} />
        <HomeTabs.Screen name={HomeRoutes.HomeC} component={HomeScreenC} />
    </HomeTabs.Navigator>
)

const MainNavigation = (): React.ReactElement => {
    const isAppRunning = useReduxSelector(selectIsRunning)

    useReduxDevToolsExtension(navigationRef)

    return (
        <NavigationContainer ref={navigationRef}>
            <MainStack.Navigator
                screenOptions={() => ({
                    headerShown: false,
                })}
            >
                {isAppRunning ? (
                    <>
                        <MainStack.Screen name={MainRoutes.Home} component={Home} />
                        <MainStack.Screen name={MainRoutes.Settings} component={SettingsScreen} />
                        <MainStack.Screen name={MainRoutes.Stage} component={StageScreen} />
                    </>
                ) : (
                    <>
                        <MainStack.Screen name={MainRoutes.Splash} component={SplashScreen} />
                        <MainStack.Screen
                            name={MainRoutes.AppLoading}
                            component={AppLoadingScreen}
                        />
                    </>
                )}
            </MainStack.Navigator>
        </NavigationContainer>
    )
}
export default MainNavigation
