import { actionsViewSettings } from '../'
import cloneDeep from 'lodash/cloneDeep'

// const { toggleIsScenePlaying } = actionsContent
const { setAudioDriverOuts } = actionsViewSettings

export function initDrivers() {
  return async function (dispatch) {
    const drivers = await scanForAudioDrivers()
    const driTmp = drivers.map(({ deviceId, label, groupId }) => {
      return {
        label: cloneDeep(label).trim(),
        deviceId: cloneDeep(deviceId),
        groupId: cloneDeep(groupId)
      }
    })
    dispatch(setAudioDriverOuts({ audioDriverOuts: driTmp }))
  }
}

async function scanForAudioDrivers() {
  let list = []
  return new Promise((resolve, reject) => {
    navigator.webkitGetUserMedia(
      { audio: true },
      async function () {
        list = await refreshDeviceList(list)
        resolve(list)
      },
      function (err) {
        reject(err)
      }
    )
  })
}
async function refreshDeviceList(listl) {
  const devices = await navigator.mediaDevices.enumerateDevices()
  listl = devices.reduce((acc, device) => {
    if (device.kind === 'audiooutput') {
      acc.push(device)
      return acc
    }
    return acc
  }, [])
  return listl
}
