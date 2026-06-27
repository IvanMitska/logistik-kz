import styled from 'styled-components';

const Wrap = styled.header`
  padding: calc(var(--tg-top) + 18px) 20px 14px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Mark = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 11px;
  flex: none;
  display: grid;
  place-items: center;
  background: var(--grad);
  color: #fff;
  font-weight: 700;
  font-size: 1.1rem;
  letter-spacing: -0.04em;
  box-shadow: 0 10px 24px -12px rgba(var(--accent-rgb), 0.8);
`;

const Name = styled.div`
  .n {
    font-weight: 600;
    font-size: 1.05rem;
    letter-spacing: -0.02em;
    line-height: 1.1;
  }
  .t {
    font-size: 0.72rem;
    color: var(--muted);
    margin-top: 1px;
  }
`;

const Header = () => (
  <Wrap>
    <Mark>lk</Mark>
    <Name>
      <div className="n">logistics.kaz</div>
      <div className="t">Белая доставка из Китая</div>
    </Name>
  </Wrap>
);

export default Header;
