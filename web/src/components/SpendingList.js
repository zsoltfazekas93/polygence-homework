import React, { useEffect, useState } from 'react';
import { FiDollarSign } from 'react-icons/fi';
import Loader from './Loader';
import {
  ErrorMessage,
  Spending,
  IconWrapper,
  TextWrapper,
  Amount,
  AmountWrapper,
} from '../styles/ComponentStyles';
import { Filter_Map, Sort_Map } from '../utils/utils';

export default function SpendingList({
  spendings,
  setSpendings,
  currencyFilter,
  order,
}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  function convertUTCDateToLocalDate(date) {
    var dateLocal = new Date(date);
    var newDate = new Date(
      dateLocal.getTime() - dateLocal.getTimezoneOffset() * 60 * 1000
    );
    return newDate.toLocaleString();
  }

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3001/api/spendings`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(async (res) => {
        const body = await res.json();
        return {
          status: res.status,
          body,
        };
      })
      .then((response) => {
        if (response.status === 200) {
          setSpendings(response.body);
        }
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      {error && (
        <ErrorMessage>
          The server is probably down. Please try again later.
        </ErrorMessage>
      )}
      {!spendings.length && !error && (
        <h1 style={{ textAlign: 'center', marginTop: '4rem' }}>
          Yay!{' '}
          <span role="img" aria-label="jsx-a11y/accessible-emoji">
            🎉
          </span>{' '}
          No spendings!
        </h1>
      )}

      {spendings.length > 0 &&
        spendings
          .filter(Filter_Map[currencyFilter])
          .sort(Sort_Map[order])
          .map((spending) => (
            <Spending
              data-testid={`spending-${spending.id}`}
              key={`spending-${spending.id}`}
            >
              <IconWrapper>
                <FiDollarSign color="var(--color-blue)" />
              </IconWrapper>
              <TextWrapper>
                <h3>{spending.description}</h3>
                <p>{convertUTCDateToLocalDate(spending.spent_at)}</p>
              </TextWrapper>
              <AmountWrapper>
                <Amount currency={spending.currency}>
                  {spending.amount.toFixed(2)}
                </Amount>
              </AmountWrapper>
            </Spending>
          ))}
    </>
  );
}
