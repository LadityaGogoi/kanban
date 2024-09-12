import classes from './App.module.css'
import { useState, useEffect } from 'react'
import { Content, Navbar } from './components'

const fetchDataFromApi = async () => {
  const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
  const data = await response.json();
  return data;
};

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState('status');
  const [sortBy, setSortBy] = useState('priority');

  useEffect(() => {
    const savedGrouping = localStorage.getItem('grouping') || 'status';
    const savedSortBy = localStorage.getItem('sortBy') || 'priority';

    setGrouping(savedGrouping);
    setSortBy(savedSortBy);

    const localTickets = localStorage.getItem('tickets');
    const localUsers = localStorage.getItem('users');

    if (localTickets && localUsers) {
      setTickets(JSON.parse(localTickets));
      setUsers(JSON.parse(localUsers));
    } else {
      fetchDataFromApi().then((data) => {
        setTickets(data.tickets);
        setUsers(data.users);
        localStorage.setItem('tickets', JSON.stringify(data.tickets));
        localStorage.setItem('users', JSON.stringify(data.users));
      }).catch((error) => {
        console.error('Error fetching data from API:', error);
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('grouping', grouping);
    localStorage.setItem('sortBy', sortBy);
  }, [grouping, sortBy]);

  return (
    <div className={classes.container}>
      <Navbar grouping={grouping} setGrouping={setGrouping} sortBy={sortBy} setSortBy={setSortBy} />
      <Content grouping={grouping} sortBy={sortBy} tickets={tickets} users={users} />
    </div>
  )
}

export default App
