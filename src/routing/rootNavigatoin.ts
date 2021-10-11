import { createNavigationContainerRef } from '@react-navigation/native'
import { MainStackParamList } from './routes'

export const navigationRef = createNavigationContainerRef<MainStackParamList>()

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function navigate(name: any, params?: any) {
    if (navigationRef.isReady()) {
        navigationRef.navigate(name, params)
    }
}
