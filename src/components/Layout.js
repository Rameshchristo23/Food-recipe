import Header from './Header';
import { Container } from '@mui/material';

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <Container sx={{ mt: 4 }}>
        {children}
      </Container>
    </>
  );
}
