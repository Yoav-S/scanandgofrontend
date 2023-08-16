import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
const NotAuthenticatedStack = createStackNavigator();
export const AuthenticatedStackScreen: React.FC = () => {
    return (
      <NotAuthenticatedStack.Navigator>
        <NotAuthenticatedStack.Screen name="Home" component={LoginScreen} />

      </NotAuthenticatedStack.Navigator>
    );
  };