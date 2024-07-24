import LogoIcon from '@/assets/icons/Logo.icon';

export default function Header() {
  return (
    <nav className="p-6 border-b border-[#E6E6E6] flex items-center justify-between">
      <LogoIcon className="h-[32px] w-[auto]" />
      <div className="flex items-center justify-center gap-4">
        <span className="font-medium text-textPrimary">John Smith</span>
        <div className="w-10 h-10 rounded-full font-medium text-white bg-[#00256E] flex items-center justify-center">
          JS
        </div>
      </div>
    </nav>
  );
}
