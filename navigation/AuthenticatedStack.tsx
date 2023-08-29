import { createStackNavigator } from '@react-navigation/stack';
import StatsScreen from '../screens/StatsScreen';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfile from '../screens/EditProfile';
import SecurityScreen from '../screens/SecurityScreen';
import PaymentMethodsScreen from '../screens/PaymentMethodsScreen';
import ProblemReport from '../screens/ProblemReport';
import TermsAndServicesScreen from '../screens/TermsAndServicesScreen';
import HelpAndSupportScreen from '../screens/HelpAndSupportScreen';
import { AuthenticatedStackType } from '../interfaces/interfaces';
const AuthenticatedStack = createStackNavigator();
export const AuthenticatedStackScreen: React.FC<AuthenticatedStackType> = () => {
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
        <AuthenticatedStack.Screen 
        name="EditProfile" 
        component={EditProfile}         
        options={{
          headerShown: false 
        }} />
        <AuthenticatedStack.Screen 
        name="SecurityScreen" 
        component={SecurityScreen}         
        options={{
          headerShown: false 
        }} />
        <AuthenticatedStack.Screen 
        name="PaymentMethodsScreen" 
        component={PaymentMethodsScreen}         
        options={{
          headerShown: false 
        }} />
        <AuthenticatedStack.Screen 
        name="TermsAndServicesScreen" 
        component={TermsAndServicesScreen}         
        options={{
          headerShown: false 
        }} />
        <AuthenticatedStack.Screen 
        name="HelpAndSupportScreen" 
        component={HelpAndSupportScreen}         
        options={{
          headerShown: false 
        }} />
        <AuthenticatedStack.Screen
        options={{
          headerShown: false 
        }} 
        name="ProblemReport" 
        component={ProblemReport} 
        />
      </AuthenticatedStack.Navigator>
    );
  };