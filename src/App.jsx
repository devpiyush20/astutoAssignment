import ConfigurableTable from './components/ConfigurableTable'
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme({
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: '16px',
          fontSize: '14px',
          color: '#333',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          margin: '4px',
        },
      },
    },
  },
});

function App() {

  return (
    <>
    <ThemeProvider theme={theme}>
    <div style={{ padding: '40px' }}>

    <ConfigurableTable />
    </div>
    </ThemeProvider>
    </>
  )
}

export default App
