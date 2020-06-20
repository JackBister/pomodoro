
interface BackgroundState {
    readonly type: "Background";
    readonly lastState: State;
    readonly timestamp;
}

interface NotStartedState {
    readonly type: 'NotStarted';
}

interface FocusTimeState {
    readonly type: 'FocusTime';
    readonly remainingTime: number;
    readonly intervalHandle: number;
}

interface PauseTimeState {
    readonly type: 'PauseTime';
    readonly remainingTime: number;
    readonly intervalHandle: number;
}

interface PausedState {
    readonly type: 'Paused';
    readonly lastState: FocusTimeState | PauseTimeState;
}

type State = BackgroundState | NotStartedState | FocusTimeState | PauseTimeState | PausedState;

const FOCUS_TIME_MINUTES = 25;
const PAUSE_TIME_MINUTES = 5;

let state: State = {
    type: 'NotStarted'
};

const timerTomato = document.getElementById("timer-tomato");
if (!timerTomato) {
    throw new Error("Fatal: timer-tomato element not found");
}

const timerTomatoContent = document.getElementById("timer-tomato-content");
if (!timerTomatoContent) {
    throw new Error("Fatal: timer-tomato-content element not found");
}

function twoDigits(n: number) {
    const str = Math.floor(n).toString();
    return str.length === 1 ? "0" + str : str;
}

function setState(newState: State) {
    switch (newState.type) {
        case 'FocusTime':
            if (state.type !== "FocusTime") {
                timerTomato!.style.backgroundColor = "blue";
            }
            timerTomatoContent!.innerText = `${twoDigits(newState.remainingTime / 60)}:${twoDigits(newState.remainingTime % 60)}`;
            break;
        case 'NotStarted':
            break;
        case 'PauseTime':
            if (state.type !== "PauseTime") {
                timerTomato!.style.backgroundColor = "green";
            }
            timerTomatoContent!.innerText = `${twoDigits(newState.remainingTime / 60)}:${twoDigits(newState.remainingTime % 60)}`;
            break;
        case 'Paused':
            if (state.type !== "Paused") {
                timerTomato!.style.backgroundColor = "yellow";
            }
            break;
    }

    state = newState;
}

function intervalCallback() {
    switch (state.type) {
        case 'FocusTime':
            if (state.remainingTime - 1 <= 0) {
                setState({
                    type: "PauseTime",
                    remainingTime: 60 * PAUSE_TIME_MINUTES,
                    intervalHandle: state.intervalHandle
                });
            } else {
                setState({
                    ...state,
                    remainingTime: state.remainingTime - 1
                });
            }
            break;
        case 'PauseTime':
            if (state.remainingTime - 1 <= 0) {
                setState({
                    type: "FocusTime",
                    remainingTime: 60 * FOCUS_TIME_MINUTES,
                    intervalHandle: state.intervalHandle
                });
            } else {
                setState({
                    ...state,
                    remainingTime: state.remainingTime - 1
                });
            }
            break;
    }
}

timerTomatoContent.addEventListener("click", () => {
    switch (state.type) {
        case 'FocusTime':
            setState({
                type: 'Paused',
                lastState: state
            });
            break;
        case 'NotStarted':
            setState({
                type: 'FocusTime',
                remainingTime: 60 * FOCUS_TIME_MINUTES,
                intervalHandle: setInterval(intervalCallback, 1000),
            });
            break;
        case 'PauseTime':
            setState({
                type: 'Paused',
                lastState: state
            });
            break;
        case 'Paused':
            setState(state.lastState);
            break;
    }
});

document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible" && state.type === "Background") {
        switch (state.lastState.type) {
            case 'FocusTime':
            case "PauseTime":
                const elapsedMs = new Date().valueOf() - state.timestamp;
                const newState = iterateState(state.lastState, elapsedMs);
                setState({
                    ...newState,
                    intervalHandle: setInterval(intervalCallback, 1000)
                });
                break;
        }
        setState(state.lastState);
    } else {
        switch (state.type) {
            case "FocusTime":
            case "PauseTime":
                clearInterval(state.intervalHandle);
        }
        setState({
            type: "Background",
            lastState: state,
            timestamp: new Date().valueOf()
        });
    }
});

function iterateState(state: FocusTimeState | PauseTimeState, elapsedMs: number): FocusTimeState | PauseTimeState {
    let stateType = state.type;
    let remainingTime = state.remainingTime;
    while (elapsedMs > 0) {
        if ((remainingTime - elapsedMs / 1000) <= 0) {
            elapsedMs -= remainingTime * 1000;
            stateType = stateType === "FocusTime" ? "PauseTime" : "FocusTime";
            remainingTime = (state.type === "FocusTime" ? PAUSE_TIME_MINUTES * 60 : FOCUS_TIME_MINUTES * 60) - Math.floor(elapsedMs / 1000);
        } else {
            remainingTime -= Math.floor(elapsedMs / 1000);
            break;
        }
    }
    return {
        type: stateType,
        remainingTime: remainingTime,
        intervalHandle: 0
        // Not sure why, but I have to cast here to please the type checker
    } as FocusTimeState;
}