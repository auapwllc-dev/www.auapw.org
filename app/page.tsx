import Image from 'next/image';

export default function Page() {
  return (
    <div>
      <Image src="/images/nextjs.svg" alt="Next.js" width={200} height={200} />
      <Image src="/images/nuxt.svg" alt="Nuxt.js" width={200} height={200} />
      <Image src="/images/svelte.svg" alt="Svelte" width={200} height={200} />
    </div>
  );
}