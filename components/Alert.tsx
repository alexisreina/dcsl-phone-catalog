export const AlertError: React.FC<{ show: boolean }> = ({ children, show }) => {
  if (!show) return null;
  return (
    <div className="p-4 rounded-md bg-red-300 mb-6">
      <div className="text-white font-semibold">{children}</div>
    </div>
  );
};
