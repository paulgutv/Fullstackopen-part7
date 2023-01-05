import { useState, useEffect } from "react"
import axios from 'axios'


export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    if (event === 'reset') {
      return setValue('')
    }
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useResource = ( baseUrl ) => {
  const [resources, setResources] = useState([])
  // ...
  useEffect(() => {
    if(baseUrl) {
      axios.get(baseUrl)
        .then(response => {
          return (
            setResources(response.data)
          )
        })
    }
  },[baseUrl])

  const create = async (resource) => {
    const response = await axios.post(baseUrl, resource)
    return setResources(resources.concat(response.data))
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}