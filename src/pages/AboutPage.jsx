import React from 'react'
import Card from '../comopents/shared/Card'
import {Link} from 'react-router-dom'

function AboutPage() {
  return (
    <Card>
        <div className="about">
            <h1>This Is A React App</h1>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet laboriosam sapiente excepturi, architecto cum pariatur!</p>
            <p>Version 69.6.9</p>

            <p>
                <Link to="/">Back To Homepage</Link>
            </p>
        </div>
    </Card>
  )
}

export default AboutPage