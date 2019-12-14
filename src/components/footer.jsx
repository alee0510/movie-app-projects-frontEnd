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
                    <img src ={cj} height = '60px' alt ='cj' style ={{color : 'white'}}/>
                    <img src ={fourdx} height = '60px' alt ='4dx' style ={{color : 'white'}}/>
                    <img src ={imax} height = '45px' alt ='imax'/>
                    <img src ={dolby} height = '45px' alt ='dolby' style ={{color : 'white'}}/>
                    <img src ={playstore} height = '80px' alt ='playstore'/>
                    <img src ={applestore2} height = '55px' alt ='applestore'/>
                </div>
                <div id = 'footer-contents'>
                    <div id = 'social-icons'>
                        <FacebookIcon style ={{color : 'white', fontSize : '20pt', cursor : 'pointer'}}/>
                        <InstagramIcon style ={{color : 'white', fontSize : '20pt', cursor : 'pointer'}}/>
                        <TwitterIcon style ={{color : 'white', fontSize : '20pt', cursor : 'pointer'}}/>
                        <GitHubIcon style ={{color : 'white', fontSize : '18pt', cursor : 'pointer'}}/>
                        <div id = 'copyright'>
                            <CopyrightIcon style ={{color : 'white', fontSize : '15pt', marginRight : '5px'}}/>
                            <h7 style ={{color : 'white'}}>Copyright by alee0510 | 2019</h7>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer