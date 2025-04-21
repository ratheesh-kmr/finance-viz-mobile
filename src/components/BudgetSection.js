import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';

const BudgetSection = () => {
  const [budgets, setBudgets] = useState([]);
  const [newBudget, setNewBudget] = useState({ category: 'Food', budgetAmount: '', month: '2025-04' });

  const fetchBudgets = async () => {
    const res = await axios.get('https://finance-viz-backend.onrender.com/api/budgets');
    setBudgets(res.data);
  };

  const addBudget = async () => {
    await axios.post('https://finance-viz-backend.onrender.com/api/budgets', newBudget);
    setNewBudget({ category: 'Food', budgetAmount: '', month: '2025-04' });
    fetchBudgets();
  };

  const deleteBudget = async (id) => {
    await axios.delete(`https://finance-viz-backend.onrender.com/api/budgets/${id}`);
    fetchBudgets();
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  return (
    <View style={styles.budgetCard}>
      <View style={styles.budgetHeader}>
        <Text style={styles.headerText}>Monthly Budgets</Text>
      </View>
      
      <View style={styles.formGroup}>
        <Text>Category</Text>
        <View style={styles.picker}>
          <Picker
            selectedValue={newBudget.category}
            onValueChange={(itemValue) => setNewBudget({ ...newBudget, category: itemValue })}
          >
            <Picker.Item label="Food" value="Food" />
            <Picker.Item label="Utilities" value="Utilities" />
            <Picker.Item label="Travel" value="Travel" />
            <Picker.Item label="Entertainment" value="Entertainment" />
            <Picker.Item label="Others" value="Others" />
          </Picker>
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text>Budget Amount</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Amount"
          value={newBudget.budgetAmount}
          onChangeText={(text) => setNewBudget({ ...newBudget, budgetAmount: text })}
          keyboardType="numeric"
          required
        />
      </View>

      <View style={styles.formGroup}>
        <Text>Month</Text>
        <TextInput
          style={styles.input}
          value={newBudget.month}
          onChangeText={(text) => setNewBudget({ ...newBudget, month: text })}
          placeholder="YYYY-MM"
          required
        />
      </View>

      <Button title="Add Budget" onPress={addBudget} />

      <FlatList
        data={budgets}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={<Text style={styles.emptyText}>No budgets added yet.</Text>}
        renderItem={({ item }) => (
          <View style={styles.budgetItem}>
            <View style={styles.budgetInfo}>
              <Text>{item.category} - ₹{item.budgetAmount} ({item.month})</Text>
            </View>
            <TouchableOpacity onPress={() => deleteBudget(item._id)}>
              <Text style={styles.deleteText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  budgetCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
  },
  budgetHeader: {
    marginBottom: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  formGroup: {
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginTop: 4,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginTop: 4,
  },
  budgetItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  budgetInfo: {
    flex: 1,
  },
  deleteText: {
    color: 'red',
  },
  emptyText: {
    textAlign: 'center',
    padding: 16,
    color: '#999',
  },
});

export default BudgetSection;