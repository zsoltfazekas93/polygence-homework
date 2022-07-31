import React, { useState } from 'react';
import { InputStyles } from '../styles/InputStyles';
import { SelectStyles } from '../styles/SelectStyles';
import { FormStyles } from '../styles/ComponentStyles';
import { ErrorSpan } from '../styles/ComponentStyles';

export default function Form({ setSpendings }) {
  const [state, setState] = useState({
    description: '',
    amount: 0,
    currency: 'USD',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    var valid = true;
    if (!state.description) {
      handleError('Description is required', 'description');
      valid = false;
    }
    if (!state.amount) {
      handleError('Amount is required', 'amount');
      valid = false;
    }
    if (parseFloat(state.amount) <= 0) {
      console.log('ITTE');
      handleError('Amount must be positive', 'amount');
      valid = false;
    }
    return valid;
  };

  const handleError = (errorMsg, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMsg }));
  };

  function handleChange(e) {
    const { name, value } = e.target;

    setState({
      ...state,
      [name]: value,
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      fetch(`http://localhost:3001/api/spending`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state),
      })
        .then(async (res) => {
          const body = await res.json();
          return {
            status: res.status,
            body,
          };
        })
        .then(async (response) => {
          if (response.status === 200) {
            setSpendings((prevSpendings) => [...prevSpendings, response.body]);
            setState({ description: '', amount: 0, currency: 'USD' });
          }
          console.log(response);
        })
        .catch(async (err) => {
          console.error('ASDASD', err);
        });
    }
  };

  return (
    <>
      <FormStyles>
        <div>
          <InputStyles
            type="text"
            placeholder="description"
            name="description"
            value={state.description}
            onChange={handleChange}
            onFocus={() => handleError(null, 'description')}
          />
          {errors.description && <ErrorSpan>{errors.description}</ErrorSpan>}
        </div>
        <div>
          <InputStyles
            type="number"
            placeholder="amount"
            name="amount"
            value={state.amount}
            onChange={handleChange}
            onFocus={() => handleError(null, 'amount')}
          />
          {errors.amount && <ErrorSpan>{errors.amount}</ErrorSpan>}
        </div>
        <SelectStyles
          name="currency"
          value={state.currency}
          onChange={handleChange}
        >
          <option value="HUF">HUF</option>
          <option value="USD">USD</option>
        </SelectStyles>
        <InputStyles type="submit" onClick={handleSubmit} value="Save" />
      </FormStyles>
    </>
  );
}
