export const metadata = {
  title: "Riva Restaurant",
  description: "Welcome to Riva Restaurant",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
