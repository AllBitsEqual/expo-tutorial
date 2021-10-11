type StageType = 'BATTLE' | 'STORY'

type StageData = {
    id: string
    pre: string
    name: string
    type: StageType
    description?: string
}

const STAGES: StageData[][] = [
    [
        { id: '1-1', pre: 'init', name: 'Prelude', type: 'BATTLE' },
        { id: '1-2', pre: '1-1', name: 'Basics 01', type: 'BATTLE' },
        { id: '1-3', pre: '1-2', name: 'Basics 02', type: 'BATTLE' },
    ],
    [
        { id: '2-1', pre: 'init', name: 'A new Beginning', type: 'BATTLE' },
        { id: '2-2', pre: '2-1', name: 'Forging ahead', type: 'STORY' },
    ],
]

export default STAGES
