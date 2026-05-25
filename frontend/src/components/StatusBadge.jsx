function StatusBadge({ variant, children }) {
  return <span className={`status-badge status-${variant}`}>{children}</span>;
}

export default StatusBadge;
