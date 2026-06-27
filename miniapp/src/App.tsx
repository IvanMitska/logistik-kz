import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './ui/Header';
import TabBar from './ui/TabBar';
import type { Tab } from './ui/TabBar';
import CalculatorScreen from './screens/CalculatorScreen';
import type { Quote } from './screens/CalculatorScreen';
import LeadScreen from './screens/LeadScreen';
import TrackScreen from './screens/TrackScreen';
import { initTelegram } from './telegram';

const Main = styled.main`
  flex: 1;
  padding: 4px 16px 8px;
`;

const App = () => {
  const [tab, setTab] = useState<Tab>('calc');
  const [quote, setQuote] = useState<Quote | null>(null);
  const [trackId, setTrackId] = useState<string | undefined>();

  useEffect(() => {
    initTelegram();
  }, []);

  const goToLead = (q: Quote) => {
    setQuote(q);
    setTab('lead');
  };

  const goToTrack = (id: string) => {
    setTrackId(id);
    setTab('track');
  };

  return (
    <>
      <Header />
      <Main>
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            {tab === 'calc' && <CalculatorScreen onSubmitQuote={goToLead} />}
            {tab === 'lead' && <LeadScreen quote={quote} onTracked={goToTrack} />}
            {tab === 'track' && <TrackScreen initialId={trackId} />}
          </motion.div>
        </AnimatePresence>
      </Main>
      <TabBar active={tab} onChange={setTab} />
    </>
  );
};

export default App;
