import renderer from 'react-test-renderer';
import './index.css';
import App from './App';

describe('App', () => {
  it('App renders without crashing', () => {
    const component = renderer.create(<App />);

    expect(component).toBeDefined();
  });
});