interface BarChartProps {
  data: { day: string; value: number }[];
  width?: number;
  height?: number;
}

export function BarChart({ data, width = 300, height = 120 }: BarChartProps) {
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="flex max-w-full items-end justify-between gap-1" style={{ width, height }}>
      {data.map((d, i) => (
        <div key={i} className="flex flex-col items-center gap-1 flex-1">
          <div className="w-full flex items-end justify-center" style={{ height: height - 24 }}>
            <div
              className="w-5 rounded-t-md transition-all duration-500"
              style={{
                height: `${(d.value / max) * (height - 24)}px`,
                backgroundColor: d.value === 0 ? 'var(--border)' : 'var(--accent)',
              }}
            />
          </div>
          <span className="text-[9px] text-muted-foreground font-medium">{d.day}</span>
        </div>
      ))}
    </div>
  );
}
