import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Sidebar from './Sidebar';
import SummaryDashboard from './SummaryDashboard';
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';

const AppLayout = () => {
  return (
    <View style={styles.appContainer}>
      <Sidebar />
      <View style={styles.mainContent}>
        <View style={styles.contentWrapper}>
          <View style={styles.breadcrumb}>
            <Text>Dashboard</Text>
            <Text> &gt; </Text>
            <Text>Home</Text>
          </View>
          <Text style={styles.pageTitle}>Overview</Text>

          <SummaryDashboard />

          <View style={styles.chartsContainer}>
            <View style={[styles.chartCard, styles.large]}>
              <Text style={styles.chartTitle}>Spending Breakdown</Text>
              {/* Spending chart component */}
            </View>
            <View style={[styles.chartCard, styles.large]}>
              <Text style={styles.chartTitle}>Income vs Expenses</Text>
              {/* Income/expense chart component */}
            </View>
          </View>

          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Add New Transaction</Text>
            <TransactionForm />
          </View>

          <TransactionList />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  mainContent: {
    flex: 1,
    padding: 16,
  },
  contentWrapper: {
    flex: 1,
  },
  breadcrumb: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  chartsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  chartCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  large: {
    width: '48%',
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  formSection: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default AppLayout;