interface MoistureGaugeProps {
  value: number;
  size?: number;
  label?: string;
}

export function MoistureGauge({ value, size = 110, label }: MoistureGaugeProps) {
  const radius = (size - 16) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  const color = value < 40 ? 'var(--destructive)' : value < 55 ? 'var(--warning)' : 'var(--accent)';
  const statusText = value < 40 ? 'Low' : value < 55 ? 'Moderate' : 'Healthy';

  return (
    <div className="relative flex flex-col items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--border)"
          strokeWidth="10"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold" style={{ color }}>{value}%</span>
        <span className="text-xs font-medium mt-0.5" style={{ color }}>{label ?? statusText}</span>
      </div>
    </div>
  );
}
