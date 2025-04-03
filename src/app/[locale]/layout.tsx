import { PropsWithChildren } from "react";

export default async function DefaultLayout({ children }: PropsWithChildren) {
  return (
    <>
      <main>{children}</main>
    </>
  );
}

export const experimental_ppr = true;
