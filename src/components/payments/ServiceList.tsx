import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useBankStore } from '../../store/useBankStore';

interface ServiceListProps {
  categoryId: string;
}

export function ServiceList({ categoryId }: ServiceListProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const getServicesByCategory = useBankStore((s) => s.getServicesByCategory);
  const services = getServicesByCategory(categoryId);

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {services.map((service) => (
        <li key={service.id}>
          <button
            type="button"
            onClick={() => navigate(`/payments/${categoryId}/${service.id}`)}
            className="flex w-full items-center gap-4 rounded-2xl glass p-4 text-left transition-all hover:bg-white/15 hover:scale-[1.02]"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-2xl">
              {service.icon}
            </span>
            <span className="text-sm font-semibold text-white">{t(service.nameKey)}</span>
            <span className="ml-auto text-white/40">›</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
