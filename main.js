//select dom element
const containerEl = document.getElementById('container');
const addcounterEl = document.getElementById('addcounter');
const resetEl = document.getElementById('reset');

const ADD_COUNTER = 'addcounter';
const INCREMENT = 'increment';
const DECREMENT = 'decrement';
const RESET = 'reset';

const numbers = [1, 5];

// initial state
const initialState = {
  counters: [
    {
      id: Math.floor(Math.random() * 100 + 1),
      value: 0,
    },
  ],
};

// create reducer function
function counterReducer(state = initialState, action) {
  if (action.type === ADD_COUNTER) {
    return {
      ...state,
      counters: [
        ...state.counters,
        {
          id: action.payload.id,
          value: action.payload.value,
        },
      ],
    };
  } else if (action.type === INCREMENT) {
    const oldState = {
      ...state,
      counters: [...state.counters],
    };
    const updateArray = oldState.counters.map((c) =>
      c.id === action.payload.id
        ? { ...c, value: c.value + action.payload.value }
        : c
    );
    return {
      ...state,
      counters: [...updateArray],
    };
  } else if (action.type === DECREMENT) {
    const oldState = {
      ...state,
      counters: [...state.counters],
    };
    const updateArray = oldState.counters.map((c) =>
      c.id === action.payload.id
        ? { ...c, value: c.value - action.payload.value }
        : c
    );
    return {
      ...state,
      counters: [...updateArray],
    };
  } else if (action.type === RESET) {
    const oldState = {
      ...state,
      counters: [...state.counters],
    };
    const updateArray = oldState.counters.map((c) => ({ ...c, value: 0 }));
    return {
      ...state,
      counters: [...updateArray],
    };
  } else {
    return state;
  }
}

// create store
const store = Redux.createStore(counterReducer);

function render() {
  const state = store.getState();
  containerEl.innerHTML = '';
  state.counters.map(
    (c) =>
      (containerEl.innerHTML += `
  <div
    class="p-4 h-auto flex flex-col items-center justify-center space-y-5 bg-white rounded shadow"
  >
    <div id="counter" class="text-2xl font-semibold">${c.value}</div>
    <div class="flex space-x-3">
      <button
        onclick='incrementCounter(${c.id})'
        class="bg-indigo-400 text-white px-3 py-2 rounded shadow"
      >
        Increment
      </button>
      <button
        onclick='decrementCounter(${c.id})'
        class="bg-red-400 text-white px-3 py-2 rounded shadow"
      >
        Decrement
      </button>
    </div>
  </div>
  </div>
`)
  );
}

render();

store.subscribe(render);

// button click listeners
function incrementCounter(id) {
  store.dispatch({
    type: INCREMENT,
    payload: {
      id,
      value: numbers[Math.random() >= 0.5 ? 1 : 0], // increment value numbers[0] = 1 or numbers[1] = 5
    },
  });
}

function decrementCounter(id) {
  store.dispatch({
    type: DECREMENT,
    payload: {
      id,
      value: numbers[Math.random() >= 0.5 ? 1 : 0], // decrement value numbers[0] = 1 or numbers[1] = 5
    },
  });
}

addcounterEl.addEventListener('click', function () {
  store.dispatch({
    type: ADD_COUNTER,
    payload: {
      id: Math.floor(Math.random() * 100 + 1), // random generate id number
      value: numbers[Math.random() >= 0.5 ? 1 : 0], // counter default value 1 or 5
    },
  });
});

resetEl.addEventListener('click', function () {
  store.dispatch({
    type: RESET,
  });
});
