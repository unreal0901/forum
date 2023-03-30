import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { getUser } from '../../redux/features/UserSlice';
import { useGetMeQuery } from '../../redux/api/Userapi';
// import { userApi } from '../../redux/api/Userapi';
import FullScreenLoader from './FullScreenLoader';

const RequireUser = ({ children }) => {
  const { isFetching, isLoading } = useGetMeQuery();
  const [cookies] = useCookies(['logged_in']);
  const location = useLocation();
  const user = useSelector(getUser);
  console.log(user);

  // const { isLoading, isFetching } = userApi.endpoints.getMe.useQuery(null, {
  //   skip: false,
  //   refetchOnMountOrArgChange: true,
  // });

  const loading = isLoading || isFetching;
  return (
    <>
      {loading ? <FullScreenLoader /> : null}
      {cookies.logged_in ? (
        children
      ) : (
        <Navigate to="/login" state={{ from: location }} replace />
      )}
    </>
  );
};

export default RequireUser;
