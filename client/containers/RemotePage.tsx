import * as React from 'react'
import Grid from '../components/Grid'
import Row from '../components/Row'
import KeyboardButton from '../components/KeyboardButton'
import ShutdownButton from '../components/ShutdownButton'
import DisplaySwitchButton from '../components/DisplaySwitchButton'

export default class RemotePage extends React.Component<any, void> {

    render() {
        return (
            <Grid>
                <Row>
                    <ShutdownButton/>
                    <DisplaySwitchButton type="external"/>
                    <DisplaySwitchButton type="internal"/>
                </Row>
                <Row>
                    <KeyboardButton icon="step backward" k="pageup"/>
                    <KeyboardButton icon="step forward" k="pagedown"/>
                </Row>
                <Row>
                    <KeyboardButton icon="backward" k="left" interval={100}/>
                    <KeyboardButton icon="pause" k="space"/>
                    <KeyboardButton icon="forward" k="right" interval={100}/>
                </Row>
                <Row>
                    <KeyboardButton icon="volume down" k="audio_vol_down" interval={60}/>
                    <KeyboardButton icon="volume up" k="audio_vol_up" interval={60}/>
                </Row>
                <Row>
                    <KeyboardButton icon="comments outline" k="l" modifiers={['alt']}/>
                    <KeyboardButton icon="expand" k="enter"/>
                    <KeyboardButton icon="audio description" k="a" modifiers={['alt']}/>
                </Row>
            </Grid>
        )
    }
}
