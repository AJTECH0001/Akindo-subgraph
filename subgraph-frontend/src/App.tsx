import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { gql, request } from 'graphql-request'
import React from 'react';
import ReactDOM from 'react-dom/client';

type BillAdded = {  
  id: string;  
  billId: string;  
  recipient: string;  
  amount: string;  
};  

type BillPaid = {  
  id: string;  
  billId: string;  
  recipient: string;  
  amount: string;  
};  

type QueryResponse = {  
  billAddeds: BillAdded[];  
  billPaids: BillPaid[];  
};
const query = gql`{
  billAddeds(first: 5) {
    id
    billId
    recipient
    amount
  }
  billPaids(first: 5) {
    id
    billId
    recipient
    amount
  }
}`


const url = 'https://api.studio.thegraph.com/query/83625/akindo/version/latest'
export default function App() {
  const { data, status } = useQuery<QueryResponse>({  
    queryKey: ['data'],  
    async queryFn() {  
      return await request<QueryResponse>(url, query);  
    },  
  });  
  return (
    <main className="h-full w-[100%] min-h-screen mx-auto max-w-7xl mt-10 flex flex-col gap-y-24">  
    <h1 className="text-3xl text-center ">The Graph Query </h1>  
    <h2 className="text-3xl">ADMIN DASHBOARD </h2> 
    {status === 'pending' ? (  
      <div>Loading...</div>  
    ) : status === 'error' ? (  
      <div>Error occurred querying the Subgraph</div>  
    ) : (  
      <div className="overflow-x-auto">  
        <table className="w-full table-auto">  
          <thead>  
            <tr className="">  
              <th className="px-4 py-2 text-left">ID</th>  
              <th className="px-4 py-2 text-left">Bill ID</th>  
              <th className="px-4 py-2 text-left">Recipient</th>  
              <th className="px-4 py-2 text-right">Amount</th>  
            </tr>  
          </thead>  
          <tbody className=' '>  
            {(data?.billAddeds ?? []).map((bill, index) => (  
              <tr key={index} className={index % 2 === 0 ? '' : ''}>  
                <td className="px-4 py-2 text-left">{bill.id}</td>  
                <td className="px-4 py-2 text-left">{bill.billId}</td>  
                <td className="px-4 py-2 text-left">{bill.recipient}</td>  
                <td className="px-4 py-2 text-right">{bill.amount}</td>  
              </tr>  
            ))}  
          </tbody>  
        </table>  
      </div>  
    )}  
  </main>
  )
}
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
);
      