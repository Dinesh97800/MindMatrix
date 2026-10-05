import Link from "next/link";

export function Block2Section() {
  return (
    <>
      <div className={"mt-stack-lg flex flex-col items-center py-stack-lg border-t border-outline-variant/10"}><p className={"text-on-surface-variant mb-stack-md font-body-md"}>{"Displaying 5 of 42 Whitepapers"}</p><Link href={"/industrial-automation"} className={"px-8 py-3 bg-surface-container-high hover:bg-surface-variant text-primary rounded-lg font-semibold transition-all border border-outline-variant/30"}>{"Load More Papers"}</Link></div>
    </>
  );
}
