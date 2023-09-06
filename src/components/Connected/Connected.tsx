import { useEffect, useState } from 'react';
import { BigNumber } from 'ethers';

import { convertBalance, showLoadBalanceAlert } from '~/utils/helpers';
import { useWorkspace } from '~/components/WorkspaceProvider/WorkspaceProvider.uitls';
import Loader from '~/components/Loader';

import styles from './Connected.module.scss';

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
                    const realAmount = convertBalance(amount);

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
        <div className={styles.container}>
            <div className={styles.field}>
                Адрес:
                <div title={account ?? ''} className={styles.withOverflow}>
                    {account}
                </div>
            </div>
            <div className={styles.field}>
                Баланс:
                <div
                    title={String(balance ?? '')}
                    className={styles.withOverflow}
                >
                    {typeof balance === 'number' ? (
                        balance
                    ) : (
                        <Loader text="загрузка" />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Connected;
