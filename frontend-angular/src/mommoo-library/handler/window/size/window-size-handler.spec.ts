import {WindowSizeEventHandler} from './window-size-handler';

describe('event register test', () => {
  const eventIDs = [];
  beforeEach(() => {
    eventIDs.push(WindowSizeEventHandler.addResizingEvent(() => console.log('resize1')));
    eventIDs.push(WindowSizeEventHandler.addResizingEvent(() => console.log('resize2')));
    eventIDs.push(WindowSizeEventHandler.addDoneResizingEvent(() => console.log('done1!')));
    eventIDs.push(WindowSizeEventHandler.addDoneResizingEvent(() => console.log('done2!')));
    eventIDs.push(WindowSizeEventHandler.addScreenResolutionChangeEvent(screenResolution => {
      console.log(`first screenResolution is ${screenResolution}`);
    }, true));
    eventIDs.push(WindowSizeEventHandler.addScreenResolutionChangeEvent(screenResolution => {
      console.log(`second screenResolution is ${screenResolution}`);
    }));
    eventIDs.push(WindowSizeEventHandler.addBasicViewportSizeStateChangeEvent(basicViewportSizeState => {
      console.log(`first basicViewportSizeState is ${basicViewportSizeState}`);
    }, true));
    eventIDs.push(WindowSizeEventHandler.addBasicViewportSizeStateChangeEvent(basicViewportSizeState => {
      console.log(`second basicViewportSizeState is ${basicViewportSizeState}`);
    }));
    eventIDs.push(WindowSizeEventHandler.addViewportSizeStateChangeEvent(viewportSizeState => {
      console.log(`first viewportSizeState is ${viewportSizeState}`);
    }, true));
    eventIDs.push(WindowSizeEventHandler.addViewportSizeStateChangeEvent(viewportSizeState => {
      console.log(`second viewportSizeState is ${viewportSizeState}`);
    }));
  });

  it('window event remove test', () => {
    expect(WindowSizeEventHandler.getEventList().length).toEqual(10);
    const severalEventIDs = eventIDs.slice(0, 5);
    severalEventIDs.forEach(eventID => WindowSizeEventHandler.removeEvent(eventID));
    expect(WindowSizeEventHandler.getEventList().length).toEqual(5);
  });
});
