import styles from './ProgressBar.module.css';

export default function ProgressBar({ progress }) {
  const roundedProgress = Math.round(progress);

  return (
    <div className={styles.progressContainer}>
      <div className={styles.progressBar} style={{ width: `${roundedProgress}%` }}>
        <span className={styles.progressText}>{roundedProgress}%</span>
      </div>
    </div>
  );
}
