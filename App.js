import { createStackNavigator, createAppContainer } from 'react-navigation';
import MainScreen from './mainScreen'
import ClueScreen from './clueScreen'
import IPConfigScreen from './ipScreen'
import { styles } from './styles'

const AppNavigator = createStackNavigator(
    { MainScreen, ClueScreen, IPConfigScreen },
    {
        headerLayoutPreset: 'center',
        defaultNavigationOptions: {
            title: "SpyMaster",
            headerStyle: styles.TitleBar,
            headerTitleStyle: styles.TitleText,
            headerTintColor: 'white',
        }
    }
)

export default createAppContainer(AppNavigator)