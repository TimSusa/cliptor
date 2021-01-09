import PropTypes from 'prop-types'
import React, { useRef, useEffect } from 'react'

export default function FileInput(props) {
  const _reactFileReaderInput = useRef(null)
  const { as, children = <div></div>, style, onChange } = props
  let hiddenInputStyle = {}
  if (children) {
    hiddenInputStyle = {
      position: 'absolute',
      display: 'none'
    }
  }
  useEffect(() => {
    const win = typeof window === 'object' ? window : {}
    if (!win.File || !win.FileReader || !win.FileList || !win.Blob) {
      // eslint-disable-next-line no-console
      console.warn(
        '[react-file-reader-input] Some file APIs detected as not supported.' +
          ' File reader functionality may not fully work.'
      )
    }
  }, [])

  return (
    <div onClick={triggerInput} style={style}>
      <input
        type='file'
        ref={_reactFileReaderInput}
        onChange={handleChange}
        onClick={() => {
          _reactFileReaderInput.current = null
        }}
        style={hiddenInputStyle}
      />
      {children}
    </div>
  )
  function handleChange(e) {
    const files = Array.prototype.slice.call(e.target.files) // Convert into Array
    const readAs = (as || 'url').toLowerCase()

    // Build Promise List, each promise resolved by FileReader.onload.
    Promise.all(
      files.map(
        (file) =>
          new Promise((resolve) => {
            let reader = new window.FileReader()

            reader.addEventListener('load', (result) => {
              // Resolve both the FileReader result and its original file.
              resolve([result, file])
            })

            // Read the file with format based on props.as.
            switch (readAs) {
              case 'binary': {
                reader.readAsBinaryString(file)
                break
              }
              case 'buffer': {
                reader.readAsArrayBuffer(file)
                break
              }
              case 'text': {
                reader.readAsText(file)
                break
              }
              case 'url': {
                reader.readAsDataURL(file)
                break
              }
              default:
            }
          })
      )
    ).then((zippedResults) => {
      // Run the callback after all files have been read.
      onChange(e, zippedResults)
    })
  }

  function triggerInput() {
    // eslint-disable-next-line react/no-find-dom-node
    //const input = ReactDOM.findDOMNode(_reactFileReaderInput)
    if (_reactFileReaderInput.current) {
      _reactFileReaderInput.current.click()
    }
  }
}

FileInput.propTypes = {
  as: PropTypes.string,
  children: PropTypes.any,
  onChange: PropTypes.func,
  style: PropTypes.any
}
