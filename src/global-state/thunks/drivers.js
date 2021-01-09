import { actionsViewSettings } from '../'
import cloneDeep from 'lodash/cloneDeep'
import { isSafari } from '../../utils/is-safari'

const { setAudioDriverOuts } = actionsViewSettings

export function initDrivers() {
  return async function (dispatch) {
    try {
      const drivers = await scanForAudioDrivers()
      const driTmp = drivers.map(({ deviceId, label, groupId }) => {
        return {
          label: cloneDeep(label).trim(),
          deviceId: cloneDeep(deviceId),
          groupId: cloneDeep(groupId)
        }
      })
      dispatch(setAudioDriverOuts({ audioDriverOuts: driTmp }))
    } catch (err) {
      throw new Error(err)
    }
  }
}

async function scanForAudioDrivers() {
  let list = []
  return new Promise((resolve, reject) => {
    if (isSafari()) {
      resolve([])
    }
    navigator.getUserMedia(
      { audio: true, video: false },
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
  listl =
    devices &&
    devices.reduce((acc, device) => {
      if (device.kind === 'audiooutput') {
        acc.push(device)
        return acc
      }
      return acc
    }, [])
  return listl
}
