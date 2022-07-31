import React from 'react';

import {
  FiltersWrapper,
  Orderings,
  CurrencyFilters,
  CurrencyButton,
} from '../styles/ComponentStyles';

export default function CurrencyFilter({
  setOrder,
  setCurrencyFilter,
  currencyFilter,
}) {
  return (
    <>
      <FiltersWrapper>
        <Orderings>
          <select onChange={(e) => setOrder(e.target.value)}>
            <option value="-date">Sort by Date descending (default)</option>
            <option value="date">Sort by Date ascending</option>
            <option value="-amount">Sort by Amount descending</option>
            <option value="amount">Sort by Amount ascending</option>
          </select>
        </Orderings>
        <CurrencyFilters>
          <li onClick={(e) => setCurrencyFilter(e.target.name)}>
            <CurrencyButton currencyFilter={currencyFilter} name="">
              ALL
            </CurrencyButton>
          </li>
          <li onClick={(e) => setCurrencyFilter(e.target.name)}>
            <CurrencyButton currencyFilter={currencyFilter} name="HUF">
              HUF
            </CurrencyButton>
          </li>
          <li onClick={(e) => setCurrencyFilter(e.target.name)}>
            <CurrencyButton currencyFilter={currencyFilter} name="USD">
              USD
            </CurrencyButton>
          </li>
        </CurrencyFilters>
      </FiltersWrapper>
    </>
  );
}
