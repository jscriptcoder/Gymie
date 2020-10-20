import test from 'tape'
import Gymie from './Gymie'
import Env, { Space, Discrete, Continuous } from './Env'

const wsApi = 'http://0.0.0.0:5000/gym'
const envId = 'CartPole-v1'
const envIdContinuous = 'MountainCarContinuous-v0'

// TODO: Mock the server, WebSocketClient & WebSocketConnection

interface Setup<O extends Space, A extends Space> {
  gymie: Gymie,
  env: Env<O, A>
}

async function setup<O extends Space, A extends Space>(envId: string): Promise<Setup<O, A>> {
  const gymie = new Gymie()
  await gymie.connect(wsApi)
  const env = await gymie.make<O, A>(envId)
  return { gymie, env }
}

test('Env#reset', async t => {
  const { gymie, env} = await setup<Continuous, Discrete>(envId)
  const state = await env.reset()
  const isState = Array.isArray(state) && state.length > 0

  t.ok(isState, 'Reset method returned a valid state')

  await env.close()
  gymie.close()
  t.end()
})

test('Env#step - Valid action', async t => {
  const { gymie, env} = await setup<Continuous, Discrete>(envId)
  await env.reset()
  const [obs, reward, done, info] = await env.step(0)

  const isState = Array.isArray(obs) && obs.length > 0
  const isNumber = typeof reward === 'number'
  const isBool = typeof done === 'boolean'
  const isObj = info && typeof info === 'object'

  t.ok(isState, 'Step method returned a valid next step')
  t.ok(isNumber, 'Step method returned a valid reward')
  t.ok(isBool, 'Step method returned a done flag')
  t.ok(isObj, 'Step method returned a info object')

  await env.close()
  gymie.close()
  t.end()
})

test('Env#step - Invalid action', async t => {
  const { gymie, env} = await setup<Continuous, Discrete>(envId)
  await env.reset()

  try {
    await env.step(-123)
    await env.close()
  } catch(err) {
    t.equal(err.name, 'ConnectionClosed', 'Exception is `ConnectionClosed`')
    t.pass(err.message)
  }

  gymie.close()
  t.end()
})

test('Env#observationSpace', async t => {
  const { gymie, env} = await setup<Continuous, Discrete>(envId)
  const space = await env.observationSpace()
  const { name, shape, low, high } = space

  const isShape = Array.isArray(shape) && shape.length > 0
  const isLow = Array.isArray(low) && low.length > 0
  const isHigh = Array.isArray(high) && high.length > 0
  const lowHigh = low.reduce((acc, _, i) => acc && low[i] <= high[i], true)

  t.equal(name, 'Box', 'Observation space is continuous')
  t.ok(isShape, 'observationSpace method returned a valid shape')
  t.ok(isLow, 'observationSpace method returned a valid low')
  t.ok(isHigh, 'observationSpace method returned a valid high')
  t.ok(lowHigh, 'Low is less or equal to High')

  await env.close()
  gymie.close()
  t.end()
})

test('Env#actionSpace - Discrete', async t => {
  const { gymie, env} = await setup<Continuous, Discrete>(envId)
  const space = await env.actionSpace()
  const { name, n } = space

  const isN = typeof n === 'number' && n === 2 // CartPole-v1 => 2 actions

  t.equal(name, 'Discrete', 'Action space is discrete')
  t.ok(isN, 'actionSpace method returned a valid amount of actions')

  await env.close()
  gymie.close()
  t.end()
})

test('Env#actionSpace - Continuous', async t => {
  const { gymie, env} = await setup<Continuous, Continuous>(envIdContinuous)
  const space = await env.actionSpace()
  const { name, shape, low, high } = space

  const isShape = Array.isArray(shape) && shape.length > 0
  const isLow = Array.isArray(low) && low.length > 0
  const isHigh = Array.isArray(high) && high.length > 0
  const lowHigh = low.reduce((acc, _, i) => acc && low[i] <= high[i], true)

  t.equal(name, 'Box', 'Action space is continuous')
  t.ok(isShape, 'actionSpace method returned a valid shape')
  t.ok(isLow, 'actionSpace method returned a valid low')
  t.ok(isHigh, 'actionSpace method returned a valid high')
  t.ok(lowHigh, 'Low is less or equal to High')

  await env.close()
  gymie.close()
  t.end()
})

test('Env#actionSpace - Discrete', async t => {
  const { gymie, env} = await setup<Continuous, Discrete>(envId)
  const space = await env.actionSpace()
  const action = await env.actionSample()

  const okAction = typeof action === 'number' && action >=0 && action < space.n

  t.ok(okAction, 'actionSpace returned a correct discrete action')

  await env.close()
  gymie.close()
  t.end()
})

test('Env#actionSpace - Continuous', async t => {
  const { gymie, env } = await setup<Continuous, Continuous>(envIdContinuous)
  const space = await env.actionSpace()
  const action = await env.actionSample()
  const { low, high } = space

  const aboveLow = low.reduce((acc, val, i) => acc && val <= action[i], true)
  const belowHigh = high.reduce((acc, val, i) => acc && val > action[i], true)
  const okAction = Array.isArray(action) && aboveLow && belowHigh

  t.ok(okAction, 'actionSpace returned a correct continuous action')

  await env.close()
  gymie.close()
  t.end()
})

test('Env#close', async t => {
  const { gymie, env} = await setup(envId)
  const resp = await env.close()

  t.ok(resp, 'Environment has been closed and deleted')

  gymie.close()
  t.end()
})

test('Env - Connection closed', async t => {
  const { gymie, env} = await setup<Continuous, Discrete>(envId)

  await env.close()

  try {
    // We try to send a command after the connection is closed
    const state = await env.reset()
    t.fail('Env should not be able to send a command')
  } catch(err) {
    t.equal(err.name, 'ConnectionClosed', 'Exception is `ConnectionClosed`')
    t.pass('Env could not send a command because connection is closed')
  }
  
  gymie.close()
  t.end()
})
