// styles/styles.js
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#121212',
  },
  sidebar: {
    width: 220,
    backgroundColor: '#1e1e1e',
    padding: 16,
    flexDirection: 'column',
  },
  sidebarTitle: {
    fontSize: 24,
    marginBottom: 32,
    color: '#80cbc4',
    fontWeight: 'bold',
  },
  sidebarNavLink: {
    color: '#ccc',
    paddingVertical: 12,
    textDecorationLine: 'none',
  },
  mainContent: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#121212',
  },
  topbar: {
    height: 60,
    backgroundColor: '#1e1e1e',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  topbarTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  contentWrapper: {
    padding: 24,
    flexGrow: 1,
  },
  dashboard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 32,
  },
  card: {
    backgroundColor: '#2b2b2b',
    padding: 24,
    borderRadius: 10,
    flexGrow: 1,
    minWidth: 200,
    margin: 8,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  transactionList: {
    backgroundColor: '#2b2b2b',
    padding: 16,
    borderRadius: 10,
    margin: 8,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
});
