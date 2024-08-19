import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import Link from 'next/link';

export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar className='bg-red-950'>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My Recipe App
        </Typography>
        <Box sx={{ display: 'flex' }}>
          <Button className='text-white font-bold'>
            <Link className='text-white font-bold' href="/" passHref>
              Recipe
            </Link>
          </Button>
          <Button className='text-white font-bold'>
            <Link className='text-white font-bold' href="/nutrition" passHref>
              Nutrition Wizard
            </Link>
          </Button>
          <Button color="inherit">
            <Link href="/recipe" passHref>
              Recipe Search
            </Link>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
