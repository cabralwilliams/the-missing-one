// Redux core library that will create the store
import { createStore } from 'redux';
import reducer from './reducers';

export default createStore(reducer);
