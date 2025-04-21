import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, StyleSheet, TextInput, Button } from 'react-native';
import axios from 'axios';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    description: '',
    category: '',
    date: '',
    amount: '',
    type: 'expense',
  });
  const [showModal, setShowModal] = useState(false);
  const [showAllTransactions, setShowAllTransactions] = useState(false);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get('https://finance-viz-backend.onrender.com/api/transactions');
      setTransactions(res.data);
    } catch (err) {
      console.error('Error fetching transactions:', err);
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`https://finance-viz-backend.onrender.com/api/transactions/${id}`);
      fetchTransactions();
    } catch (err) {
      console.error('Error deleting transaction:', err);
    }
  };

  const openEditModal = (transaction) => {
    setEditingId(transaction._id);
    setEditForm({
      description: transaction.description,
      category: transaction.category,
      date: transaction.date.slice(0, 10),
      amount: transaction.amount.toString(),
      type: transaction.type,
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setEditForm({});
  };

  const updateTransaction = async () => {
    try {
      await axios.put(`https://finance-viz-backend.onrender.com/api/transactions/${editingId}`, editForm);
      closeModal();
      fetchTransactions();
    } catch (err) {
      console.error('Error updating transaction:', err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Recent Transactions</Text>
        <TouchableOpacity onPress={() => setShowAllTransactions(!showAllTransactions)}>
          <Text style={styles.viewAllText}>
            {showAllTransactions ? 'Show Less' : 'View All'}
          </Text>
        </TouchableOpacity>
      </View>

      {transactions.length === 0 ? (
        <Text style={styles.emptyMessage}>No transactions yet.</Text>
      ) : (
        <FlatList
          data={showAllTransactions ? transactions : transactions.slice(0, 4)}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => openEditModal(item)}>
              <View style={styles.transactionItem}>
                <View style={styles.transactionInfo}>
                  <Text style={styles.description}>{item.description}</Text>
                  <Text style={styles.category}>{item.category}</Text>
                  <Text style={styles.date}>
                    {new Date(item.date).toLocaleDateString()}
                  </Text>
                  <Text
                    style={[
                      styles.amount,
                      item.type === 'income' ? styles.income : styles.expense,
                    ]}
                  >
                    {item.type === 'income' ? '+' : '-'}₹{Number(item.amount).toLocaleString()}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={(e) => {
                    e.stopPropagation();
                    deleteTransaction(item._id);
                  }}
                >
                  <Text style={styles.deleteText}>Remove</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
        />
      )}

      <Modal visible={showModal} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Edit Transaction</Text>
          
          <TextInput
            style={styles.modalInput}
            placeholder="Description"
            value={editForm.description}
            onChangeText={(text) => setEditForm({ ...editForm, description: text })}
            required
          />
          
          <TextInput
            style={styles.modalInput}
            placeholder="Category"
            value={editForm.category}
            onChangeText={(text) => setEditForm({ ...editForm, category: text })}
            required
          />
          
          <TextInput
            style={styles.modalInput}
            value={editForm.date}
            onChangeText={(text) => setEditForm({ ...editForm, date: text })}
            placeholder="YYYY-MM-DD"
            required
          />
          
          <TextInput
            style={styles.modalInput}
            placeholder="Amount"
            value={editForm.amount}
            onChangeText={(text) => setEditForm({ ...editForm, amount: text })}
            keyboardType="numeric"
            required
          />
          
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={editForm.type}
              onValueChange={(itemValue) => setEditForm({ ...editForm, type: itemValue })}
            >
              <Picker.Item label="Income" value="income" />
              <Picker.Item label="Expense" value="expense" />
            </Picker>
          </View>
          
          <View style={styles.modalButtons}>
            <Button title="Save" onPress={updateTransaction} />
            <Button title="Cancel" onPress={closeModal} color="#999" />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewAllText: {
    color: '#007AFF',
  },
  emptyMessage: {
    textAlign: 'center',
    marginVertical: 16,
    color: '#999',
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  transactionInfo: {
    flex: 1,
  },
  description: {
    fontWeight: 'bold',
  },
  category: {
    color: '#666',
  },
  date: {
    color: '#666',
  },
  amount: {
    fontWeight: 'bold',
  },
  income: {
    color: 'green',
  },
  expense: {
    color: 'red',
  },
  deleteText: {
    color: 'red',
  },
  modalContainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 12,
    marginBottom: 12,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginBottom: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default TransactionList;