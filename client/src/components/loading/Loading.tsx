import Logo from '@/components/Logo';

const Loading = () => {
  return (
    <div className="bg-primary grid h-full w-full place-items-center">
      <div className="flex flex-col items-center gap-4">
        <Logo />
        <div className="h-12 w-12 animate-spin rounded-full border-y-4 border-solid border-pink-500 border-t-transparent shadow-md"></div>
      </div>
    </div>
  );
};

export default Loading;
