export default function CreateModal({
  isOpen,
  onClose,
  children,
}: Readonly<{
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}>) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-start">
      <div
        className="absolute bg-gray-800 opacity-50 h-screen w-screen justify-center items-center z-10"
        onClick={() => onClose()}
      />
      <div className="flex flex-col gap-5 absolute bg-white rounded-md p-8 min-h-[10%] md:w-[30%] z-20 mt-20">
        {children}
      </div>
    </div>
  );
}
