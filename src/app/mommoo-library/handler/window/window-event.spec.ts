import {WindowEventHandler} from './window-event';

describe('event register test', ()=>{
  beforeEach(()=>{
    WindowEventHandler.addResizingEvent('resizingEvent1', ()=>console.log('resize1'));
    WindowEventHandler.addResizingEvent('resizingEvent2', ()=>console.log('resize2'));
    WindowEventHandler.addDoneResizingEvent('doneResizingEvent1', ()=>console.log('done1!'));
    WindowEventHandler.addDoneResizingEvent('doneResizingEvent2', ()=>console.log('done2!'));
    WindowEventHandler.addViewportChangeEvent('viewportChangeEvent1', viewportSize=>console.log(viewportSize+"1"), true);
    WindowEventHandler.addViewportChangeEvent('viewportChangeEvent2', viewportSize=>console.log(viewportSize+"2"));
  });
  it('window list will size 6', ()=>{
    const eventList = WindowEventHandler.getEventList();
    console.log(eventList);
    expect(eventList.length).toEqual(6);
  });

  afterEach(()=>{
    WindowEventHandler.removeEvent('resizingEvent1');
    WindowEventHandler.removeEvent('resizingEvent2');
    WindowEventHandler.removeEvent('doneResizingEvent1');
    WindowEventHandler.removeEvent('doneResizingEvent2');
    WindowEventHandler.removeEvent('viewportChangeEvent1');
    WindowEventHandler.removeEvent('viewportChangeEvent2');
  });
});

describe('event register test while event id duplicated', ()=>{
  beforeEach(()=>{
    WindowEventHandler.addResizingEvent('resizeEvent', ()=> console.log('resize!!1'));
    WindowEventHandler.addResizingEvent('resizeEvent', ()=> console.log('resize!!2'));
  });

  it('window list will size 1', ()=>{
    expect(WindowEventHandler.getEventList().length).toEqual(1);
  });
});
