import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import Routes from './routes';

import ApplicationStore from 'framework/ApplicationStore';

ReactDOM.render(
	<Provider store={ApplicationStore}>
		<Routes />
	</Provider>,
	document.getElementById('app')
);
