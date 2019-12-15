import React from 'react'
import CopyrightIcon from '@material-ui/icons/Copyright'
import GitHubIcon from '@material-ui/icons/GitHub'
import FacebookIcon from '@material-ui/icons/Facebook'
import InstagramIcon from '@material-ui/icons/Instagram'
import TwitterIcon from '@material-ui/icons/Twitter'

// images
import {imax, playstore, applestore2, dolby, fourdx, cj} from '../assets'


import '../style/footer.css'

class Footer extends React.Component {
    render () {
        return (
            <div className = 'footer-container'>
                <div className = 'logo-container'>
                    <img src ={cj} height = '50%' alt ='cj' style ={{color : 'white'}}/>
                    <img src ={fourdx} height = '50%' alt ='4dx' style ={{color : 'white'}}/>
                    <img src ={imax} height = '45%' alt ='imax'/>
                    <img src ={dolby} height = '45%' alt ='dolby' style ={{color : 'white'}}/>
                    <img src ={playstore} height = '55%' alt ='playstore' style = {{cursor : 'pointer'}}/>
                    <img src ={applestore2} height = '55%' alt ='applestore' style = {{cursor : 'pointer'}}/>
                </div>
                <div id = 'footer-contents'>
                    <div id = 'social-icons'>
                        <FacebookIcon style ={{color : 'white', fontSize : '18pt', cursor : 'pointer'}}/>
                        <InstagramIcon style ={{color : 'white', fontSize : '18pt', cursor : 'pointer'}}/>
                        <TwitterIcon style ={{color : 'white', fontSize : '18pt', cursor : 'pointer'}}/>
                        <GitHubIcon style ={{color : 'white', fontSize : '16pt', cursor : 'pointer'}}/>
                        <div id = 'copyright'>
                            <CopyrightIcon style ={{color : 'white', fontSize : '15pt', marginRight : '5px'}}/>
                            <h4 style ={{color : 'white', fontSize : '12pt'}}>Copyright by alee0510 | 2019</h4>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer