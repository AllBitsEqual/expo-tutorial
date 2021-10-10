import React from 'react'
import { Text, Button } from 'react-native'
import { NativeStackScreenProps } from 'react-native-screens/native-stack'
import { MainRoutes, MainStackParamList } from '../routing/routes'
import DefaultPage from '../components/shells/DefaultPage'

type StageScreenProps = NativeStackScreenProps<MainStackParamList, MainRoutes.Stage>

const StageScreen = ({ navigation, route }: StageScreenProps): React.ReactElement => {
    const {
        params: { act, level },
    } = route
    return (
        <DefaultPage>
            <Text>{`Stage ${act}-${level}`}</Text>
            <Button title="back" onPress={() => navigation.goBack()} />
        </DefaultPage>
    )
}

export default StageScreen
