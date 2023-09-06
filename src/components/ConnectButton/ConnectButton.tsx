import {
    showInstallMetaMaskAlert,
    showSwitchChainAlert,
} from '~/utils/helpers';
import { useWorkspace } from '~/components/WorkspaceProvider/WorkspaceProvider.uitls';

const ConnectButton = () => {
    const { isChainIdCorrect, switchChain } = useWorkspace();

    const onClick = async () => {
        const { ethereum } = window;

        if (ethereum) {
            try {
                await ethereum.request({
                    method: 'eth_requestAccounts',
                });

                !isChainIdCorrect && switchChain();
            } catch (error) {
                error instanceof Error && showSwitchChainAlert(error.message);
            }
        } else {
            showInstallMetaMaskAlert();
        }
    };

    return <button onClick={onClick}>Connect MetaMask</button>;
};

export default ConnectButton;
