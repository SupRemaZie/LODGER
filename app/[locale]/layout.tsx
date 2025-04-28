import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Providers } from "../context/providers";
import { BreadcrumbProvider } from '../context/BreadcrumbContext';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { FormDataProvider } from "@/app/context/FormDataContext";

import { getMessages } from 'next-intl/server'; // <== important

export default async function RootLayout({
                                           children,
                                           params
                                         }: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages(); // <== ici tu charges les messages

  return (
      <html lang={locale}>
      <body className={inter.className}>
      <NextIntlClientProvider locale={locale} messages={messages}>
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
