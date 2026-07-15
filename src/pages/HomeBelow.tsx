import Stats from '../sections/Stats';
import Manifesto from '../sections/Manifesto';
import Services from '../sections/Services';
import Calculator from '../sections/Calculator';
import Advantages from '../sections/Advantages';
import Guarantees from '../sections/Guarantees';
import Process from '../sections/Process';
import Immersive from '../sections/Immersive';
import Geography from '../sections/Geography';
import Faq from '../sections/Faq';
import LeadForm from '../sections/LeadForm';

// Everything below the hero, bundled as ONE lazy chunk (single extra request).
// It downloads while the preloader runs, so the split is invisible to the user
// but keeps the critical-path bundle to what the first screen needs.
const HomeBelow = () => (
  <>
    <Stats />
    <Manifesto />
    <Services />
    <Calculator />
    <Advantages />
    <Guarantees />
    <Process />
    <Immersive />
    <Geography />
    <Faq />
    <LeadForm />
  </>
);

export default HomeBelow;
