'use client';

import clsx from 'clsx';
import {useParams} from 'next/navigation';
import {ChangeEvent, ReactNode, useTransition} from 'react';
import {Locale, usePathname, useRouter} from '@/i18n/routing';

type Props = {
  children: ReactNode;
  defaultValue: string;
};

export default function LocaleSwitcherSelect({
  children,
  defaultValue,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as Locale;
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        {pathname, params},
        {locale: nextLocale}
      );
    });
  }

  return (
    <label
      className={clsx(
        'relative text-gray-400 rounded-md px-2 py-1 transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800',
        isPending && 'transition-opacity [&:disabled]:opacity-30'
      )}
    >
      <select
        className="inline-flex appearance-none bg-transparent py-2 pl-2 pr-6 outline-none transition-all duration-300 cursor-pointer"
        defaultValue={defaultValue}
        disabled={isPending}
        onChange={onSelectChange}
      >
        {children}
      </select>
      <span className="pointer-events-none absolute right-3 top-[12px] transition-transform duration-300 transform group-hover:translate-y-1">⌄</span>
    </label>
  );
}
