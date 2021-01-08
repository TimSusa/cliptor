import React from 'react'
import FileReader from '../common/FileReader'
import { PropTypes } from 'prop-types'

ButtonLoadAudioFile.propTypes = {
  children: PropTypes.any,
  onFileChange: PropTypes.func
}

export function ButtonLoadAudioFile({ onFileChange, children }) {
  return (
    <FileReader
      as='buffer'
      onChange={handleFileChangeWebMode.bind(this, onFileChange)}
    >
      {children}
    </FileReader>
  )
  function handleFileChangeWebMode(onFileChange, _, results) {
    if (!Array.isArray(results)) {
      throw new TypeError('No file selected')
    }
    const contentRaw = results[0][0].target.result
    //const content = JSON.parse(contentRaw)
    const presetName = results[0][1].name
    onFileChange({ content: contentRaw, presetName })
  }
}
