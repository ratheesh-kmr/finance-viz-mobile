import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { LineChart, XAxis, YAxis, Grid } from 'react-native-svg-charts';
import axios from 'axios';
import dayjs from 'dayjs';

const MonthlyTrendLineChart = () => {
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    axios.get('https://finance-viz-backend.onrender.com/api/transactions').then((res) => {
      const grouped = {};

      res.data.forEach((t) => {
        const month = dayjs(t.date).format('MMM YYYY');
        grouped[month] = (grouped[month] || 0) + t.amount;
      });

      const sorted = Object.entries(grouped)
        .map(([month, amount]) => ({ month, amount }))
        .sort((a, b) => dayjs(a.month).unix() - dayjs(b.month).unix());

      setMonthlyData(sorted);
    });
  }, []);

  return (
    <View style={{ height: 300, padding: 16 }}>
      {monthlyData.length === 0 ? (
        <Text style={{ textAlign: 'center', color: 'gray' }}>Loading data...</Text>
      ) : (
        <View style={{ flexDirection: 'row', height: 200 }}>
          <YAxis
            data={monthlyData}
            yAccessor={({ item }) => item.amount}
            contentInset={{ top: 20, bottom: 20 }}
            svg={{ fontSize: 10, fill: 'black' }}
          />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <LineChart
              style={{ flex: 1 }}
              data={monthlyData}
              yAccessor={({ item }) => item.amount}
              xAccessor={({ index }) => index}
              contentInset={{ top: 20, bottom: 20 }}
              svg={{ stroke: 'rgb(134, 65, 244)' }}
            >
              <Grid direction={Grid.Direction.HORIZONTAL} />
            </LineChart>
            <XAxis
              data={monthlyData}
              xAccessor={({ index }) => index}
              formatLabel={(value, index) => dayjs(monthlyData[index].month).format('MMM')}
              contentInset={{ left: 30, right: 30 }}
              svg={{ fontSize: 10, fill: 'black' }}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default MonthlyTrendLineChart;