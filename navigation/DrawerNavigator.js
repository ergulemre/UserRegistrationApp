import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabBar from './BottomTabBar';
import DrawerContent from './DrawerContent';
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={BottomTabBar} />
      {/* Add more screens to the drawer */}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
