import React from "react";
import axios from "axios";

import {
  useInfiniteQuery,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { useIntersectionObserver } from "../hooks";
import { Project } from "../interfaces";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Sample />
      <ReactQueryDevtools initialIsOpen position="bottom-right" />
    </QueryClientProvider>
  );
}

function Sample() {
  const {
    status,
    data,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
  } = useInfiniteQuery(
    "projects",
    async ({ pageParam = 0 }) => {
      const res = await axios.get("/api/projects?cursor=" + pageParam);
      return res.data;
    },
    {
      getPreviousPageParam: (firstPage) => firstPage.previousId ?? false,
      getNextPageParam: (lastPage) => lastPage.nextId ?? false,
    }
  );

  const loadMoreButtonRef = React.useRef<HTMLButtonElement>(null);

  useIntersectionObserver({
    target: loadMoreButtonRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  if (data) {
    return (
      <div className="m-12">
        {data.pages.map((page) => (
          <React.Fragment key={page.nextId}>
            {page.data.map((project: Project) => (
              <p
                className="border-2 border-solid border-purple-600 border-r-4 py-40 px-4"
                key={project.id}
              >
                {project.name}
              </p>
            ))}
          </React.Fragment>
        ))}
        <div>
          {isFetching && !isFetchingNextPage ? "Background Updating..." : null}
        </div>
      </div>
    );
  }

  return <p>Loading...</p>;
}
