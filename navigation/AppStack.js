import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import DrawerNavigator from './DrawerNavigator';
import CustomSplashScreen from '../components/CustomSplashScreen';

const AppStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="SplashScreen" component={CustomSplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen
        name="Home"
        component={DrawerNavigator}
        options={{ headerShown: false }} // Hide header for drawer navigator
      />
    </Stack.Navigator>
  );
};

export default AppStack;
