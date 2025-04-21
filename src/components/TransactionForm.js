import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Picker } from 'react-native';
import axios from 'axios';

const TransactionForm = () => {
  const [formData, setFormData] = useState({
    amount: '',
    date: '',
    description: '',
    category: 'Others',
    type: 'expense'
  });

  const handleSubmit = async () => {
    await axios.post('https://finance-viz-backend.onrender.com/api/budgets', formData);
    setFormData({ amount: '', date: '', description: '', category: 'Others', type: 'expense' });
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.formTitle}>Add Transaction</Text>
      
      <View style={styles.inputGroup}>
        <Text>Amount</Text>
        <TextInput
          style={styles.input}
          placeholder="Amount"
          value={formData.amount}
          onChangeText={(text) => setFormData({ ...formData, amount: text })}
          keyboardType="numeric"
          required
        />
      </View>

      <View style={styles.inputGroup}>
        <Text>Date</Text>
        <TextInput
          style={styles.input}
          value={formData.date}
          onChangeText={(text) => setFormData({ ...formData, date: text })}
          placeholder="YYYY-MM-DD"
          required
        />
      </View>

      <View style={styles.inputGroup}>
        <Text>Description</Text>
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={formData.description}
          onChangeText={(text) => setFormData({ ...formData, description: text })}
          required
        />
      </View>

      <View style={styles.inputGroup}>
        <Text>Category</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={formData.category}
            onValueChange={(itemValue) => setFormData({ ...formData, category: itemValue })}
          >
            <Picker.Item label="Food" value="Food" />
            <Picker.Item label="Utilities" value="Utilities" />
            <Picker.Item label="Travel" value="Travel" />
            <Picker.Item label="Entertainment" value="Entertainment" />
            <Picker.Item label="Transport" value="Transport" />
            <Picker.Item label="Health" value="Health" />
            <Picker.Item label="Shopping" value="Shopping" />
            <Picker.Item label="Others" value="Others" />
          </Picker>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text>Type</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={formData.type}
            onValueChange={(itemValue) => setFormData({ ...formData, type: itemValue })}
          >
            <Picker.Item label="Expense" value="expense" />
            <Picker.Item label="Income" value="income" />
          </Picker>
        </View>
      </View>

      <Button title="Add" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginTop: 4,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginTop: 4,
  },
});

export default TransactionForm;