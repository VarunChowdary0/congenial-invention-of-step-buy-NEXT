import { ArrowLeft } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

interface PageHeaderProps {
  title: string;
  children?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const pathSegments = pathname.split('/');
  const previousRoute = '/' + pathSegments.slice(1, -2).join('/');

  return (
    <div className="w-full sticky z-[200] top-0 shadow-sm py-6 px-10 max-sm:px-4 flex justify-between items-center bg-white">
      <div className="flex items-center justify-center gap-4">
        <div
          onClick={() => router.back()}
          className="p-1 flex items-center justify-center hover:cursor-pointer hover:shadow-lg transition-all border shadow rounded-md w-fit"
        >
          <ArrowLeft className="w-8 scale-75 h-8 text-black" />
        </div>
        <div>
          <p className="text-sm text-gray-400">Back to {previousRoute}</p>
          <p className="font-semibold text-xl">{title}</p>
        </div>
      </div>
      <div className="flex items-center justify-center gap-4">{children}</div>
    </div>
  );
};

export default PageHeader;
