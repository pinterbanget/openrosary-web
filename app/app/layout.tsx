import { DM_Sans } from 'next/font/google';

const brandSans = DM_Sans({
  variable: '--font-brand-sans',
  subsets: ['latin'],
  display: 'swap',
});

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={brandSans.variable}
      style={{ fontFamily: '"Google Sans", "Google Sans Text", var(--font-brand-sans), sans-serif' }}
    >
      {children}
    </div>
  );
}
