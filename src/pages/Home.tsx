import { lazy, Suspense } from 'react';
import Hero from '../sections/Hero';

const HomeBelow = lazy(() => import('./HomeBelow'));

const Home = () => (
  <>
    <Hero />
    <Suspense fallback={null}>
      <HomeBelow />
    </Suspense>
  </>
);

export default Home;
