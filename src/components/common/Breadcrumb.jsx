import Link from 'next/link';
import { Icon } from '@/components/ui';

function Breadcrumb({ items = [] }) {
  return (
    <nav aria-label="Breadcrumb" className="py-2">
      <ol className="flex items-center gap-2 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isFirst = index === 0;

          return (
            <li key={item.href || index} className="flex items-center gap-2">
              {isFirst && (
                <Icon
                  name="home"
                  className="w-4 h-4 text-gray-500"
                />
              )}

              {isLast ? (
                <span className="text-gray-900 font-medium">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-gray-600 hover:text-green-600 transition-colors"
                >
                  {item.label}
                </Link>
              )}

              {!isLast && (
                <Icon
                  name="chevronRight"
                  className="w-4 h-4 text-gray-400"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export { Breadcrumb };
export default Breadcrumb;
