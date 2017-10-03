import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/App';

it('renders without crashing POO', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
