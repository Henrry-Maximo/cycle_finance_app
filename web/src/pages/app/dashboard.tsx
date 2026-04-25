import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { FieldLabel } from '@/components/ui/field';

export function Dashboard() {
  return (
    <>
      <Helmet title="Dashboard" />

      <div className="flex h-screen flex-col items-center justify-center bg-black">
        <Link to="/sign-in" className="flex flex-col items-center gap-4">
          <Button>Login</Button>
          <FieldLabel className="text-white">Em desenvolvimento.</FieldLabel>
        </Link>
      </div>
    </>
  );
}
