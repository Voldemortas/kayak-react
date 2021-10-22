import { Vehicle } from 'commons'
import { useEffect, useState } from 'react'

type Response = {
  vehicles: Vehicle[] | undefined
  toggleVehicle: (index: number) => void
}

type RestVehicle = {
  img: string
  price: number
  name: string
}

function useApp(): Response {
  const [vehicles, setVehicles] = useState<Vehicle[] | undefined>(undefined)

  useEffect(() => {
    ;(async () => {
      setVehicles(await getVehicles())
    })()
  }, [])

  function toggleVehicle(index: number): void {
    const vehicleToToggle = vehicles!.splice(index, index + 1)[0]

    setVehicles([
      ...vehicles!.splice(index - 1, index),
      { ...vehicleToToggle, isSelected: !vehicleToToggle.isSelected },
      ...vehicles!.splice(index + 1),
    ])
  }

  return { vehicles, toggleVehicle }
}

async function getVehicles(): Promise<Vehicle[] | undefined> {
  try {
    const vehicles: RestVehicle[] = await (await fetch('/vehicles.json')).json()

    return vehicles.map((vehicle) => ({ ...vehicle, isSelected: false }))
  } catch (e) {}
}

export default useApp
