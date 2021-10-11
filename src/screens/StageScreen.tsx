import React from 'react'
import { Text, Button } from 'react-native'
import { NativeStackScreenProps } from 'react-native-screens/native-stack'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { MainRoutes, MainStackParamList } from '../routing/routes'
import DefaultPage from '../components/shells/DefaultPage'
import { useReduxDispatch, useReduxSelector } from '../redux'
import { selectStages, updateCompletion } from '../redux/ducks/progress'

type StageScreenProps = NativeStackScreenProps<MainStackParamList, MainRoutes.Stage>

const StageScreen = ({ navigation, route }: StageScreenProps): React.ReactElement => {
    const dispatch = useReduxDispatch()
    const stageProgress = useReduxSelector(selectStages)
    const {
        params: { act, level },
    } = route
    const stageId = `${act}-${act}`
    const progress = stageProgress.find(stage => stage.id === stageId)?.completion || 0
    return (
        <DefaultPage>
            <Text>{`Stage ${act}-${level} (${progress}%)`}</Text>
            <Text>- - -</Text>

            <TouchableOpacity onPress={() => dispatch(updateCompletion(`${act}-${level}`, 3))}>
                <Text>Fail (3%)</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => dispatch(updateCompletion(`${act}-${level}`, 25))}>
                <Text>Clear (25%)</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => dispatch(updateCompletion(`${act}-${level}`, 50))}>
                <Text>Win (50%)</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => dispatch(updateCompletion(`${act}-${level}`, 75))}>
                <Text>Perfect (75%)</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => dispatch(updateCompletion(`${act}-${level}`, 100))}>
                <Text>Master (100%)</Text>
            </TouchableOpacity>
            <Button title="back" onPress={() => navigation.goBack()} />
        </DefaultPage>
    )
}

export default StageScreen
