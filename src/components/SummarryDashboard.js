import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
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

  useEffect(() => {
    const fetchData = async () => {
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
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const availableBalance = totalIncome - totalExpenses;

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
      <View style={styles.dashboard}>
        <View style={styles.metricCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Total Income</Text>
            <Text style={styles.positiveTrend}>+7%</Text>
          </View>
          <Text style={styles.cardValue}>₹{Number(totalIncome).toLocaleString()}</Text>
          <Text style={styles.cardSubtitle}>Last 30 days</Text>
        </View>

        <View style={styles.metricCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Total Expenses</Text>
            <Text style={styles.negativeTrend}>-5%</Text>
          </View>
          <Text style={styles.cardValue}>₹{Number(totalExpenses).toLocaleString()}</Text>
          <Text style={styles.cardSubtitle}>Last 30 days</Text>
        </View>

        <View style={styles.metricCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Available Balance</Text>
          </View>
          <Text style={[
            styles.cardValue,
            availableBalance >= 0 ? styles.positive : styles.negative
          ]}>
            ₹{Number(availableBalance).toLocaleString()}
          </Text>
          <Text style={styles.cardSubtitle}>As of now</Text>
        </View>

        {Object.entries(categoryTotals).map(([category, amount]) => (
          <View key={category} style={styles.metricCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{category}</Text>
            </View>
            <Text style={styles.cardValue}>₹{Number(amount).toLocaleString()}</Text>
            <Text style={styles.cardSubtitle}>Last 30 days</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    marginVertical: 8,
  },
  dashboard: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  metricCard: {
    width: 160,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  positiveTrend: {
    color: 'green',
    fontSize: 12,
  },
  negativeTrend: {
    color: 'red',
    fontSize: 12,
  },
  cardValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  positive: {
    color: 'green',
  },
  negative: {
    color: 'red',
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#666',
  },
});

export default SummaryDashboard;