import styles from './ProgressBar.module.css';

export default function ProgressBar({ progress }) {
  return (
    <div className={styles.progressContainer}>
      <div className={styles.progressBar} style={{ width: `${progress}%`}}></div>
    </div>
  );
}