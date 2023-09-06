import { useEffect, useState } from 'react';
import { BigNumber } from 'ethers';

import { convertBalance, showLoadBalanceAlert } from '~/utils/helpers';
import { useWorkspace } from '~/components/WorkspaceProvider/WorkspaceProvider.uitls';
import Loader from '~/components/Loader';

import { DECIMALS } from './Connected.constants';

const Connected = () => {
    const { account, contract } = useWorkspace();

    const [balance, setBalance] = useState<number | null>(null);

    useEffect(() => {
        const fetchBalance = async () => {
            const { ethereum } = window;

            if (ethereum && contract && account) {
                try {
                    const fetchedBalance = await contract.balanceOf(account);

                    setBalance(convertBalance(fetchedBalance));
                } catch (error) {
                    if (error instanceof Error) {
                        showLoadBalanceAlert(error.message);
                    }
                }
            }
        };

        account && contract && fetchBalance();
    }, [account, contract]);

    useEffect(() => {
        if (contract) {
            const handleTransfer = (
                from: string,
                to: string,
                amount: BigNumber
            ) => {
                const isSending = from.toLowerCase() === account;
                const isReceiving = to.toLowerCase() === account;

                if (isSending || isReceiving) {
                    const realAmount =
                        +amount.toString() / Math.pow(10, DECIMALS);

                    setBalance((prev) => {
                        if (typeof prev !== 'number') return prev;

                        return isSending
                            ? prev - realAmount
                            : prev + realAmount;
                    });
                }
            };

            contract.on('Transfer', handleTransfer);

            return () => {
                contract.off('Transfer', handleTransfer);
            };
        }
    }, [contract, account]);

    return (
        <div>
            <div>Wallet: {account}</div>
            <div>
                Balance:&nbsp;
                {typeof balance === 'number' ? (
                    balance
                ) : (
                    <Loader text="loading balance" />
                )}
            </div>
        </div>
    );
};

export default Connected;
