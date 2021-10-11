import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import styled from 'styled-components/native'
import { MainNavigationProp } from '../routing/types'
import { MainRoutes } from '../routing/routes'
import DefaultPage from '../components/shells/DefaultPage'
import { useReduxDispatch, useReduxSelector } from '../redux'
import { selectStages, setCompletion, Stage } from '../redux/ducks/progress'
import STAGES from '../data/STAGES'

type HomeScreenProps = {
    navigation: MainNavigationProp<MainRoutes.Home>
}

const getStageProgress = (stages: Stage[], id: string): Stage =>
    stages.find(stage => stage.id === id) || { id, completion: -2 }

const HomeScreen = ({ navigation }: HomeScreenProps): React.ReactElement => {
    const dispatch = useReduxDispatch()
    const stageProgress = useReduxSelector(selectStages)
    const [stages, setStages] = useState<Stage[][]>([])
    const [animated, setAnimated] = useState<Stage[]>([])

    useEffect(() => {
        setStages(STAGES.map(act => act.map(stage => getStageProgress(stageProgress, stage.id))))
    }, [stageProgress])

    useEffect(() => {
        setAnimated(stages.flat(1).filter(stage => stage.completion === -1))
    }, [stages])

    useEffect(() => {
        setTimeout(() => {
            animated.forEach(stage => dispatch(setCompletion(stage.id, 0)))
        }, 1500)
    }, [animated, dispatch])

    return (
        <DefaultPage>
            <Text>HOME</Text>
            <Text>- - - -</Text>

            {stages.map((act, actIndex) => (
                // eslint-disable-next-line react/no-array-index-key
                <View key={`act_${actIndex}`}>
                    <Text>___________</Text>
                    <Text>{`| Act ${actIndex + 1}`}</Text>
                    <Text>-----------</Text>
                    {act.map(stage => {
                        const [currentAct, currentLevel] = stage.id.split('-')
                        return (
                            <TouchableOpacity
                                key={stage.id}
                                onPress={
                                    stage.completion < 0
                                        ? undefined
                                        : () =>
                                              navigation.navigate(MainRoutes.Stage, {
                                                  act: currentAct,
                                                  level: currentLevel,
                                              })
                                }
                            >
                                <Text
                                    style={{ color: stage.completion === -1 ? 'green' : 'black' }}
                                >
                                    &gt; Stage️
                                    {stage.id}
                                    {stage.completion < 0
                                        ? ' (locked) '
                                        : ` (${stage.completion}%) `}
                                    &lt;
                                </Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            ))}
            <Text>- - - -</Text>

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
