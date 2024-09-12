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
  const [grouping, setGrouping] = useState(localStorage.getItem('grouping') || 'status');
  const [sortBy, setSortBy] = useState(localStorage.getItem('sortBy') || 'Priority');

  useEffect(() => {
    fetchDataFromApi().then((data) => {
      setTickets(data.tickets);
      setUsers(data.users);
      localStorage.setItem('tickets', JSON.stringify(data.tickets));
      localStorage.setItem('users', JSON.stringify(data.users));
    }).catch((error) => {
      console.error('Error fetching data from API:', error);
    });
  }, []);

  useEffect(() => {
    localStorage.setItem('grouping', grouping);
  }, [grouping]);

  useEffect(() => {
    localStorage.setItem('sortBy', sortBy);
  }, [sortBy]);

  return (
    <div className={classes.container}>
      <Navbar grouping={grouping} setGrouping={setGrouping} sortBy={sortBy} setSortBy={setSortBy} />
      <Content grouping={grouping} sortBy={sortBy} tickets={tickets} users={users} />
    </div>
  )
}

export default App
