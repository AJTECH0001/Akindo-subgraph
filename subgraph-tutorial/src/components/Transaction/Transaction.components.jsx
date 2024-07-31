import React, { useEffect } from 'react'  
import { useState } from 'react'  
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'  
import { DataGrid } from '@mui/x-data-grid'  
import { Typography } from '@mui/material'  

export const Transaction = () => {  
  const [data, setData] = React.useState 
  const [depositTx, setDepositTx] = useState([])  
  const QueryURL = 'https://api.studio.thegraph.com/query/83625/akindo/version/latest'  
  const client = new ApolloClient({  
    uri: QueryURL,  
    cache: new InMemoryCache(),  
  })  
  const query = `{  
    deposits(last: 100) {  
      id  
      account  
      amount  
      blockNumber  
    }  
  }`  

  useEffect(() => {  
    execute(ExampleQueryDocument, {}).then((result) => {  
      setData(result?.data)  
    })  

    client  
      .query({  
        query: gql(query),  
      })  
      .then((data) => {  
        setDepositTx(data.data.deposits)  
      })  
      .catch((err) => {  
        console.log('Error fetching data: ', err)  
      })  
  }, [setData])  

  const columns = [  
    { field: 'account', headerName: 'Account', width: 420 },  
    { field: 'amount', headerName: 'Amount', width: 120 },  
    { field: 'blockNumber', headerName: 'Block No', width: 120 },  
  ]  

  return (  
    <div>  
      <Typography>Deposit Transactions</Typography>  
      <DataGrid rows={depositTx} columns={columns} />  
      <div className="App">  
        <header className="App-header">  
          <img src={logo} className="App-logo" alt="logo" />  
          <p>Graph Client Example</p>  
          <fieldset>  
            {data && (  
              <form>  
                <label>Data</label>  
                <br />  
                <textarea value={JSON.stringify(data, null, 2)} readOnly rows={25} />  
              </form>  
            )}  
          </fieldset>  
        </header>  
      </div>  
    </div>  
  )  
}