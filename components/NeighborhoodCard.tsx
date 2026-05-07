type NeighborhoodCardProps = {
  title: string;
  description: string;
  color: string;
};

export default function NeighborhoodCard({
  title,
  description,
  color,
}: NeighborhoodCardProps) {
  return (
    <div className={`rounded-2xl p-4 ${color}`}>
      <p className="font-semibold text-slate-900">{title}</p>

      <p className="mt-1 text-sm text-slate-600">
        {description}
      </p>
    </div>
  );
}