"use client";

import { Suspense } from "react";
import { LoadingSpinner } from "@/components/Loading";
import SearchContent from "./SearchContent";

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center mt-10">
          <LoadingSpinner />
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
