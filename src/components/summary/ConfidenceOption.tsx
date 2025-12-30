
export default function ConfidenceOption({
  label,
  percentage,
  onClick,
}: {
  label: string;
  percentage: number;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="flex items-center justify-between h-12 hover:bg-[#e1e1e2] px-4 cursor-pointer"
    >
      <div className="relative flex items-center gap-2">
        <div className="relative w-3 h-3">
          <div className="absolute inset-px rotate-45 border border-black" />
        </div>
        <p className="mr-2 capitalize">{label}</p>
      </div>
      <p>{Math.floor(percentage * 100)}%</p>
    </div>
  );
}