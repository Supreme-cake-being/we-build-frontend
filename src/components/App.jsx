import { useEffect, lazy } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { SharedLayout } from './SharedLayout/SharedLayout';

import { RestrictedRoute } from 'components/RestrictedRoute';
import { PrivateRoute } from 'components/PrivateRoute';
import { useAuth } from 'hooks/useAuth';
import { refreshUser } from 'redux/auth/operations';
import Loader from './Loader/Loader';

const Home = lazy(() => import(`pages/Home`));
const Projects = lazy(() => import(`pages/Projects`));
const Blog = lazy(() => import(`pages/Blog`));
const Vacancies = lazy(() => import(`pages/Vacancies`));
const Register = lazy(() => import(`pages/Register`));
const Login = lazy(() => import(`pages/Login`));

const App = () => {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <Loader />
  ) : (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/vacancies" element={<Vacancies />} />
        <Route
          path="login"
          element={<RestrictedRoute component={<Login />} redirectTo="/" />}
        />
        <Route
          path="register"
          element={<RestrictedRoute component={<Register />} redirectTo="/" />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
};

export default App;
