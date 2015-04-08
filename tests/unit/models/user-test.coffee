`import { test, moduleForModel } from 'ember-qunit'`
`import startApp from '../../helpers/start-app'`

moduleForModel 'user', {
  # Specify the other units that are required for this test.
  needs: ["model:home"]
}

test 'it exists', (assert) ->
  model = @subject()
  store = @store()
  assert store.find 'user'
