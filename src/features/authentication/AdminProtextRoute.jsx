/* eslint-disable react/prop-types */
import UnAuthorizedPage from "../../Pages/UnAuthorizedPage";
import { ROLE } from "../../constants/role-constants";

export default function AdminProtectedRoute({ children }) {
  const isLoading = useStore((state) => state.isLoading);
  const user = useStore((state) => state.user);
  if (!user || user.role === ROLE.BUYER || user.role === ROLE.SELLER)
    return (
      <>
        {isLoading === true && <LoadingSpinner />}
        <UnAuthorizedPage />;
      </>
    );

  if (user.role === ROLE.ADMIN) {
    return <>{children}</>;
  }
}
