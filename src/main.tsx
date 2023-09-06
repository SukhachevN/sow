import ReactDOM from 'react-dom/client';

import WorkspaceProvider from './components/WorkspaceProvider';

import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <WorkspaceProvider>
        <App />
    </WorkspaceProvider>
);
