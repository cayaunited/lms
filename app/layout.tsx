import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/tiptap/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import '@/app/global.css';
import MainLayout from '@/components/MainLayout';

config.autoAddCss = false;

export const metadata = {
  title: 'Caya',
  description: 'description',
};

export default  function RootLayout({ children }: { children: any }) {
  return <html lang="en" {...mantineHtmlProps}>
    <head>
      <ColorSchemeScript />
      <link
        rel="shortcut icon"
        href="/favicon.png"
      />
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width"
      />
    </head>
    <body>
      <MainLayout>{children}</MainLayout>
    </body>
  </html>;
}
