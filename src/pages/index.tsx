import { NextPage } from 'next';
import Link from 'next/link';

import StackCard from '@/components/common/parts/StackCard';

const Page: NextPage = () => {
  return (
    <div className="mx-auto mt-8 max-w-4xl px-0.5">
      <h2 className="my-4 text-center text-xl font-bold">ポートフォリオ</h2>
      <div className="flex justify-center">
        <ul>
          <li>
            <Link href="/practice/01" className="text-lg underline">
              TODO
            </Link>
          </li>
        </ul>
      </div>
      <h2 className="mb-4 mt-8 text-center text-xl font-bold">技術スタック</h2>
      <ul className="flex justify-center gap-8">
        <li>
          <StackCard
            label="Frontend"
            src="https://logo.assets.newt.so/v1/7a92cf83-992c-4fc1-a6ab-81979c6ec25a/nextjs.png"
            width={64}
            height={64}
            alt="Next.js"
          />
        </li>
        <li>
          <StackCard
            label="Backend"
            src="https://firebase.google.com/static/images/brand-guidelines/logo-vertical.png?hl=ja"
            width={128}
            height={128}
            alt="Firebase"
          />
        </li>
        <li>
          <StackCard
            label="Styling"
            src="https://cdn.worldvectorlogo.com/logos/tailwindcss.svg"
            width={100}
            height={100}
            alt="tailwindCSS"
          />
        </li>
      </ul>
    </div>
  );
};

export default Page;
