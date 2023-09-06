import { BigNumber, ethers } from 'ethers';
import { createContext, useContext } from 'react';

export type SowContract = {
    balanceOf: (account: string) => Promise<BigNumber>;
} & ethers.Contract;

type WorkspaceType = {
    account: string | null;
    contract: SowContract | null;
    isChainIdCorrect: boolean;
    switchChain: () => void;
};

export const WorkspaceContext = createContext<WorkspaceType>({
    account: null,
    contract: null,
    isChainIdCorrect: false,
    switchChain: () => {},
});

export const useWorkspace = () => useContext(WorkspaceContext);

export const CHAIN_ID = '0x61';

export const ADDRESS = '0x51109ba924a7599058e1b8a3893b0f2713f25ec4';
