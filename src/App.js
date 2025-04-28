// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, Text, View } from 'react-native';
import SummaryDashboard from './components/SummaryDashboard';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import AnalyticsPage from './components/AnalyticsPage'; // Dummy placeholder screen
import BudgetSection from './components/BudgetSection'; // Dummy placeholder screen
import Sidebar from './components/Sidebar'; // Optional, if you want a custom drawer

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const HomeScreen = () => (
  <View style={{ flex: 1 }}>
    <SummaryDashboard />
    <View style={{ marginTop: 20, paddingHorizontal: 10 }}>
      <TransactionForm />
      <TransactionList />
    </View>
  </View>
);

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerShown: true,
          drawerStyle: {
            backgroundColor: '#111520',
            width: 240,
          },
          drawerLabelStyle: {
            color: '#fff',
          },
        }}
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Analytics" component={AnalyticsPagePlaceholder} />
        <Drawer.Screen name="BudgetSection" component={BudgetSectionPlaceholder} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

// Dummy Analytics Page
const AnalyticsPagePlaceholder = () => (
  <View style={{ flex: 1, backgroundColor: '#0b0e13', justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{ color: '#fff', fontSize: 20 }}>Analytics Page Coming Soon</Text>
  </View>
);

// Dummy Budget Section Page
const BudgetSectionPlaceholder = () => (
  <View style={{ flex: 1, backgroundColor: '#0b0e13', justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{ color: '#fff', fontSize: 20 }}>Budget Section Coming Soon</Text>
  </View>
);

export default App;
