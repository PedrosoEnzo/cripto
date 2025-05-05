import styles from './ProgressBar.module.css';

export default function ProgressBar({ progress }) {
  const roundedProgress = Math.round(progress);

  return (
    <div className={styles.progressContainer}>
      <div className={styles.progressBar}
        style={{ width: `${roundedProgress}%` }}
      ></div>
      <span className={styles.progressText}>{roundedProgress}%</span>
    </div>
  );
}
