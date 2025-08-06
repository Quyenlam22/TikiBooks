import { useRoutes } from "react-router-dom";
import { routes } from "../../routes";

function RouterClient() {
  const elements = useRoutes(routes);

  return (
    <>
      {elements}
    </>
  )
}

export default RouterClient;