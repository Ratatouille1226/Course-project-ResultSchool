import { createRoot } from 'react-dom/client';
import './index.css';
import { store } from './store.jsx';
import { Provider } from 'react-redux';
import { Blog } from './Blog.jsx';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<Provider store={store}>
			<Blog />
		</Provider>
	</BrowserRouter>,
);
