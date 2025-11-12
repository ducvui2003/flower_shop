import ClientIcon from '@/components/ClientIcon';

export const StarRating = ({ star }: { star: number }) => (
  <div className="mb-2 flex gap-1 text-sm text-yellow-500">
    {Array.from({ length: 5 }).map((_, i) => (
      <ClientIcon
        key={i}
        icon="material-symbols:star-rounded"
        size={18}
        className={i < Math.round(star) ? 'text-yellow-400' : 'text-gray-300'}
      />
    ))}
  </div>
);
