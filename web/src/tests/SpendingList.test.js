import React from 'react';

import { render, screen } from '@testing-library/react';
import SpendingList from '../components/SpendingList';
import '@testing-library/jest-dom';

describe(SpendingList, () => {
  it('spending list correct initial values', async () => {
    const useEffect = jest
      .spyOn(React, 'useEffect')
      .mockImplementation(() => {});
    const setSpendings = jest.fn();
    const spendings = [
      {
        id: 1,
        description: 'valami',
        amount: 2,
        currency: 'USD',
        spent_at: '2022-07-31T11:25:18.950308',
      },
    ];
    render(
      <SpendingList
        spendings={spendings}
        setSpendings={setSpendings}
        currencyFilter={''}
        order={'-date'}
      />
    );
    const spendingElement = await screen.findByTestId('spending-1');
    expect(spendingElement).toHaveTextContent('valami');
  });
});
