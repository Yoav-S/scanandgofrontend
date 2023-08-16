import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
const NotAuthenticatedStack = createStackNavigator();
export const NotAuthenticatedStackScreen: React.FC = () => {
    return (
      <NotAuthenticatedStack.Navigator>
        <NotAuthenticatedStack.Screen         
        options={{
          headerShown: false 
        }} 
        name="Login" 
        component={LoginScreen} 
        />
                <NotAuthenticatedStack.Screen         
        options={{
          headerShown: false 
        }} 
        name="Signup" 
        component={SignupScreen} 
        />
      </NotAuthenticatedStack.Navigator>
    );
  };