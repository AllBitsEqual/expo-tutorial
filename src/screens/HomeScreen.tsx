import React from 'react'
import { Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import styled from 'styled-components/native'
import { MainNavigationProp } from '../routing/types'
import { MainRoutes } from '../routing/routes'
import DefaultPage from '../components/shells/DefaultPage'

type HomeScreenProps = {
    navigation: MainNavigationProp<MainRoutes.Home>
}
const HomeScreen = ({ navigation }: HomeScreenProps): React.ReactElement => {
    return (
        <DefaultPage>
            <Text>HOME</Text>

            <TouchableOpacity
                onPress={() => navigation.navigate(MainRoutes.Stage, { act: 1, level: 1 })}
            >
                <Text>&lt; Stage️ 1-1 &gt;</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate(MainRoutes.Stage, { act: 1, level: 2 })}
            >
                <Text>&lt; Stage️ 1-2 &gt;</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate(MainRoutes.Stage, { act: 1, level: 3 })}
            >
                <Text>&lt; Stage️ 1-3 &gt;</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate(MainRoutes.Stage, { act: 1, level: 1 })}
            >
                <Text>&lt; Continue Current Stage️ &gt;</Text>
            </TouchableOpacity>

            <StyledSettingsButton>
                <TouchableOpacity onPress={() => navigation.navigate(MainRoutes.Settings)}>
                    <Text>⚙️</Text>
                </TouchableOpacity>
            </StyledSettingsButton>
        </DefaultPage>
    )
}

const StyledSettingsButton = styled.View`
    position: absolute;
    top: 0;
    right: 0;
    padding: 6px;
    border: 2px solid #ccc;
`

export default HomeScreen
