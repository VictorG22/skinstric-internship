export default function SelectedConfidenceOption({
  label,
  percentage,
}: {
  label: string;
  percentage: number;
}) {
  return (
    <div className="flex items-center justify-between h-12 bg-black px-4">
      <div className="relative flex items-center gap-2">
        <div className="relative w-3 h-3">
          <div className="absolute inset-0 bg-white rotate-45 border border-black" />
          <div className="absolute inset-0.75 bg-white rotate-45 border border-black" />
        </div>
        <p className="mr-2 text-white font-semibold capitalize">{label}</p>
      </div>
      <p className="text-white font-semibold">{percentage}%</p>
    </div>
  );
}