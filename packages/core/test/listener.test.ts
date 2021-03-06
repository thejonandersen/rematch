import { init } from '../src'

describe('listener:', () => {
	test('should trigger state changes on another models reducers', () => {
		type CountState = number

		const count1 = {
			state: 0,
			reducers: {
				increment: (state: CountState, payload: number): CountState =>
					state + payload,
			},
		}

		const count2 = {
			state: 0,
			reducers: {
				'count1/increment': (state: CountState, payload: number): CountState =>
					state + payload,
			},
		}

		type RootModel = {
			count1: typeof count1
			count2: typeof count2
		}

		const models: RootModel = { count1, count2 }

		const store = init({
			models,
		})

		store.dispatch.count1.increment(1)

		expect(store.getState()).toEqual({ count1: 1, count2: 1 })
	})
})
