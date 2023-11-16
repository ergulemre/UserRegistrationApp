import { NavigationContainer } from '@react-navigation/native';
import AuthProvider from './AuthContext';
import Navigator from './navigation/Navigator';
import { GlobalContextProvider } from './context/GlobalContext';

const App = () => {
  return (
    <NavigationContainer>
      <GlobalContextProvider>
        <Navigator />
      </GlobalContextProvider>
    </NavigationContainer>
  );
};

export default App;
