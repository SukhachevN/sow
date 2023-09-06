import { useEffect, useState } from 'react';
import ConnectButton from '~/components/ConnectButton';
import Connected from '~/components/Connected';
import { useWorkspace } from '~/components/WorkspaceProvider/WorkspaceProvider.uitls';
import Loader from '~/components/Loader';

import styles from './App.module.scss';

const App = () => {
    const { account, isChainIdCorrect } = useWorkspace();

    const [isLoaded, setIsLoaded] = useState(false);

    const isConnected = account && isChainIdCorrect;

    const content = isConnected ? <Connected /> : <ConnectButton />;

    useEffect(() => {
        // чтобы избежать блика кнопки подключения
        const timer = setTimeout(
            () => setIsLoaded(typeof account === 'string'),
            300
        );

        return () => {
            clearTimeout(timer);
        };
    }, [account]);

    return (
        <main className={styles.container}>
            {!isLoaded ? <Loader text="Инициализация приложения" /> : content}
        </main>
    );
};

export default App;
