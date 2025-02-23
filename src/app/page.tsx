import { ModeToggle } from '@/components/ModeToggle';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { SiGithub, SiReddit } from '@icons-pack/react-simple-icons';

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="font-semibold text-4xl tracking-wide">Yasow</h1>
        <ul className="list-inside  text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            A simple Next.js starter kit to put your markdown notes into website.
          </li>
        </ul>
        <div className="grid  gap-4 items-center grid-cols-1 sm:grid-cols-2">
          <Link prefetch href="/notes">
            <Button>Open documentation</Button>
          </Link>
          <Link href="https://github.com/khoeos/yasow" target="blank">
            <Button>
              <SiGithub />
              Source code
            </Button>
          </Link>
          <Link href="#">
            <Button>
              <SiReddit /> Reddit thread
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
