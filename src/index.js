import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const sampleNotes = [
  {
    id: 1,
    text: 'Hello world!\n\nThis is some text\n\nHi there.',
  },
  {
    id: 2,
    text: 'The quick brown fox\n\njumps over\n\nthe lazy dog.',
  },
];

ReactDOM.render(<App notes={sampleNotes} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
