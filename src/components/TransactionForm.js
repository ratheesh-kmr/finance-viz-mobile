// TransactionForm.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';

const TransactionForm = () => {
  const [formData, setFormData] = useState({
    amount: '',
    date: '',
    description: '',
    category: 'Others',
    type: 'expense'
  });

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post('https://finance-viz-backend.onrender.com/api/budgets', formData);
      Alert.alert('Success', 'Transaction Added Successfully!');
      setFormData({ amount: '', date: '', description: '', category: 'Others', type: 'expense' });
    } catch (error) {
      console.error('Error submitting form:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Add Transaction</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Amount</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter amount"
          keyboardType="numeric"
          value={formData.amount}
          onChangeText={(text) => handleChange('amount', text)}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Date</Text>
        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          value={formData.date}
          onChangeText={(text) => handleChange('date', text)}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter description"
          value={formData.description}
          onChangeText={(text) => handleChange('description', text)}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Category</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={formData.category}
            onValueChange={(itemValue) => handleChange('category', itemValue)}
            style={styles.picker}
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
        <Text style={styles.label}>Type</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={formData.type}
            onValueChange={(itemValue) => handleChange('type', itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Expense" value="expense" />
            <Picker.Item label="Income" value="income" />
          </Picker>
        </View>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Add</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 50,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff',
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    color: '#aaa',
  },
  input: {
    backgroundColor: '#1e1e2f',
    borderRadius: 6,
    padding: 10,
    color: '#fff',
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#444',
  },
  pickerWrapper: {
    backgroundColor: '#1e1e2f',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#444',
    overflow: 'hidden',
  },
  picker: {
    color: '#fff',
  },
  submitButton: {
    backgroundColor: '#3e7bfa',
    padding: 15,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default TransactionForm;
