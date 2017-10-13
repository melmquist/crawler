import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';

describe("first test", () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });
  
})

// it('accepts valid URLs into the main text field', () => {
//   return false;
// })


// it('messages the user when an invalid URL is given', () => {
//   return false;
// })

// it('makes an HTTP request when a user submits a valid link to crawl on', () => {
//   return false;
// })