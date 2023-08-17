import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import StatsScreen from '../screens/StatsScreen';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ProfileScreen from '../screens/ProfileScreen';
const AuthenticatedStack = createStackNavigator();
export const AuthenticatedStackScreen: React.FC = () => {
    return (
      <AuthenticatedStack.Navigator>
        <AuthenticatedStack.Screen 
        name="Home" 
        component={HomeScreen}         
        options={{
          headerShown: false 
        }} 
        />
        <AuthenticatedStack.Screen 
        name="Stats" 
        component={StatsScreen}         
        options={{
          headerShown: false 
        }} 
        />
        <AuthenticatedStack.Screen 
        name="Settings" 
        component={SettingsScreen}         
        options={{
          headerShown: false 
        }} />
        <AuthenticatedStack.Screen 
        name="Profile" 
        component={ProfileScreen}         
        options={{
          headerShown: false 
        }} />
      </AuthenticatedStack.Navigator>
    );
  };