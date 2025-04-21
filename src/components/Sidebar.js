import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Sidebar = () => {
  const navigation = useNavigation();
  
  return (
    <View style={styles.sidebar}>
      <View style={styles.sidebarHeader}>
        <View style={styles.appLogo}>
          <Text style={styles.logoIcon}>💰</Text>
          <Text style={styles.logoText}>FinanceViz</Text>
          <Text style={styles.logoSubtext}>Mobile App</Text>
        </View>
      </View>

      <View style={styles.navItems}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.navIcon}>🏠</Text>
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Analytics')}
        >
          <Text style={styles.navIcon}>📊</Text>
          <Text style={styles.navText}>Analytics</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Budget')}
        >
          <Text style={styles.navIcon}>🧮</Text>
          <Text style={styles.navText}>Budget</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sidebarFooter}>
        <Text style={styles.footerText}>Developed By Ratheesh Kumar</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    width: 250,
    backgroundColor: '#1e1e2f',
    padding: 16,
    justifyContent: 'space-between',
  },
  sidebarHeader: {
    marginBottom: 32,
  },
  appLogo: {
    alignItems: 'center',
  },
  logoIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  logoText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  logoSubtext: {
    color: '#aaa',
    fontSize: 12,
  },
  navItems: {
    flex: 1,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  navIcon: {
    fontSize: 20,
    marginRight: 12,
    color: 'white',
  },
  navText: {
    color: 'white',
    fontSize: 16,
  },
  sidebarFooter: {
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  footerText: {
    color: '#aaa',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default Sidebar; 