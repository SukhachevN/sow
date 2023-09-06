import { BigNumber } from 'ethers';

export const showInstallMetaMaskAlert = () =>
    alert('Пожалуйста, установите MetaMask');

export const showSwitchChainAlert = (message: string) =>
    alert(`Не удалось изменить сеть. ${message}`);

export const showLoadContractAlert = (message: string) =>
    alert(`Не удалось загрузить контракт. ${message}`);

export const showLoadBalanceAlert = (message: string) =>
    alert(`Не удалось загрузить баланс. ${message}`);

export const DECIMALS = 18;

export const convertBalance = (balance: BigNumber) =>
    +balance.toString() / Math.pow(10, DECIMALS);
