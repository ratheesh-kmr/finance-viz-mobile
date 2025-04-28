// TransactionList.js
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, Modal, StyleSheet, ScrollView, Alert } from 'react-native';
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
      amount: transaction.amount,
      type: transaction.type,
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setEditForm({
      description: '',
      category: '',
      date: '',
      amount: '',
      type: 'expense',
    });
  };

  const updateTransaction = async () => {
    try {
      await axios.put(`https://finance-viz-backend.onrender.com/api/transactions/${editingId}`, editForm);
      closeModal();
      fetchTransactions();
      Alert.alert('Success', 'Transaction Updated!');
    } catch (err) {
      console.error('Error updating transaction:', err);
      Alert.alert('Error', 'Could not update transaction');
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const renderTransactionItem = ({ item }) => (
    <TouchableOpacity style={styles.transactionItem} onPress={() => openEditModal(item)}>
      <View style={styles.transactionDetails}>
        <Text style={styles.transactionDesc}>{item.description}</Text>
        <Text style={styles.transactionCategory}>{item.category}</Text>
      </View>
      <Text style={styles.transactionDate}>{new Date(item.date).toLocaleDateString()}</Text>
      <Text style={[
        styles.transactionAmount,
        item.type === 'income' ? styles.income : styles.expense
      ]}>
        {item.type === 'income' ? '+' : '-'}₹{Number(item.amount).toLocaleString()}
      </Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={(e) => {
          e.stopPropagation();
          deleteTransaction(item._id);
        }}
      >
        <Text style={styles.deleteButtonText}>Remove</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Recent Transactions</Text>
        <TouchableOpacity
          style={styles.viewAllButton}
          onPress={() => setShowAllTransactions(!showAllTransactions)}
        >
          <Text style={styles.viewAllButtonText}>
            {showAllTransactions ? 'Show Less' : 'View All'}
          </Text>
        </TouchableOpacity>
      </View>

      {transactions.length === 0 ? (
        <Text style={styles.emptyText}>No transactions yet.</Text>
      ) : (
        <FlatList
          data={showAllTransactions ? transactions : transactions.slice(0, 4)}
          renderItem={renderTransactionItem}
          keyExtractor={(item) => item._id}
          scrollEnabled={false}
        />
      )}

      {/* Modal for Editing */}
      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Edit Transaction</Text>
            <TextInput
              style={styles.input}
              placeholder="Description"
              value={editForm.description}
              onChangeText={(text) => setEditForm({ ...editForm, description: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Category"
              value={editForm.category}
              onChangeText={(text) => setEditForm({ ...editForm, category: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="YYYY-MM-DD"
              value={editForm.date}
              onChangeText={(text) => setEditForm({ ...editForm, date: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Amount"
              keyboardType="numeric"
              value={editForm.amount.toString()}
              onChangeText={(text) => setEditForm({ ...editForm, amount: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Type (income/expense)"
              value={editForm.type}
              onChangeText={(text) => setEditForm({ ...editForm, type: text })}
            />

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.saveButton} onPress={updateTransaction}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={closeModal}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  viewAllButton: {
    borderWidth: 1,
    borderColor: '#555',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  viewAllButtonText: {
    color: '#ccc',
  },
  emptyText: {
    color: '#888',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 20,
  },
  transactionItem: {
    backgroundColor: '#1e1e2f',
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  transactionDetails: {
    flex: 2,
  },
  transactionDesc: {
    color: '#fff',
    fontSize: 16,
  },
  transactionCategory: {
    color: '#aaa',
    fontSize: 12,
  },
  transactionDate: {
    flex: 1,
    color: '#ccc',
    fontSize: 12,
    textAlign: 'center',
  },
  transactionAmount: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  income: {
    color: '#28a745',
  },
  expense: {
    color: '#dc3545',
  },
  deleteButton: {
    marginLeft: 10,
    backgroundColor: '#f44336',
    borderRadius: 6,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#2a2a3d',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 15,
    color: '#fff',
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#1e1e2f',
    color: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  saveButton: {
    backgroundColor: '#4caf50',
    padding: 10,
    borderRadius: 6,
    flex: 1,
    marginRight: 5,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 6,
    flex: 1,
    marginLeft: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
  },
});

export default TransactionList;
