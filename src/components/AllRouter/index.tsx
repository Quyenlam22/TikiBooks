import { useRoutes } from "react-router";
import { routesClient } from "../../routes/client";
import { routesAdmin } from "../../routes/admin";

function AllRouter() {
  const elements = useRoutes([
    ...routesClient,
    ...routesAdmin
  ]);

  return (
    <>
      {elements}
    </>
  )
}

export default AllRouter;