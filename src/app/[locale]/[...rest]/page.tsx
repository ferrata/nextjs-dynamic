import clsx from "clsx";

interface PageParams {
  locale: string;
  rest: string[];
}

const expectedParams: PageParams = {
  locale: "en",
  rest: ["folder", "page"],
};

export const dynamic = "force-dynamic";

export async function generateStaticParams(): Promise<PageParams[]> {
  return [expectedParams];
}

export default async function CatchAllPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const actualParams = await params;

  const isExpected =
    JSON.stringify(expectedParams) === JSON.stringify(actualParams);

  const actualColor = isExpected ? "text-green-500" : "text-red-500";

  console.log("CatchAllPage test result", {
    expectedParams: JSON.stringify(expectedParams),
    actualParams: JSON.stringify(actualParams),
    isExpected,
  });

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-5">
      <h1 className="text-2xl font-bold mb-4">Test Page</h1>

      <p className="text-lg mb-4 bg-gray-900 p-4 rounded-md text-white text-center">
        Try to refresh this page and see
        <br />
        if the params are correct.
      </p>

      <div className="flex flex-row items-center justify-center gap-5">
        <div className="mb-4 self-start">
          <p className="text-xl font-bold text-center">Expected</p>
          <div className="mt-4 border p-4 rounded-md border-gray-300">
            <code>
              <pre>params: {JSON.stringify(expectedParams, null, " ")}</pre>
            </code>
          </div>
        </div>

        <div className={clsx("mb-4 self-start", actualColor)}>
          <p className="text-xl font-bold text-center">
            Actual{!isExpected && " 😱"}
          </p>
          <div className="mt-4 border p-4 rounded-md border-gray-300">
            <code>
              <pre>params: {JSON.stringify(actualParams, null, " ")}</pre>
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}
