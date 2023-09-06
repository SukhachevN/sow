import { FC } from 'react';
import styles from './Loader.module.scss';

type LoaderType = {
    text?: string;
};

const Loader: FC<LoaderType> = ({ text }) => (
    <span className={styles.loader}>{text}</span>
);

export default Loader;
