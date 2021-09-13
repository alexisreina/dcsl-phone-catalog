import { useEffect } from "react";

export const Spinner = () => (
  <div
    style={{ borderTopColor: "transparent" }}
    className="w-16 h-16 border-4 border-red-400 border-solid rounded-full animate-spin"
  ></div>
);

export const Loading: React.FC<{ show: boolean }> = ({ show }) => {
  useEffect(() => {
    if (show) {
      document.body.classList.add("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [show]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-10 pointer-events-none">
      <div className="bg-gray-500 bg-opacity-40 rounded-3xl p-12">
        <Spinner />
      </div>
    </div>
  );
};
