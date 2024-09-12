import classes from './App.module.css'
import { useState, useEffect } from 'react'
import { Content, Navbar } from './components'

const fetchDataFromApi = async () => {
  const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
  const data = await response.json();
  return data;
};

const App = () => {
  const [assignmentData, setAssignmentData] = useState(null)
  const [grouping, setGrouping] = useState('status');
  const [sortBy, setSortBy] = useState('priority');

  useEffect(() => {
    const localAssignmentData = localStorage.getItem('localAsssignmentData')

    if (localAssignmentData) {
      setAssignmentData(localAssignmentData)
    } else {
      fetchDataFromApi().then((data) => {
        setAssignmentData(data)
        localStorage.setItem('localAsssignmentData', JSON.stringify(data));
      }).catch((error) => {
        console.error('Error fetching data from API:', error);
      });
    }
  }, [])

  return (
    <div className={classes.container}>
      <Navbar grouping={grouping} setGrouping={setGrouping} sortBy={sortBy} setSortBy={setSortBy} />
      <Content />
    </div>
  )
}

export default App
