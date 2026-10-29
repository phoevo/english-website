import AuthLoading from "@/components/auth/AuthLoading";
import styles from "@/components/auth/auth.module.css";

export default function Loading() {
  return <div className={styles.pending}><AuthLoading /></div>;
}
