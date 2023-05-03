import { withNavigationWatcher } from './contexts/navigation';
import TableContainer from './pages/table/tablecontainer';

const routes = [
  {
    path: '/table',
    element: TableContainer,
  },
];

export default routes.map((route) => {
  return {
    ...route,
    element: withNavigationWatcher(route.element, route.path),
  };
});
