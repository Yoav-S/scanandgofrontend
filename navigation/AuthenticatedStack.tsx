import { createStackNavigator } from '@react-navigation/stack';
import StatsScreen from '../screens/StatsScreen';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import EditProfile from '../screens/EditProfile';
import SecurityScreen from '../screens/SecurityScreen';
import PaymentMethodsScreen from '../screens/PaymentMethodsScreen';
import ProblemReport from '../screens/ProblemReport';
import TermsAndServicesScreen from '../screens/TermsAndServicesScreen';
import HelpAndSupportScreen from '../screens/HelpAndSupportScreen';
import Cart from '../screens/Cart';
import AddCreditCardScreen from '../screens/AddCreditCardScreen';
import Checkout from '../screens/Checkout';
import TransactionScreen from '../screens/TransactionScreen';
import PurchaseDetailsScreen from '../screens/PurchaseDetailsScreen';
import TransactionView from '../components/UIComps/StatsScreenComps/TransactionView';
import TransactionsList from '../components/UIComps/StatsScreenComps/TransactionList';
import ScanningTourComp from '../screens/ScanningTourScreen';
import ForgotPassword from '../screens/ForgotPassword';
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
        <AuthenticatedStack.Screen
        options={{
          headerShown: false 
        }} 
        name="AddCreditCardScreen" 
        component={AddCreditCardScreen} 
        />
        <AuthenticatedStack.Screen
        options={{
          headerShown: false 
        }} 
        name="CartScreen" 
        component={Cart} 
        />
        <AuthenticatedStack.Screen
        options={{
          headerShown: false 
        }} 
        name="CheckoutScreen"  
        component={Checkout} 
        />
        <AuthenticatedStack.Screen
        options={{
          headerShown: false 
        }} 
        name="PurchaseScreen"   
        component={PurchaseDetailsScreen} 
        />
        <AuthenticatedStack.Screen
        options={{
          headerShown: false 
        }} 
        name="TransactionScreen"   
        component={TransactionScreen} 
        />
      <AuthenticatedStack.Screen
      options={{
        headerShown: false 
      }} 
      name="TransactionView"   
      component={TransactionView} 
      />
      <AuthenticatedStack.Screen
      options={{
        headerShown: false 
      }} 
      name="TransactionList"   
      component={TransactionsList} 
      />
            <AuthenticatedStack.Screen
      options={{
        headerShown: false 
      }} 
      name="ScanningTour"   
      component={ScanningTourComp} 
      />
                  <AuthenticatedStack.Screen
      options={{
        headerShown: false 
      }} 
      name="ForgotPassword"   
      component={ForgotPassword} 
      />
      </AuthenticatedStack.Navigator>
    );
  };