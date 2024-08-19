import Header from '../components/Header';
import '../app/globals.css';
import { Container } from '@mui/material';


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <Container sx={{ mt: 4 }}>
          {children}
        </Container>
      </body>
    </html>
  );
}
