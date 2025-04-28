import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { VictoryPie } from 'victory-native';
import axios from 'axios';
import Svg, { G } from 'react-native-svg';
import { useTheme } from '@react-navigation/native';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#a4de6c', '#d0ed57'];

const CategoryPieChart = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { colors } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://finance-viz-backend.onrender.com/api/transactions');
        const grouped = response.data.reduce((acc, t) => {
          if (t.type === 'expense') {
            acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
          }
          return acc;
        }, {});

        const formatted = Object.entries(grouped).map(([key, value], index) => ({
          x: key,
          y: value,
          color: COLORS[index % COLORS.length]
        }));

        setCategoryData(formatted);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={[styles.errorText, { color: colors.text }]}>
          Error loading data: {error}
        </Text>
      </View>
    );
  }

  if (categoryData.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={[styles.emptyText, { color: colors.text }]}>
          No expense data available.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.chartContainer}>
      <Svg width="100%" height={300}>
        <G>
          <VictoryPie
            data={categoryData}
            width={300}
            height={300}
            colorScale={COLORS}
            innerRadius={50}
            padAngle={2}
            style={{
              labels: {
                fill: colors.text,
                fontSize: 12,
                fontWeight: 'bold'
              }
            }}
            labelRadius={({ innerRadius }) => innerRadius + 45}
            labelPlacement="parallel"
            animate={{
              duration: 1000,
              onLoad: { duration: 500 }
            }}
          />
        </G>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
  },
  chartContainer: {
    height: 300,
    width: '100%',
    alignItems: 'center',
  },
  errorText: {
    textAlign: 'center',
    fontSize: 16,
    marginHorizontal: 20,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    marginHorizontal: 20,
  },
});

export default CategoryPieChart;