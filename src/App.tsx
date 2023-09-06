import ConnectButton from '~/components/ConnectButton';
import Connected from '~/components/Connected';
import { useWorkspace } from '~/components/WorkspaceProvider/WorkspaceProvider.uitls';
import Loader from '~/components/Loader';

import styles from './App.module.scss';

const App = () => {
    const { account, isChainIdCorrect } = useWorkspace();

    const isConnected = account && isChainIdCorrect;

    if (typeof account !== 'string') return <Loader text="Initializing app" />;

    return (
        <main className={styles.container}>
            {isConnected ? <Connected /> : <ConnectButton />}
        </main>
    );
};

export default App;
