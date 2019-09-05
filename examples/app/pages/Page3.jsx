import { Component, Navigate } from 'nautil'
import { Text, Section, Button } from 'nautil/components'
import { AnimationView } from 'nautil/animation'
import { T } from 'nautil/i18n'

export class Page3 extends Component {
  state = {
    show: false,
  }
  render() {
    return (
      <Section>
        <Section>
          <Navigate to="home">
            <Button><T>home</T></Button>
          </Navigate>
          <Button onHint={() => this.setState({ show: true })}>show</Button>
          <Button onHint={() => this.setState({ show: false })}>hide</Button>
        </Section>
        <AnimationView
          show={this.state.show}
          enter="easeInElastic 500 fade:in move:right,top scale:1.5/1"
          leave="easeInQuad 500 fade:out move:0/-300,-100 scale:1/1.5"
        >
          <Text>This is a demo for animation.</Text>
        </AnimationView>
      </Section>
    )
  }
}

export default Page3
