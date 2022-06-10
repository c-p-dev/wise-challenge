import logo from './logo.svg';
import './App.css';
import { Grid, Container } from '@mui/material';
import EpochTable from './components/epoch.table/epoch.table';

function App() {
  return (
    <div className="App">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Wise Interview React Challenge
            </p>
          </header>
        </Grid>
        <Grid item xs={12} >
        <Container maxWidth="md">
          <EpochTable/>
        </Container>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
