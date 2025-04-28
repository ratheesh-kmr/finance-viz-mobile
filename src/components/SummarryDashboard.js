// SummaryDashboard.js
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const SummaryDashboard = () => {
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [categoryTotals, setCategoryTotals] = useState({
    Food: 0,
    Travel: 0,
    Utilities: 0,
    Entertainment: 0,
    Others: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('https://finance-viz-backend.onrender.com/api/transactions');
        const transactions = response.data;

        let income = 0;
        let expenses = 0;
        let categories = {
          Food: 0,
          Travel: 0,
          Utilities: 0,
          Entertainment: 0,
          Others: 0,
        };

        transactions.forEach((transaction) => {
          const amt = Number(transaction.amount);
          if (transaction.type === 'income') {
            income += amt;
          } else if (transaction.type === 'expense') {
            expenses += amt;
            if (categories[transaction.category]) {
              categories[transaction.category] += amt;
            } else {
              categories[transaction.category] = amt;
            }
          }
        });

        setTotalIncome(income);
        setTotalExpenses(expenses);
        setCategoryTotals(categories);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const availableBalance = totalIncome - totalExpenses;

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#3e7bfa" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.dashboard}>
      <View style={styles.cardsContainer}>
        <MetricCard
          title="Total Income"
          value={totalIncome}
          trend="+7%"
          trendType="positive"
          subtitle="Last 30 days"
        />
        <MetricCard
          title="Total Expenses"
          value={totalExpenses}
          trend="-5%"
          trendType="negative"
          subtitle="Last 30 days"
        />
        <MetricCard
          title="Available Balance"
          value={availableBalance}
          subtitle="As of now"
          isBalance
        />
        {Object.entries(categoryTotals).map(([category, amount]) => (
          <MetricCard
            key={category}
            title={category}
            value={amount}
            subtitle="Last 30 days"
          />
        ))}
      </View>
    </ScrollView>
  );
};

const MetricCard = ({ title, value, subtitle, trend, trendType, isBalance }) => {
  return (
    <View style={styles.metricCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{title}</Text>
        {trend && (
          <Text style={[styles.trend, trendType === 'positive' ? styles.trendPositive : styles.trendNegative]}>
            {trend}
          </Text>
        )}
      </View>
      <Text
        style={[
          styles.cardValue,
          isBalance && (value >= 0 ? styles.valuePositive : styles.valueNegative),
        ]}
      >
        ₹{Number(value).toLocaleString()}
      </Text>
      <Text style={styles.cardSubtitle}>{subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  dashboard: {
    padding: 20,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metricCard: {
    backgroundColor: '#1e1e2f',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
    width: '48%',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#aaa',
  },
  trend: {
    fontSize: 14,
    fontWeight: '600',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
    overflow: 'hidden',
  },
  trendPositive: {
    backgroundColor: 'rgba(38, 197, 111, 0.1)',
    color: '#26c56f',
  },
  trendNegative: {
    backgroundColor: 'rgba(244, 91, 105, 0.1)',
    color: '#f45b69',
  },
  cardValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#777',
  },
  valuePositive: {
    color: '#28a745',
  },
  valueNegative: {
    color: '#dc3545',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SummaryDashboard;
