import React from 'react'
import { createRoot } from 'react-dom/client'
import resumeData from '../content/resume.yaml'
import type { Resume } from './types'
import { ResumeDoc } from './Resume'
import { Toolbar } from './components/Toolbar'
import './resume.css'

const resume = resumeData as Resume

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Toolbar />
    <ResumeDoc resume={resume} />
  </React.StrictMode>,
)
