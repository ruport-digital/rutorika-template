function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function cssTransition(event, state) {
  const eventEnd = `${event}${state}`;
  const eventCap = capitalize(event);
  const eventEndCap = `${capitalize(event)}${capitalize(state)}`;
  const transitionEvents = [eventEnd, `o${eventEndCap}`, `MS${eventEndCap}`, eventEnd, `webkit${eventEndCap}`];
  const transitions = [event, `o${eventCap}`, `MS${eventCap}`, `Moz${eventCap}`, `Webkit${eventCap}`];
  const element = document.createElement('element');
  let transitionEvent;
  transitions.some((transition, index) => {
    const condition = element.style[transition] !== undefined;
    if (condition) {
      transitionEvent = transitionEvents[index];
    }
    return condition;
  });
  return transitionEvent;
}
