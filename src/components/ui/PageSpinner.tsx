const PageSpinner: React.FC = () => {
  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-white/70 dark:bg-black/70">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
    </div>
  );
};

export default PageSpinner;
