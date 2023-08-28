import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import ForgotPassword from '../screens/ForgotPassword';
import ProblemReport from '../screens/ProblemReport';
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
        <NotAuthenticatedStack.Screen         
        options={{
          headerShown: false 
        }} 
        name="ForgotPassword" 
        component={ForgotPassword} 
        />
        <NotAuthenticatedStack.Screen         
        options={{
          headerShown: false 
        }} 
        name="ProblemReport" 
        component={ProblemReport} 
        />
      </NotAuthenticatedStack.Navigator>
    );
  };