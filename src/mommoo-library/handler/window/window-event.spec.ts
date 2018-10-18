import {WindowEventHandler} from './window-event';

describe('event register test', ()=>{
  const eventIDs = [];
  beforeEach(()=>{
    eventIDs.push(WindowEventHandler.addResizingEvent(()=>console.log('resize1')));
    eventIDs.push(WindowEventHandler.addResizingEvent(()=>console.log('resize2')));
    eventIDs.push(WindowEventHandler.addDoneResizingEvent(()=>console.log('done1!')));
    eventIDs.push(WindowEventHandler.addDoneResizingEvent(()=>console.log('done2!')));
    eventIDs.push(WindowEventHandler.addViewportChangeEvent(viewportSize=>console.log(viewportSize+"1"), true));
    eventIDs.push(WindowEventHandler.addViewportChangeEvent(viewportSize=>console.log(viewportSize+"2")));
  });
  it('window list size test', ()=>{
    expect(WindowEventHandler.getEventList().length).toEqual(6);
    eventIDs.forEach(eventID => WindowEventHandler.removeEvent(eventID));
    expect(WindowEventHandler.getEventList().length).toEqual(0);
  });
});
