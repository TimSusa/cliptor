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
  if (isSafari()) {
    return list
  }
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false })
  if(stream) return await refreshDeviceList(list)
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
