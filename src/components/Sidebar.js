// Sidebar.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const currentPath = route.name;

  const handleToggle = () => {
    setCollapsed(!collapsed);
  };

  const MenuItem = ({ label, screenName }) => (
    <TouchableOpacity
      style={[
        styles.navItem,
        currentPath === screenName && styles.activeNavItem,
      ]}
      onPress={() => navigation.navigate(screenName)}
    >
      {/* You can replace Text with an Icon later */}
      <Text style={styles.iconPlaceholder}>🔹</Text>
      {!collapsed && <Text style={styles.navText}>{label}</Text>}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.sidebar, collapsed && styles.sidebarCollapsed]}>
      {/* Header */}
      <View style={styles.sidebarHeader}>
        <Text style={styles.iconPlaceholder}>💰</Text>
        {!collapsed && (
          <>
            <Text style={styles.logoText}>FinanceViz</Text>
            <Text style={styles.subText}>Web app</Text>
          </>
        )}
      </View>

      {/* Navigation */}
      <View style={styles.sidebarNav}>
        <MenuItem label="Home" screenName="Home" />
        <MenuItem label="Analytics" screenName="Analytics" />
        <MenuItem label="Budget" screenName="BudgetSection" />
      </View>

      {/* Footer */}
      <View style={styles.sidebarFooter}>
        <Text style={styles.iconPlaceholder}>⭐</Text>
        {!collapsed && <Text style={styles.footerText}>Developed by Ratheesh Kumar</Text>}
      </View>

      {/* Toggle Button */}
      <TouchableOpacity style={styles.toggleButton} onPress={handleToggle}>
        <Text style={styles.toggleButtonText}>{collapsed ? '➔' : '←'}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    width: 250,
    backgroundColor: '#111520',
    height: '100%',
    paddingVertical: 20,
    justifyContent: 'space-between',
    position: 'relative',
  },
  sidebarCollapsed: {
    width: 80,
  },
  sidebarHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  sidebarNav: {
    flexGrow: 1,
  },
  sidebarFooter: {
    padding: 20,
    alignItems: 'center',
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    gap: 10,
  },
  activeNavItem: {
    backgroundColor: '#3e7bfa',
    borderRadius: 10,
  },
  navText: {
    color: '#fff',
    fontSize: 16,
  },
  logoText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 8,
  },
  subText: {
    color: '#ccc',
    fontSize: 12,
  },
  footerText: {
    color: '#fff',
    marginTop: 8,
    fontSize: 12,
    textAlign: 'center',
  },
  toggleButton: {
    position: 'absolute',
    top: 30,
    right: -20,
    width: 40,
    height: 40,
    backgroundColor: '#3e7bfa',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  toggleButtonText: {
    color: '#fff',
    fontSize: 20,
  },
  iconPlaceholder: {
    fontSize: 20,
    color: '#fff',
  },
});

export default Sidebar;
