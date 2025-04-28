import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  FlatList,
  Modal,
  Alert
} from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const BudgetSection = () => {
  const [budgets, setBudgets] = useState([]);
  const [newBudget, setNewBudget] = useState({ 
    category: 'Food', 
    budgetAmount: '', 
    month: new Date() 
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchBudgets = async () => {
    try {
      setLoading(true);
      const res = await axios.get('https://finance-viz-backend.onrender.com/api/budgets');
      setBudgets(res.data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch budgets');
    } finally {
      setLoading(false);
    }
  };

  const addBudget = async () => {
    try {
      if (!newBudget.budgetAmount) {
        Alert.alert('Error', 'Please enter a budget amount');
        return;
      }

      const monthString = `${newBudget.month.getFullYear()}-${String(newBudget.month.getMonth() + 1).padStart(2, '0')}`;
      const budgetToSend = {
        ...newBudget,
        month: monthString,
        budgetAmount: parseFloat(newBudget.budgetAmount)
      };

      await axios.post('https://finance-viz-backend.onrender.com/api/budgets', budgetToSend);
      setNewBudget({ category: 'Food', budgetAmount: '', month: new Date() });
      fetchBudgets();
    } catch (error) {
      Alert.alert('Error', 'Failed to add budget');
    }
  };

  const deleteBudget = async (id) => {
    try {
      await axios.delete(`https://finance-viz-backend.onrender.com/api/budgets/${id}`);
      fetchBudgets();
    } catch (error) {
      Alert.alert('Error', 'Failed to delete budget');
    }
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setNewBudget({ ...newBudget, month: selectedDate });
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  const renderBudgetItem = ({ item }) => (
    <View style={styles.budgetItem}>
      <View style={styles.budgetInfo}>
        <Text style={styles.budgetCategory}>
          {item.category} - ₹{item.budgetAmount} ({item.month})
        </Text>
      </View>
      <TouchableOpacity 
        style={styles.deleteButton} 
        onPress={() => deleteBudget(item._id)}
      >
        <Text style={styles.deleteButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.budgetCard}>
      <View style={styles.budgetHeader}>
        <Text style={styles.budgetTitle}>Monthly Budgets</Text>
      </View>

      <View style={styles.budgetForm}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Category</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={newBudget.category}
              onValueChange={(itemValue) => 
                setNewBudget({ ...newBudget, category: itemValue })
              }
              style={styles.picker}
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
          <Text style={styles.label}>Budget Amount</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Amount"
            keyboardType="numeric"
            value={newBudget.budgetAmount}
            onChangeText={(text) => setNewBudget({ ...newBudget, budgetAmount: text })}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Month</Text>
          <TouchableOpacity 
            style={styles.input} 
            onPress={() => setShowDatePicker(true)}
          >
            <Text>
              {newBudget.month.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long' 
              })}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={newBudget.month}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          )}
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={addBudget}>
          <Text style={styles.submitButtonText}>Add Budget</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      ) : budgets.length === 0 ? (
        <View style={styles.emptyBudget}>
          <Text style={styles.emptyBudgetText}>No budgets added yet.</Text>
        </View>
      ) : (
        <FlatList
          data={budgets}
          renderItem={renderBudgetItem}
          keyExtractor={(item) => item._id}
          style={styles.budgetList}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  budgetCard: {
    backgroundColor: '#1e1e2f',
    borderRadius: 16,
    padding: 24,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  budgetHeader: {
    marginBottom: 20,
  },
  budgetTitle: {
    fontSize: 22,
    color: '#fff',
    fontWeight: '600',
  },
  budgetForm: {
    marginBottom: 24,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    color: '#a0a0a0',
    marginBottom: 8,
    fontSize: 14,
  },
  input: {
    backgroundColor: '#2d2d3d',
    borderRadius: 8,
    padding: 14,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#3d3d4d',
  },
  pickerContainer: {
    backgroundColor: '#2d2d3d',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#3d3d4d',
    overflow: 'hidden',
  },
  picker: {
    color: '#fff',
    height: 50,
  },
  submitButton: {
    backgroundColor: '#4a80f0',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
  budgetList: {
    marginTop: 10,
  },
  listContent: {
    paddingBottom: 20,
  },
  budgetItem: {
    backgroundColor: '#2d2d3d',
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#3d3d4d',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  budgetInfo: {
    flex: 1,
  },
  budgetCategory: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: '#ff4444',
    borderRadius: 6,
    padding: 8,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  emptyBudget: {
    padding: 16,
    alignItems: 'center',
  },
  emptyBudgetText: {
    color: '#a0a0a0',
    fontSize: 16,
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
});

export default BudgetSection;