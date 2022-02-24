import { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

const Favorites = lazy(() => import('pages/Favorites'));
const HighwayDetail = lazy(() => import('pages/HighwayDetail'));
const Highways = lazy(() => import('pages/Highways'));

const Routes = () => {
  return (
    <Suspense fallback={null}>
      <Switch>
        <Route exact path='/' component={Highways} />
        <Route exact path='/highways/:id' component={HighwayDetail} />
        <Route exact path='/favorite' component={Favorites} />
      </Switch>
    </Suspense>
  );
};

export default Routes;
