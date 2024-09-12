import classes from './App.module.css'
import { Navbar } from './components'

const App = () => {
  return (
    <div className={classes.container}>
      <Navbar />
      <div>hello</div>
    </div>
  )
}

export default App
