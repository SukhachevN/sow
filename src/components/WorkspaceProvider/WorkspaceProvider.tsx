import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { ethers } from 'ethers';

import sow from '~/utils/SOW.json';
import {
    showInstallMetaMaskAlert,
    showLoadContractAlert,
    showSwitchChainAlert,
} from '~/utils/helpers';

import {
    ADDRESS,
    CHAIN_ID,
    SowContract,
    WorkspaceContext,
} from './WorkspaceProvider.uitls';

const WorkspaceProvider: FC<PropsWithChildren> = ({ children }) => {
    const [account, setAccount] = useState<string | null>(null);
    const [contract, setContract] = useState<SowContract | null>(null);
    const [isChainIdCorrect, setIsChainIdCorrect] = useState(false);

    const switchChain = async () => {
        const { ethereum } = window;

        if (ethereum) {
            try {
                await ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: CHAIN_ID }],
                });

                setIsChainIdCorrect(true);

                location.reload();
            } catch (error) {
                error instanceof Error && showSwitchChainAlert(error.message);
            }
        } else {
            showInstallMetaMaskAlert();
        }
    };

    const workspace = {
        account,
        contract,
        isChainIdCorrect,
        switchChain,
    };

    useEffect(() => {
        const loadContract = async () => {
            const { ethereum } = window;

            if (ethereum) {
                try {
                    const provider = new ethers.providers.Web3Provider(
                        ethereum
                    );
                    const signer = provider.getSigner();
                    const contractInstance = new ethers.Contract(
                        ADDRESS,
                        sow.abi,
                        signer
                    ) as SowContract;

                    const chainId = await ethereum.request?.({
                        method: 'eth_chainId',
                    });

                    setIsChainIdCorrect(chainId === CHAIN_ID);
                    setContract(contractInstance);
                } catch (error) {
                    if (error instanceof Error) {
                        showLoadContractAlert(error.message);
                    }
                }
            } else {
                alert;
            }
        };

        account && loadContract();
    }, [account]);

    useEffect(() => {
        const loadAccount = async () => {
            const { ethereum } = window;

            if (ethereum) {
                try {
                    const accounts = await ethereum.request({
                        method: 'eth_accounts',
                    });

                    setAccount(accounts[0] ?? '');
                } catch (error) {
                    error instanceof Error && alert(error.message);
                }
            } else {
                showInstallMetaMaskAlert();
            }
        };

        loadAccount();

        window.ethereum?.on('accountsChanged', loadAccount);
        window.ethereum?.on('chainChanged', loadAccount);

        return () => {
            window.ethereum?.removeListener('accountsChanged', loadAccount);
            window.ethereum?.removeListener('chainChanged', loadAccount);
        };
    }, []);

    return (
        <WorkspaceContext.Provider value={workspace}>
            {children}
        </WorkspaceContext.Provider>
    );
};

export default WorkspaceProvider;
