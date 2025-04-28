import React from 'react';
import { View, Text, ScrollView, useWindowDimensions, StyleSheet } from 'react-native';
import CategoryPieChart from '../Charts/CategoryPieChart';
import IncomeExpenseBarChart from '../Charts/IncomeExpenseBarChart';
import MonthlyTrendLineChart from '../Charts/MonthlyTrendLineChart';

const Analytics = () => {
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 480;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentWrapper}>
        <View style={styles.breadcrumb}>
          <Text style={styles.breadcrumbText}>Dashboard</Text>
          <Text style={styles.breadcrumbArrow}>&gt;</Text>
          <Text style={styles.breadcrumbText}>Analytics</Text>
        </View>
        
        <Text style={styles.pageTitle}>Analytics Overview</Text>

        <View style={styles.chartsGrid}>
          <View style={[styles.chartBox, isSmallScreen && styles.smallChartBox]}>
            <Text style={[styles.chartTitle, isSmallScreen && styles.smallChartTitle]}>
              Category-wise Spending
            </Text>
            <CategoryPieChart />
          </View>

          <View style={[styles.chartBox, isSmallScreen && styles.smallChartBox]}>
            <Text style={[styles.chartTitle, isSmallScreen && styles.smallChartTitle]}>
              Income vs Expenses
            </Text>
            <IncomeExpenseBarChart />
          </View>

          <View style={[styles.chartBox, isSmallScreen && styles.smallChartBox]}>
            <Text style={[styles.chartTitle, isSmallScreen && styles.smallChartTitle]}>
              Monthly Trends
            </Text>
            <MonthlyTrendLineChart />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 16,
  },
  contentWrapper: {
    flex: 1,
  },
  breadcrumb: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  breadcrumbText: {
    color: '#a0a0a0',
    fontSize: 14,
  },
  breadcrumbArrow: {
    color: '#a0a0a0',
    marginHorizontal: 8,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 24,
  },
  chartsGrid: {
    flexDirection: 'column',
    gap: 16,
  },
  chartBox: {
    backgroundColor: '#1e1e2f',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 16,
  },
  chartTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  smallChartBox: {
    padding: 12,
    borderRadius: 10,
  },
  smallChartTitle: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default Analytics;