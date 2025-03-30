import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import {Providers} from "../context/providers";
import { BreadcrumbProvider } from '../context/BreadcrumbContext';
import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
 
export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>
          <Providers>
            <BreadcrumbProvider>
              {children}
            </BreadcrumbProvider>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
   
  );
}