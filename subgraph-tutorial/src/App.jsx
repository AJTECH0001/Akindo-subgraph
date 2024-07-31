import './App.css'
import { Table } from '@mui/material';
import { Deposit } from './components/Deposit/Deposit.component';
import { Withdraw } from './components/Withdraw/Withdraw.component';
import Transaction from './components/Transaction/Transaction.components';
function App() {
  
  return (
    <>
    <Deposit/>
    <Withdraw/>
    <Transaction/>
    </>
  )
}

export default App
