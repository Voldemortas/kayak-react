import { Vehicle, RestVehicle } from 'commons'
import { useEffect, useState } from 'react'

export type HookResponse = {
  vehicles: Vehicle[] | undefined
  toggleVehicle: (index: number) => void
  resetSelected: () => void
}

function useApp(): HookResponse {
  const [vehicles, setVehicles] = useState<Vehicle[] | undefined>(undefined)

  useEffect(() => {
    ;(async () => {
      const vehicles = await getVehicles()

      setVehicles(vehicles)
    })()
  }, [])

  function toggleVehicle(index: number): void {
    const vehicleToToggle = vehicles!.slice(index, index + 1)[0]

    setVehicles([
      ...vehicles!.slice(0, index),
      { ...vehicleToToggle, isSelected: !vehicleToToggle.isSelected },
      ...vehicles!.slice(index + 1),
    ])
  }

  function resetSelected() {
    setVehicles(vehicles?.map((vehicle) => ({ ...vehicle, isSelected: false })))
  }

  return { vehicles, toggleVehicle, resetSelected }
}

async function getVehicles(): Promise<Vehicle[] | undefined> {
  try {
    const vehicles: RestVehicle[] = await (await fetch('/vehicles.json')).json()

    return vehicles.map((vehicle) => ({ ...vehicle, isSelected: false }))
  } catch (e) {}
}

export default useApp
