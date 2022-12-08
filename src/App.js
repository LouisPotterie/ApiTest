import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import React, {useState, useEffect} from 'react'

function App() {
  
  const getPl = async() => {
    try {
        //axios.defaults.headers = {'Access-Control-Allow-Origin': '*'};
        const res = await axios.get(`https://eba-proxy.azurewebsites.net/api/etherscan/GetProfitAndLoss?session=40aab14c-1ed8-4c70-8a0a-bf329f7e952f&address=0xD56Dbb8F0d92f965356CFE4896e6e6eDa0a5d7B1&page=1&offset=100`);
        const profitAndLoss = res.data.result.toFixed(2) + "$"
        setPl(profitAndLoss);   
    } catch (error) {
        console.log(error);
  }

  
    
}

const getCexInflow = async () => {
  try {
      //axios.defaults.headers = {'Access-Control-Allow-Origin': '*'};
      const res = await axios.get(`https://eba-proxy.azurewebsites.net/api/etherscan/GetCexInOutflow?session=40aab14c-1ed8-4c70-8a0a-bf329f7e952f&address=0xD56Dbb8F0d92f965356CFE4896e6e6eDa0a5d7B1&page=1&offset=100`);
      const cexInflow = res.data.result.inflow;
      setCexInflow(cexInflow);   
  } catch (error) {
      console.log(error);
  }
}

const getCexOutflow = async () => {
  try {
      //axios.defaults.headers = {'Access-Control-Allow-Origin': '*'};
      const res = await axios.get(`https://eba-proxy.azurewebsites.net/api/etherscan/GetCexInOutflow?session=40aab14c-1ed8-4c70-8a0a-bf329f7e952f&address=0xD56Dbb8F0d92f965356CFE4896e6e6eDa0a5d7B1&page=1&offset=100`);
      const cexOutflow = res.data.result.outflow;
      setCexOutflow(cexOutflow);   
  } catch (error) {
      console.log(error);
  }
}

const [pl, setPl] = useState();
const [cexInflow, setCexInflow] = useState();
const [cexOutflow, setCexOutflow] = useState();
  
  useEffect(() => {
    getPl();
    getCexInflow();
    getCexOutflow();
  }, [])
  
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
         P&L : {pl}
        </p>
        <p>{(cexInflow / (10**18)).toFixed(4)} ETH</p>
        <p>{(cexOutflow / (10**18)).toFixed(4)} ETH</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
