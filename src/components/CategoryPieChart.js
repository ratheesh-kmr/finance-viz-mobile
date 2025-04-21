import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { PieChart } from 'react-native-svg-charts';
import axios from 'axios';

const CategoryPieChart = () => {
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    axios.get('https://finance-viz-backend.onrender.com/api/transactions').then(res => {
      const grouped = res.data.reduce((acc, t) => {
        if (t.type === 'expense') {
          acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
        }
        return acc;
      }, {});

      const formatted = Object.entries(grouped).map(([key, value]) => ({
        key,
        value,
        svg: { fill: getRandomColor() },
      }));

      setCategoryData(formatted);
    });
  }, []);

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <View style={{ height: 300, padding: 16 }}>
      {categoryData.length === 0 ? (
        <Text style={{ textAlign: 'center', color: 'gray' }}>No expense data available.</Text>
      ) : (
        <PieChart
          style={{ height: 200 }}
          valueAccessor={({ item }) => item.value}
          data={categoryData}
          spacing={0}
          outerRadius={'95%'}
        >
          {/* You can add labels or other components here */}
        </PieChart>
      )}
    </View>
  );
};

export default CategoryPieChart;