import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ActionDetails from './screens/ActionDetail';
import Actions from './screens/Actions';
import AddAction from './screens/AddAction';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Action" component={Actions} options={{
          title: 'Acciones',
          headerStyle: {
            backgroundColor: '#344e41',
          },
          headerTintColor: '#fff',
        }} />
        <Stack.Screen name="AddAction" component={AddAction} options={{
          title: 'Acciones',
          headerStyle: {
            backgroundColor: '#344e41',
          },
          headerTintColor: '#fff',
        }} />
        <Stack.Screen name="ActionDetails" component={ActionDetails} options={{
          title: 'Acciones',
          headerStyle: {
            backgroundColor: '#344e41',
          },
          headerTintColor: '#fff',
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
