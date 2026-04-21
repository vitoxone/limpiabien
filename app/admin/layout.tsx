import AdminGate from './AdminGate';

export const metadata = { title: 'Admin · LimpiaBien', robots: { index: false, follow: false } };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminGate>{children}</AdminGate>;
}
