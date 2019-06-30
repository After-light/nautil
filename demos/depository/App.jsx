import { React, Component, Provider, Depository } from 'nautil'
import Page1 from './pages/page1.jsx'

const datasources = []

const depo = new Depository({
  expire: 10000,
})

depo.register(datasources)

export class App extends Component {
  render() {
    return <Provider $depo={depo}>
      <Page1 />
    </Provider>
  }
}

export default App
