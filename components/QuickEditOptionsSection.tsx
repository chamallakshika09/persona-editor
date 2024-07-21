interface QuickEditOptionsSectionProps<T> {
  label: string;
  icons: T[];
  selectedIcon: string;
  setSelectedIcon: (icon: string) => void;
  iconRenderer: (icon: T) => React.ReactNode;
  iconStyle?: (icon: T) => React.CSSProperties;
  buttonClasses?: string;
}

export default function QuickEditOptionsSection<T extends string | { name: string }>({
  label,
  icons,
  selectedIcon,
  setSelectedIcon,
  iconRenderer,
  iconStyle,
  buttonClasses,
}: QuickEditOptionsSectionProps<T>) {
  return (
    <>
      <label className="font-semibold text-textPrimary">{label}</label>
      <div className="flex flex-wrap gap-2 items-center justify-start">
        {icons.map((icon) => (
          <button
            key={typeof icon === 'string' ? icon : icon.name}
            onClick={() => setSelectedIcon(typeof icon === 'string' ? icon : icon.name)}
            className={`p-1 rounded-md w-10 h-10 flex items-center justify-center ${buttonClasses} ${
              selectedIcon === icon ? 'border-2 border-black' : ''
            }`}
            style={iconStyle ? iconStyle(icon) : undefined}
          >
            {iconRenderer(icon)}
          </button>
        ))}
      </div>
    </>
  );
}
