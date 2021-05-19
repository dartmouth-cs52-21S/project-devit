# Redux with Hooks

In an effort to improve the readability of the front-end application code, the original implementation of Redux has been swapped out to using Redux hooks. The benefits to this approach are below.

- Code is less verbose without sacrificing readability
- Simplify components by keeping as much Redux logic external to component

The original implementation used `connect`, `mapStateToProps` and `mapDispatchToProps`. That implementation has the following pattern within a component.

## Original Redux implementation

```js
import * as actionTypes from "../store/actions";
import { connect } from "react-redux";

const MyComponent = (props) => {
  props.setCurrentUser(userDataObject);
  props.setComponentTypes(userDataObject);

  return (
    <pre>{JSON.stringify(currentUser, null, 2)}</pre>
    <pre>{JSON.stringify(componentTypes, null, 2)}</pre>
  )
}

const mapStateToProps = (state) => {
	return {
		currentUser: state.currentUser,
		componentTypes: state.componentTypes,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setCurrentUser: (currentUser) => dispatch({ type: actionTypes.SETCURRENTUSER, currentUser: currentUser }),
		setComponentTypes: (componentTypes) =>
			dispatch({ type: actionTypes.SETCOMPONENTTYPES, componentTypes: componentTypes }),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(MyComponent);
```

## Redux implementation using Hooks

```js
import { useDispatch, useSelector } from "react-redux";
import { setComponentTypes, setCurrentUser } from "../state-provider/actionCreators";
import { selectComponentTypes, selectCurrentUser } from "../state-provider/selectors";

const MyComponent = () => {
  const dispatch = useDispatch();
	const componentTypes = useSelector(selectComponentTypes);
	const currentUser = useSelector(selectCurrentUser);

  return (
    <pre>{JSON.stringify(currentUser, null, 2)}</pre>
    <pre>{JSON.stringify(componentTypes, null, 2)}</pre>
  )
}

export default MyComponent;
```

---

### What stays the same with Redux with Hooks?

With the hooks approach, `store.js` and the `reducer.js` remain unchanged.

### What changes with Redux with Hooks?

The `types`, `selectors` and `actions` files support the hooks approach. Each of these are stored in the `store` directory. The use patterns for each of these is below.

#### Types

```js
// store/types.js

const types = {
	CONSTANT_NAME: "CONSTANT_NAME", // All-caps with underscores to separate words
  ...
};

export default types;
```

#### Selectors
```js
// store/selectors.js

// Selectors are functions that return a specific piece of state. They can be used as
// arguments to useSelector hooks as shown in the Redux with hooks example above.
// The naming convention is select<NameOfStateKey> 

export const selectNameOfKeyWithinGlobalState = (state) => state.nameOfKeyWithinGlobalState;

```

##### *Use with Redux's* `combineReducers` *function* 

If using the combineReducers function from the redux package, the implementation differs slightly. As an example, see the combined reducer below.

```js 
// store/reducers/index.js

import { combineReducers } from "redux";
import CardsReducer from "./cards.reducer";
import AuthReducer from "./auth.reducer";

const rootReducer = combineReducers({
	cards: CardsReducer,
	auth: AuthReducer,
});

export default rootReducer;

```

```js 
// store/selectors.js

export const selectNameOfKeyWithinGlobalState = (state) => state.cards.nameOfKeyWithinGlobalState;

```


#### Action Creators
```js
// store/actionCreators.js

// Action creators represent the objects that are passed into the dispatch function.

import types from "./types";

export const setData = (data) => ({
	type: types.SET_DATA,
	data, // Same as `data: data`
});
```
