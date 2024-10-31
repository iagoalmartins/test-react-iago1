interface BreadcrumbRoute {
  path: string;
  name: string;
}

export interface BreadcrumbProps {
  routes: Array<BreadcrumbRoute>;
  currentPath?: string;
}
