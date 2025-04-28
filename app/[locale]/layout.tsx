import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import {Providers} from "../context/providers";
import { BreadcrumbProvider } from '../context/BreadcrumbContext';
import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import {FormDataProvider} from "@/app/context/FormDataContext";

 
export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  const {locale} = params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>
          <Providers>
            <BreadcrumbProvider>
              <FormDataProvider>
                {children}
              </FormDataProvider>
            </BreadcrumbProvider>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
   
  );
}