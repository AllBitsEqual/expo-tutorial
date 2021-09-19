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
