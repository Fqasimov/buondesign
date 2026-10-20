export default function RootRedirectLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="az">
      <body style={{ background: '#1C1B16' }}>{children}</body>
    </html>
  );
}
