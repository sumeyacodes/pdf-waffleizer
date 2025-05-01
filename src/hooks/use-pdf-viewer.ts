import { useQuery, useQueryClient } from "@tanstack/react-query";

import type { ComponentType } from "react";

// reads the current filename from react query
// glob‑imports all MDX under ../assets
// finds the loader whose path ends with that filename
// lazily imports it and tracks loading state via tanstack query

export function usePDFViewer() {
  const queryClient = useQueryClient();
  // get the filename from the query cache
  const filename = queryClient.getQueryData<string>(["file"]);
  // include every .mdx under src/assets in the bundle
  const modules = import.meta.glob("../assets/*.mdx");

  // loader for the current filename -> returns the corresponding MDX React component
  const loadMDX = async (): Promise<ComponentType<any>> => {
    if (!filename) throw new Error("No filename in cache");
    // find the glob‑imported module whose path ends with that filename
    const match = Object.entries(modules).find(([path]) =>
      path.endsWith(filename)
    );
    if (!match) throw new Error(`MDX not found: ${filename}`);
    // extract the loader function for that module
    const loader = match[1] as () => Promise<{ default: ComponentType<any> }>;
    // dynamically import the module
    const mod = await loader();

    // return its default export (the MDX component)
    return mod.default;
  };

  const { data, isLoading, error } = useQuery<ComponentType<any>, Error>({
    // query key for the current MDX component
    queryKey: ["mdx", filename],
    // lazy loader func: imports MDX component for current filename
    queryFn: loadMDX,
    // don’t run until we actually have a filename
    enabled: Boolean(filename),
  });

  return { MDXComponent: data, loading: isLoading, error };
}
