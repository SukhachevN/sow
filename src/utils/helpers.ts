import { BigNumber } from 'ethers';

export const showInstallMetaMaskAlert = () => alert('Please, install MetaMask');

export const showSwitchChainAlert = (message: string) =>
    alert(`Cant switch chain. ${message}`);

export const showLoadContractAlert = (message: string) =>
    alert(`Cant load smart contract. ${message}`);

export const showLoadBalanceAlert = (message: string) =>
    alert(`Cant load balance. ${message}`);

export const DECIMALS = 18;

export const convertBalance = (balance: BigNumber) =>
    +balance.toString() / Math.pow(10, DECIMALS);
