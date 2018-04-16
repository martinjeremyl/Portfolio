import { random, name, date } from 'faker'

import TravelApi from '../src/api/TravelApi'

const ITERATIONS_COUNT = 10

const travelApi = new TravelApi()

for (let i = 0; i < ITERATIONS_COUNT; i++) {
  travelApi.create({
    name: name.findName(),
    userId: random.uuid(),
    dateBegin: date.future(),
    dateEnd: date.future(),
    participants: []
  })
}

process.exit()
