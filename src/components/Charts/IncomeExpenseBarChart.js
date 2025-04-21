import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { BarChart, XAxis, YAxis, Grid } from 'react-native-svg-charts';
import axios from 'axios';

const IncomeExpenseBarChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://finance-viz-backend.onrender.com/api/transactions');

        let income = 0;
        let expense = 0;

        res.data.forEach((t) => {
          const amt = Number(t.amount);
          if (t.type === 'income') {
            income += amt;
          } else if (t.type === 'expense') {
            expense += amt;
          }
        });

        setData([
          { value: income, svg: { fill: '#4CAF50' }, label: 'Income' },
          { value: expense, svg: { fill: '#F44336' }, label: 'Expenses' }
        ]);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={{ height: 300, padding: 16 }}>
      {data.length === 0 ? (
        <Text style={{ textAlign: 'center', color: 'gray' }}>Loading data...</Text>
      ) : (
        <View style={{ flexDirection: 'row', height: 200 }}>
          <YAxis
            data={data}
            yAccessor={({ item }) => item.value}
            contentInset={{ top: 20, bottom: 20 }}
            svg={{ fontSize: 10, fill: 'black' }}
          />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <BarChart
              style={{ flex: 1 }}
              data={data}
              yAccessor={({ item }) => item.value}
              contentInset={{ top: 20, bottom: 20 }}
              spacing={0.2}
            >
              <Grid direction={Grid.Direction.HORIZONTAL} />
            </BarChart>
            <XAxis
              data={data}
              xAccessor={({ item }) => item.label}
              formatLabel={(value, index) => data[index].label}
              contentInset={{ left: 30, right: 30 }}
              svg={{ fontSize: 10, fill: 'black' }}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default IncomeExpenseBarChart;