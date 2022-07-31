import React, { useState } from 'react';
import Form from './components/Form';
import FiltersAndOrderings from './components/FiltersAndOrderings';
import SpendingList from './components/SpendingList';
import Layout from './components/Layout';

export default function App() {
  const [spendings, setSpendings] = useState([]);
  const [currencyFilter, setCurrencyFilter] = useState('');
  const [order, setOrder] = useState('-date');

  return (
    <>
      <Layout>
        <Form setSpendings={setSpendings} />
        <FiltersAndOrderings
          setCurrencyFilter={setCurrencyFilter}
          currencyFilter={currencyFilter}
          setOrder={setOrder}
        />
        <SpendingList
          spendings={spendings}
          setSpendings={setSpendings}
          currencyFilter={currencyFilter}
          order={order}
        />
      </Layout>
    </>
  );
}
