import { json } from '@remix-run/node';
import type { LoaderFunction } from '@remix-run/node';

import { requireUserId } from '~/utils/auth.server';
import { getOtherUsers } from '~/utils/user.server';
import { UserPanel } from '~/components/user-panel';
import { useLoaderData } from '@remix-run/react';

import { Layout } from '~/components/layout';

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const users = await getOtherUsers(userId);
  return json({ users });
};

function Home() {
  const { users } = useLoaderData();

  return (
    <Layout>
      <div className="h-full flex">
        <UserPanel users={users} />
      </div>
    </Layout>
  );
}

export default Home;
