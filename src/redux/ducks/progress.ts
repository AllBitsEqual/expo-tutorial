import { createAction, createReducer, Middleware } from '@reduxjs/toolkit'
import { RootState } from '../index'
import STAGES from '../../data/STAGES'
import { MainRoutes } from '../../routing/routes'
import { navigate } from '../../routing/rootNavigatoin'

export type Stage = {
    id: string
    completion: number
}

type Progress = {
    stages: Stage[]
}

const initialState: Progress = {
    stages: [
        {
            id: '1-1',
            completion: -1,
        },
    ],
}

export const updateCompletion = createAction(
    '[PROGRESS] Update Completion',
    (id: string, completion: number) => ({
        payload: {
            id,
            completion,
        },
    }),
)
export const setCompletion = createAction(
    '[PROGRESS] Set Completion',
    (id: string, completion: number) => ({
        payload: {
            id,
            completion,
        },
    }),
)
export const updateStages = createAction('[PROGRESS] Set Stages', (stages: Stage[]) => ({
    payload: { stages },
}))

export const selectStages = (state: RootState): Stage[] => state.progress.stages

const getNewStages = (stages: Stage[], id: string, completion: number): Stage[] => {
    const affectedStage = stages.find(stage => stage.id === id)
    const newUnlockedStages: Stage[] = []

    if (affectedStage && affectedStage.completion < 25 && completion >= 25) {
        newUnlockedStages.push(
            ...STAGES.flat(1)
                .filter(STAGE => STAGE.pre === affectedStage?.id)
                .map(STAGE => ({
                    id: STAGE.id,
                    completion: -1,
                })),
        )
    }

    const newStages = stages.map((stage: Stage) => {
        if (stage.id === id) {
            return {
                ...stage,
                completion: Math.max(completion, stage.completion),
            }
        }

        return stage
    })

    newStages.push(...newUnlockedStages)

    return newStages
}

export const progressMiddleware: Middleware =
    ({ dispatch, getState }) =>
    next =>
    action => {
        next(action)

        if (updateCompletion.match(action)) {
            const { id, completion } = action.payload
            const { progress } = getState()
            const newStages = getNewStages(progress.stages, id, completion)
            dispatch(updateStages(newStages))
            setTimeout(() => navigate(MainRoutes.Home), 1000)
        }
    }

const progressReducer = createReducer(initialState, builder => {
    builder
        .addCase(setCompletion, (state, action) => {
            const { id, completion } = action.payload
            const { stages } = state
            const newStages = getNewStages(stages, id, completion)
            return {
                ...state,
                stages: newStages,
            }
        })
        .addCase(updateStages, (state, action) => {
            const { stages } = action.payload
            return {
                ...state,
                stages,
            }
        })
})

export default progressReducer
